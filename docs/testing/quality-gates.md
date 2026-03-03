# Quality Gates

## Compile Feedback Gates

- Gate: compile status visible to user within 1 second of worker completion.
- Gate: compile errors include `line`, `column`, `message` for 100% of failed compiles.
- Verify command: `npm run test:compile-feedback`

## Preview Correctness Gates

- Gate: preview updates only for successful compile revisions.
- Gate: failed revision sets preview state to blocked or stale with visible reason.
- Verify command: `npm run test:preview-gating`

## Realtime Sync Gates

- Gate: document edits propagate to second client in <= 250ms median on local test env.
- Gate: no lost edits in concurrent edit scenario test fixture.
- Verify command: `npm run test:realtime-sync`

## Sharing Permission Gates

- Gate: view link cannot mutate document state.
- Gate: edit link can mutate document state and participate in realtime sync.
- Verify command: `npm run test:sharing-permissions`

## Release Verification Bundle

Run all quality checks before marking execution complete:

- `npm run verify:release`

### Included checks

- `npm run lint`
- `npm run test:compile-feedback`
- `npm run test:preview-gating`
- `npm run test:realtime-sync`
- `npm run test:sharing-permissions`
