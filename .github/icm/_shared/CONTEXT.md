# Shared reference

What every job on this repository draws on. Each file points at the repository file that owns a fact; follow the pointer for the detail.

| File | Answers |
|---|---|
| [architecture.md](architecture.md) | where each part of the SDK lives and what it does with a request |
| [build-and-test.md](build-and-test.md) | how to build, lint and test as CI does, and what counts as evidence |
| [api-alignment.md](api-alignment.md) | which repository publishes `@memoryrelay/sdk`, what it covers, and how it is kept in line with the API |
| [release.md](release.md) | how a version is chosen, tagged and published to npm, and how to confirm it |
| [gotchas.md](gotchas.md) | behaviour that surprises, each with the line that causes it |
| [documents.md](documents.md) | the repository's documents, who owns their facts, and where they have drifted |

Each stage's contract names the files it loads.
