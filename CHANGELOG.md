<!-- markdownlint-disable --><!-- textlint-disable -->

# 📓 Changelog

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## <small>2.0.1 (2026-01-15)</small>

- Merge pull request #6 from SimeonGriggs/fix/trusted-publishing ([9770003](https://github.com/SimeonGriggs/sanity-plugin-youtube-documents/commit/9770003)), closes [#6](https://github.com/SimeonGriggs/sanity-plugin-youtube-documents/issues/6)
- fix: align with tldraw plugin for trusted publishing ([eeec03c](https://github.com/SimeonGriggs/sanity-plugin-youtube-documents/commit/eeec03c))
- fix: use npm trusted publishing via OIDC ([0377394](https://github.com/SimeonGriggs/sanity-plugin-youtube-documents/commit/0377394))

## 2.0.0 (2026-01-15)

- feat!: upgrade to Sanity v5 and React 19 ([67283fa](https://github.com/SimeonGriggs/sanity-plugin-youtube-documents/commit/67283fa))
- Merge pull request #4 from SimeonGriggs/v2 ([03112ff](https://github.com/SimeonGriggs/sanity-plugin-youtube-documents/commit/03112ff)), closes [#4](https://github.com/SimeonGriggs/sanity-plugin-youtube-documents/issues/4)
- Merge pull request #5 from SimeonGriggs/fix/ci-pnpm ([00f06cc](https://github.com/SimeonGriggs/sanity-plugin-youtube-documents/commit/00f06cc)), closes [#5](https://github.com/SimeonGriggs/sanity-plugin-youtube-documents/issues/5)
- chore: simplify CI test matrix to single Ubuntu LTS job ([22d9b59](https://github.com/SimeonGriggs/sanity-plugin-youtube-documents/commit/22d9b59))
- fix: align CI workflow with tldraw plugin ([6b5214c](https://github.com/SimeonGriggs/sanity-plugin-youtube-documents/commit/6b5214c))
- fix: update CI workflow to use pnpm ([4e9e423](https://github.com/SimeonGriggs/sanity-plugin-youtube-documents/commit/4e9e423))

### BREAKING CHANGE

- This version requires Sanity v5 and React 19.

* Update all dependencies to latest versions
* Migrate to ESLint flat config
* Add pnpm workspace with dev studio for local testing
* Update TypeScript config to use @sanity/pkg-utils strictest preset
* Fix loading state flash when secrets are already configured
* Remove v2 compatibility files (sanity.json, v2-incompatible.js)

## [1.1.1](https://github.com/SimeonGriggs/sanity-plugin-youtube-documents/compare/v1.1.0...v1.1.1) (2024-12-25)

### Bug Fixes

- thumbnail errors ([770820e](https://github.com/SimeonGriggs/sanity-plugin-youtube-documents/commit/770820ebcf98e6cd87b78c8bfdfa588f324b6dad))

## [1.1.0](https://github.com/SimeonGriggs/sanity-plugin-youtube-documents/compare/v1.0.0...v1.1.0) (2024-12-25)

### Features

- force release ([2d34d67](https://github.com/SimeonGriggs/sanity-plugin-youtube-documents/commit/2d34d679d1fe478521766ffb42800a5cdb6db5b4))

## 1.0.0 (2024-12-24)

### Features

- add fields to sanity schema ([886c53b](https://github.com/SimeonGriggs/sanity-plugin-youtube-documents/commit/886c53b52beee741716cd7eff3b9f6ca5080348e))
- improve fetched details ([a2d087b](https://github.com/SimeonGriggs/sanity-plugin-youtube-documents/commit/a2d087b7f631d4e36dc76c509599e4646169c4f1))
- release ([4bc2c27](https://github.com/SimeonGriggs/sanity-plugin-youtube-documents/commit/4bc2c273a0e1a181bc1f61ce8b7d2ac71571a7d7))
