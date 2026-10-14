# 02_fix — change the cause, not the symptom

One job: the smallest change at the defect's cause that turns the reproduction green without weakening it.

## Inputs
- Working (this run): `.github/icm/01-fix/stages/01_reproduce/output/reproduction.md`
- Reference (every run): `.github/icm/_shared/architecture.md`
- Reference (every run): `.github/icm/_shared/build-and-test.md`
- Reference (only when the change touches an exported name or a behaviour the README documents): `.github/icm/_shared/documents.md`

Do NOT load: the other pipelines, `.github/icm/_shared/release.md`, other runs' output.

## Process
1. Read the reproduction and its suspected cause. Confirm the cause in the code before changing anything; if it moved, record where it really is.
2. Change the cause. Do not edit the reproduction to make it pass; if it was wrong, go back to stage 01.
3. Keep the public surface (`src/index.ts` and what it re-exports) as it is. If the fix must rename, remove or change the type of an export, say so in `change.md`: before 1.0 that makes the next release a minor bump, which the release run decides.
4. If the README documents the old behaviour, correct that passage in the same change.
5. Run the reproduction (green now) and the whole suite: `npm run build && npm run test:coverage`.

## Outputs
- change.md → output/ — the cause in one paragraph; each file changed and why; whether the public surface changed; the reproduction's passing output and the suite's result.

## Human check
A person reads the diff beside the reproduction and confirms it removes the cause, not only the symptom the test sees, and that no export changed without being said.
