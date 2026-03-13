import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageDir = path.resolve(__dirname, '..');
const repoRoot = path.resolve(packageDir, '..', '..');
const specPath = path.join(repoRoot, 'docs', 'api-reference', 'sourcebot-public.openapi.json');
const configPath = path.join(packageDir, 'openapi-generator.config.yaml');
const generatedDir = path.join(packageDir, 'src', 'generated');
const tempDir = path.join(packageDir, '.openapi-generator-tmp');

function run(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: false,
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} exited with code ${code ?? 'unknown'}`));
    });

    child.on('error', reject);
  });
}

async function main() {
  await rm(tempDir, { recursive: true, force: true });
  await run(
    'yarn',
    [
      'exec',
      'openapi-generator-cli',
      'generate',
      '-i',
      specPath,
      '-g',
      'typescript-fetch',
      '-o',
      tempDir,
      '-c',
      configPath,
      '--global-property',
      'apiDocs=false,modelDocs=false,apiTests=false,modelTests=false',
    ],
    packageDir,
  );

  await rm(generatedDir, { recursive: true, force: true });
  await mkdir(generatedDir, { recursive: true });
  await cp(path.join(tempDir, 'apis'), path.join(generatedDir, 'apis'), { recursive: true });
  await cp(path.join(tempDir, 'models'), path.join(generatedDir, 'models'), { recursive: true });
  await cp(path.join(tempDir, 'runtime.ts'), path.join(generatedDir, 'runtime.ts'));
  await cp(path.join(tempDir, 'index.ts'), path.join(generatedDir, 'index.ts'));
  await cp(path.join(tempDir, '.openapi-generator'), path.join(generatedDir, '.openapi-generator'), { recursive: true });
  await rm(tempDir, { recursive: true, force: true });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
