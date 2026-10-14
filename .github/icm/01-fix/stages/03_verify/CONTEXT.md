# 03_verify — run CI's chain, write the pull request

One job: the pull request a reviewer can merge, with the checks CI will run already run.

## Inputs
- Working (this run): `.github/icm/01-fix/stages/02_fix/output/change.md`
- Reference (every run): `.github/icm/_shared/build-and-test.md`
- Reference (only when the checkout is on Windows): `.github/icm/_shared/gotchas.md`

Do NOT load: the other pipelines, `.github/icm/_shared/release.md`, other runs' output.

## Process
1. Run the chain of the `test` job in `ci-cd.yml`: `npm ci && npm run lint && npm run format:check && npm run build && npm run test:coverage`. On a Windows checkout, read the format result as [gotchas.md](../../../_shared/gotchas.md) says.
2. Write the pull request: what was wrong, how you know (the reproduction), what the change does, the checks and their results. Title `fix: <the outcome>`, the shape of the history; its title becomes a line of the next release's notes.
3. After the human check, open it against `main` from this file (`gh pr create --repo memoryrelay/node-sdk --base main --title "<title>" --body-file <this stage's output/pull-request.md>`). Wait for `CI/CD` to pass. Never merge, never tag.

## Outputs
- pull-request.md → output/ — the title and body, the checks run with their results, and whether the change needs a release.

## Human check
A person reads `pull-request.md` and its evidence, then says whether to open it. The reviewer, not the author, merges.
