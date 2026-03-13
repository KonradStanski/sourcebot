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
  apiKey: 'sbk_your_api_key',
});

const reposApi = new RepositoriesApi(config);
const searchApi = new SearchApi(config);

const repos = await reposApi.listRepositories({
  page: 1,
  perPage: 10,
});

const results = await searchApi.runABlockingCodeSearch({
  PublicSearchRequest: {
    query: 'openapi',
    matches: 10,
  },
});
```

You can also send the same API key as a bearer token:

```ts
const config = new Configuration({
  basePath: 'https://your-sourcebot-instance.example.com',
  accessToken: 'sbk_your_api_key',
});
```

On EE instances with OAuth enabled, `accessToken` also accepts Sourcebot OAuth access tokens with the `sboa_...` prefix.

## Regenerate

From the monorepo root:

```bash
yarn client:generate
```
