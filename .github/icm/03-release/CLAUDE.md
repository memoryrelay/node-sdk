# 03-release — publish a version to npm

One run is one version of `@memoryrelay/sdk`, from the pull requests merged since the last `v*` tag to the same number on npm and as a GitHub release. The person's decisions (the number, the merge, the tag push) are stage boundaries; the one-time setup is `RELEASE.md`, which this pipeline never restates. Releases so far: `v0.1.0` (2026-02-13) and `v0.2.0` (2026-03-24), both published by the `publish` job of `ci-cd.yml`.

Stages, in order; inputs, outputs and checks for each are in [CONTEXT.md](CONTEXT.md):

1. [Plan](stages/01_plan/CONTEXT.md) — what ships, and which number.
2. [Prepare](stages/02_prepare/CONTEXT.md) — the version bump as a pull request.
3. [Publish](stages/03_publish/CONTEXT.md) — the tag, the workflow, npm.
