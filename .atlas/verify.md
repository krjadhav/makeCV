# Verification Workflow

Run these checks before marking a task complete.

## 1) Lint

- `npm run -s lint --workspaces --if-present`

## 2) Core Quality Gates

- `npm run -s test:compile-feedback`
- `npm run -s test:preview-gating`

## 3) Collaboration Quality Gates

- `npm run -s test:realtime-sync`
- `npm run -s test:sharing-permissions`

## 4) Manual Validation

- Confirm two editors can collaborate in one session and both receive updates.
- Confirm conflict acknowledgements trigger client resync behavior.
- Confirm `view` share links stay read-only in realtime and mutation flows.
- Confirm collaborator presence list updates for join/leave activity.

## 5) Completion Bundle

Run full verification bundle for phase completion:

- `npm run -s lint --workspaces --if-present`
- `npm run -s test:compile-feedback`
- `npm run -s test:preview-gating`
- `npm run -s test:realtime-sync`
- `npm run -s test:sharing-permissions`
