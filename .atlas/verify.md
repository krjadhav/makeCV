# Verification Workflow

Run these checks before marking a task complete.

## 1) Workspace Verification

- `npm run -s verify --workspace apps/web`
- `npm run -s verify --workspace apps/api`

## 2) Release Gate

- `npm run -s verify:release`

## 3) Manual Smoke Checks

- Confirm compile errors surface with consistent messaging in editor UI.
- Confirm preview/download/share actions reflect success, blocked, and stale states correctly.
- Confirm reconnect flow restores collaboration session and sync state.
- Confirm view links remain read-only and edit links support realtime changes.

## 4) Rollback Readiness

- If release gate fails, revert to last known good commit and rerun `npm run -s verify:release`.
