# Project Context

Collaborative web LaTeX editor for teams to create, edit, compile, preview, and share documents in real time.

## Current State

See [.planning/STATE.md](.planning/STATE.md) for active phase, plan, and scope.

## Codebase

Current repository has workflow scripts under `scripts/` and Atlas command/skill config under `.claude/`, `.agents/`, and `.codex/`; product application code is not scaffolded yet.

## Patterns

- When API route handlers return envelopes (`statusCode` + `body`), consume them through one shared normalizer before UI state updates.
- All document-scoped read/write paths must enforce explicit authorization checks tied to share permission or user identity.

## Anti-patterns

- Do not use predictable share-link tokens; use cryptographically random, expiring tokens.
