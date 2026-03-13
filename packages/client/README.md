# @sourcebot/client

Generated TypeScript client for the Sourcebot public API.

## Install

```bash
npm install @sourcebot/client
```

## Usage

```ts
import { Configuration, RepositoriesApi, SearchApi } from '@sourcebot/client';

const config = new Configuration({
  basePath: 'https://your-sourcebot-instance.example.com',
  accessToken: 'sb_your_api_key',
});

const reposApi = new RepositoriesApi(config);
const searchApi = new SearchApi(config);

const repos = await reposApi.listRepositories({
  page: 1,
  perPage: 10,
});

const results = await searchApi.runABlockingCodeSearch({
  publicSearchRequest: {
    query: 'openapi',
    matches: 10,
  },
});
```

## Regenerate

From the monorepo root:

```bash
yarn client:generate
```
