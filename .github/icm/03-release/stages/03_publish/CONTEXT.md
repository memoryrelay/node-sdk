# 03_publish — tag, follow the workflow, confirm on npm

One job: see the tagged version through the `publish` job and confirm it on npm and as a GitHub release.

## Inputs
- Working (this run): `.github/icm/03-release/stages/02_prepare/output/release-pr.md` — or, for a check of an earlier tag (route `npm-check`), only the tag `vX.Y.Z` the person names; start at step 2.
- Reference (every run): `.github/icm/_shared/release.md`

Do NOT load: the other pipelines, other runs' output, the source tree.

## Process
1. The tag is the person's act, not the agent's: hand them the command from `release-pr.md` (`git tag -a vX.Y.Z <merge sha> -m "Release vX.Y.Z" && git push origin vX.Y.Z`), after checking the merge commit's `package.json` version equals `X.Y.Z` ([release.md](../../../_shared/release.md) "From tag to npm", step 4).
2. Follow the run for the tag: `gh run list --repo memoryrelay/node-sdk --workflow ci-cd.yml --branch vX.Y.Z`; record the `test` and `publish` results and the run link.
3. If `test` failed, nothing was published: the fix is a `01-fix` run and a new version, never a moved tag. If only `publish` failed, read its log and [release.md](../../../_shared/release.md) "Confirming it"; re-run the failed job for the same tag once the cause is fixed. If npm already shows `X.Y.Z` and only the GitHub release is missing, do not re-run `publish` (npm refuses the same version); the person creates the release (`gh release create vX.Y.Z --repo memoryrelay/node-sdk --generate-notes`).
4. Confirm `npm view @memoryrelay/sdk version` shows `X.Y.Z` and `gh release view vX.Y.Z --repo memoryrelay/node-sdk` exists; install it in a scratch folder and import `MemoryRelay`.

## Outputs
- publication.md → output/ — the tag and its commit, the workflow run with each job's result, the npm version seen, the GitHub release link, the import check, and anything re-run.

## Human check
A person confirms the version on npm and the GitHub release before it is announced, and reads any re-run that was needed.
