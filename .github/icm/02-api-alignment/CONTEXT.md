# 02-api-alignment — the pipeline

Compare with the API's own evidence, agree the scope with a person, then change the SDK once.

| Stage | Job | Input | Output | Human check |
|---|---|---|---|---|
| [`01_compare`](stages/01_compare/CONTEXT.md) | compare the SDK with the API | the request | `output/comparison.md` | A person reads `comparison.md`, checks the API evidence on two rows of their choosing, and approves which rows the next stage changes and whether the release this implies is breaking. |
| [`02_align`](stages/02_align/CONTEXT.md) | change the SDK to match | 01_compare's `comparison.md` | `output/pull-request.md` | A person reads `pull-request.md` against the approved comparison and confirms nothing outside the approved rows changed and every breaking change is listed first. |
