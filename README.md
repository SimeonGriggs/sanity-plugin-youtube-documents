# sanity-plugin-youtube-documents

Import YouTube videos as documents in Sanity Studio. Requires a "YouTube Data API v3" API key from Google Cloud

## Installation

```sh
npm install sanity-plugin-youtube-documents
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {youTubeDocuments} from 'sanity-plugin-youtube-documents'

export default defineConfig({
  // ...your other config
  plugins: [
    // ...your other plugins
    youTubeDocuments(),
  ],
})
```

## License

[MIT](LICENSE) © Simeon Griggs

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.

### Release new version

Run ["CI & Release" workflow](https://github.com/SimeonGriggs/sanity-plugin-youtube-documents/actions/workflows/main.yml).
Make sure to select the main branch and check "Release new version".

Semantic release will only release on configured branches, so it is safe to run release on any branch.
