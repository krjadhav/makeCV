# Launch Checklist

## Pre-Launch Verify

1. Run full release verification: `npm run verify:release`
2. Confirm all checks pass with zero failing tests.
3. Confirm working tree only contains intended release changes.

## Smoke Validation

1. Open two browser sessions and verify realtime edits sync in both.
2. Trigger compile failure and verify error markers + blocked preview state.
3. Fix compile errors and verify preview/download recovery.
4. Generate `view` share link and verify read-only behavior.
5. Generate `edit` share link and verify collaborative editing.

## Rollback Plan

1. If smoke fails, rollback to previous stable commit.
2. Re-run `npm run verify:release` on rollback commit.
3. Re-open launch window only after passing verify + smoke checks.
