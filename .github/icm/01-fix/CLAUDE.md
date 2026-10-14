# 01-fix — fix a defect

One run is one defect in the SDK's own behaviour (a retry, an error class, a validation, a failing test or a red `CI/CD` run): reproduced, fixed at its cause, and proposed as a pull request with the evidence. Every merged pull request so far has been a `fix:`. When the defect is the API's shape rather than the SDK's logic, the run stops and the person starts `02-api-alignment` (route `fix-to-align` in the root `AGENTS.md`).

Stages, in order; inputs, outputs and checks for each are in [CONTEXT.md](CONTEXT.md):

1. [Reproduce](stages/01_reproduce/CONTEXT.md) — make it fail on purpose.
2. [Fix](stages/02_fix/CONTEXT.md) — change the cause, watch the reproduction pass.
3. [Verify](stages/03_verify/CONTEXT.md) — the full CI chain and the pull request.
