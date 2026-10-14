---
verified_at: 2026-10-14
verified_commit: c5ad2a0de2940a87d53f34f9ca453c0c2a78fe7c
---

# Releasing to npm

The one-time setup (npm token, the `NPM_TOKEN` secret, the `@memoryrelay` scope) and the manual fallback are `RELEASE.md`; this file adds the chain as the workflow runs it today and what to watch.

## The version

- `package.json:3` is the version npm publishes. `src/client.ts:48` repeats a version in the `User-Agent` string and was left at `0.1.0` when 0.2.0 shipped: a release moves both, or says why not.
- Before 1.0 the history treats a breaking change as a minor bump ([#1](https://github.com/memoryrelay/node-sdk/pull/1), "breaking changes for v0.2.0") and a fix as a patch.
- There is no changelog file; the GitHub release notes are generated from the merged pull requests (`ci-cd.yml:79-82`), so pull request titles are the changelog.
- npm never takes the same version number twice, even after an unpublish: a mistake costs a new version.

## From tag to npm

1. The version bump lands on `main` (0.2.0: commit `0c2fecb`, then the tag on it).
2. A person pushes an annotated tag `vX.Y.Z` on that commit (`RELEASE.md:54-72`).
3. `ci-cd.yml:3-6` runs on the tag: the `test` matrix, then `publish` (`ci-cd.yml:51-82`), which builds, runs `npm publish --access public` (whose `prepublishOnly`, `package.json:15`, builds and tests again) and creates the GitHub release.
4. The `publish` job does not compare the tag with `package.json`: it publishes whatever version the tagged commit declares. Check they match before pushing the tag.

## Confirming it

`gh run list --repo memoryrelay/node-sdk --workflow ci-cd.yml --branch vX.Y.Z`, `npm view @memoryrelay/sdk version`, `gh release view vX.Y.Z --repo memoryrelay/node-sdk`. A failed `publish` with `test` green is usually the token (`RELEASE.md:111-116`); re-run the failed job for the same tag, never move the tag.
