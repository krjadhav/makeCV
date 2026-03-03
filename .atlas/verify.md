# Verification Workflow

Run these checks before marking a task complete.

## 1) Lint

- `npm run -s lint --workspaces --if-present`

## 2) Phase 2 Quality Gates

- `npm run -s test:compile-feedback`
- `npm run -s test:preview-gating`
- `npm run -s test:realtime-sync`
- `npm run -s test:sharing-permissions`

## 3) Manual Validation

- Confirm compile errors surface with line/column markers in editor feedback.
- Confirm preview remains blocked or stale when latest compile fails.
- Confirm successful compile enables PDF download.
- Confirm share links preserve `view` and `edit` permissions.

## 4) Completion Bundle

Run full verification bundle for phase completion:

- `npm run -s lint --workspaces --if-present`
- `npm run -s test:compile-feedback`
- `npm run -s test:preview-gating`
- `npm run -s test:realtime-sync`
- `npm run -s test:sharing-permissions`
