# Error Feedback Behavior

## Error Model

Compilation errors must include:

- `line`: 1-based line number
- `column`: 1-based column number
- `message`: readable failure reason
- optional `code` and `severity`

## UI Requirements

- Editor displays inline and gutter highlights for compile/syntax errors.
- Error list panel groups errors by file/revision and allows quick navigation.
- Most recent compile result is always visible (success or failure).

## Preview Gating Rules

- Preview renders only artifacts from latest successful compile revision.
- If current revision fails compile, preview does not refresh to that revision.
- If no prior successful compile exists, preview area shows blocked placeholder.

## Acceptance Scenarios

1. Given valid LaTeX input, when compile succeeds, then preview updates and PDF download is enabled.
2. Given invalid LaTeX input, when compile fails, then line/column/message appears in editor and preview is blocked.
3. Given previous successful preview, when new invalid revision fails, then previous preview may remain visible but must be marked stale and non-current.
4. Given failed compile state, when user fixes errors and recompiles successfully, then preview unblocks and download is re-enabled.

## Non-Goals

- Auto-fix suggestions for LaTeX errors
- Review/comment workflows attached to errors
