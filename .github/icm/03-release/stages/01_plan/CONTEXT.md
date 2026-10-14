# 01_plan — choose what ships and its number

One job: a release plan that names the version, justifies its class, and drafts the notes.

## Inputs
- Working (this run): the unreleased changes — `main` since the previous tag (`git log --oneline <previous tag>..origin/main`) and the pull requests merged since (`gh pr list --repo memoryrelay/node-sdk --state merged`).
- Reference (every run): `.github/icm/_shared/release.md`

Do NOT load: the other pipelines, other runs' output, the source tree beyond the files the changes touched.

## Process
1. List every change since the previous tag with its pull request. A commit pushed to `main` without one is listed too, since the generated notes will miss it.
2. Classify as [release.md](../../../_shared/release.md) "The version" says: before 1.0, a change to an export, a removed method or a changed shape is a minor bump; fixes and additions alone are a patch, unless the person wants additions as a minor. Say which change decides it.
3. Confirm the tag does not exist (`git ls-remote --tags origin "vX.Y.Z"`) and the version is not on npm (`npm view @memoryrelay/sdk versions`).
4. Confirm `CI/CD` is green on `main`'s head (`gh run list --repo memoryrelay/node-sdk --workflow ci-cd.yml --branch main --limit 1`).
5. Draft the release notes: who should upgrade and why, breaking changes first with what a caller must change.

## Outputs
- release-plan.md → output/ — the version and the change that decides its class; the changes included; CI state of `main`; the drafted notes.

## Human check
A person approves the version number and the notes. The number is permanent once on npm: a mistake costs a new version.
