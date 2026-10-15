---
verified_at: 2026-10-15
verified_commit: b3fe99d8acfb2bb18d3790970ce67ed2c049e613
---

# Gotchas — behaviour that surprises, with its cause

| What happens | Cause | What it means |
|---|---|---|
| `maxRetries: 3` makes three attempts in all, not three retries | `src/client.ts:77` loops `attempt < this.maxRetries` | the README says attempts (`README.md:311-316`) and `src/__tests__/client.test.ts:95-106` pins it; a test or fix that counts calls counts attempts |
| an axios timeout surfaces as `NetworkError`, not `TimeoutError` | `src/client.ts:92-99` catches every axios error without a response first; `src/client.ts:150` only sees non-axios errors | do not change one without deciding which class users get; it is public behaviour |
| a 403 throws `AuthenticationError` with status 401 | `src/client.ts:181-182` and `src/errors.ts:23-28` | a caller cannot tell a wrong key from a key without the scope by class or `statusCode` |
| retry tests take seconds | the backoff sleeps for real (`src/client.ts:195-197`) and the tests use no fake timers (`src/__tests__/client.test.ts:61-107`) | keep retry scenarios to one retry each, or add fake timers in that test |
| `npm run format:check` flags every file on a Windows checkout | Git's `core.autocrlf` writes CRLF, Prettier 3 expects LF, and `.prettierrc` sets no `endOfLine` | CI on Linux is the judge; locally use a checkout with `core.autocrlf=input` |
| the `User-Agent` reports an old version | hard-coded at `src/client.ts:48` | part of every release ([release.md](release.md)) |
| a tag publishes whatever `package.json` says | `ci-cd.yml:51-77` never compares the two | check the tag and `package.json:3` agree before pushing the tag |
