# Operational Runbook

## Compile Failures

- Symptom: frequent compile errors or missing preview updates.
- Check: run `npm run test:compile-feedback` and inspect compile error payload fields (`line`, `column`, `message`).
- Action: validate compile request payload and compile status response envelope.

## Realtime Sync Degradation

- Symptom: collaborators miss updates or resync repeatedly.
- Check: run `npm run test:realtime-sync`.
- Action: inspect conflict/duplicate handling in realtime session flow and reconnect retry behavior.

## Sharing Permission Incidents

- Symptom: `view` links can edit or `edit` links cannot edit.
- Check: run `npm run test:sharing-permissions`.
- Action: validate share-link permission mapping and access guard mode in web client.

## Escalation and Rollback

- Escalate to on-call owner if issue persists after one remediation cycle.
- Rollback to last known good commit when verify gate cannot pass.
- After rollback, rerun smoke and verify bundle before restoring traffic.
