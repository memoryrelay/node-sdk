# 03-release — the pipeline

A number a person approved, a bump a reviewer merged, a tag a person pushed, a version seen on npm.

| Stage | Job | Input | Output | Human check |
|---|---|---|---|---|
| [`01_plan`](stages/01_plan/CONTEXT.md) | choose what ships and its number | the unreleased changes | `output/release-plan.md` | A person approves the version number and the notes. The number is permanent once on npm: a mistake costs a new version. |
| [`02_prepare`](stages/02_prepare/CONTEXT.md) | the version bump as a pull request | 01_plan's `release-plan.md` | `output/release-pr.md` | A person reviews and merges the release pull request, and confirms the merge commit's `package.json` shows the approved version. |
| [`03_publish`](stages/03_publish/CONTEXT.md) | tag, follow the workflow, confirm on npm | 02_prepare's `release-pr.md` | `output/publication.md` | A person confirms the version on npm and the GitHub release before it is announced, and reads any re-run that was needed. |
