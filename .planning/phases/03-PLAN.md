<task id="1">
<name>Add realtime document session transport with versioned operations</name>
<files>apps/api/src/realtime/sessionServer.ts, apps/api/src/realtime/operationStore.ts, apps/web/src/collab/sessionClient.ts</files>
<action>
Specific implementation steps:
1. Implement a session channel for join/leave/update events per document.
2. Add versioned operation envelopes (`documentId`, `revisionId`, `opId`, `authorId`) with server acknowledgement.
3. Create web client adapter for subscribe/publish/reconnect behavior.
</action>
<verify>npm run -s test --workspace apps/api -- realtime && npm run -s test --workspace apps/web -- realtime-client</verify>
<done>Two clients can join the same document session, exchange versioned operations, and receive server acknowledgements reliably.</done>
</task>

<task id="2">
<name>Implement conflict handling and no-loss sync guarantees</name>
<files>apps/api/src/realtime/conflictResolver.ts, apps/api/src/realtime/sessionServer.ts, apps/web/src/collab/syncState.ts</files>
<action>
Specific implementation steps:
1. Add server-side conflict handling for out-of-order or duplicate operations.
2. Enforce idempotent apply semantics using `opId` tracking and revision checks.
3. Add client sync recovery path for mismatch detection and state resync.
</action>
<verify>npm run -s test --workspace apps/api -- sync-conflicts && npm run -s test --workspace apps/web -- sync-recovery</verify>
<done>Concurrent edits are merged deterministically, duplicate operations are ignored safely, and clients recover from revision mismatch without data loss.</done>
</task>

<task id="3">
<name>Enforce share-link permissions in realtime and API flows</name>
<files>apps/api/src/auth/shareAccess.ts, apps/api/src/routes/shareLinks.ts, apps/api/src/realtime/sessionServer.ts, apps/web/src/collab/accessGuard.ts</files>
<action>
Specific implementation steps:
1. Validate `view` and `edit` permissions for session join and mutation attempts.
2. Block write operations for `view` links across realtime and HTTP mutation routes.
3. Add web-side access guard states to disable editing when permission is read-only.
</action>
<verify>npm run -s test --workspace apps/api -- sharing-permissions && npm run -s test --workspace apps/web -- access-guard</verify>
<done>View-only links cannot mutate document state, while edit links can collaborate in realtime and trigger compile updates.</done>
</task>

<task id="4">
<name>Add presence and collaborator awareness in editor UI</name>
<files>apps/web/src/collab/presenceStore.ts, apps/web/src/editor/CollaboratorBar.tsx, apps/web/src/editor/EditorPage.tsx</files>
<action>
Specific implementation steps:
1. Add presence model for active collaborators (join, leave, heartbeat timeout).
2. Render collaborator list/status in editor shell.
3. Wire session events to update presence state without disrupting compile feedback flow.
</action>
<verify>npm run -s test --workspace apps/web -- presence && npm run -s test --workspace apps/web -- editor-collab</verify>
<done>Editor shows active collaborators accurately and presence updates remain stable during continuous edits/compiles.</done>
</task>

<task id="5">
<name>Finalize collaboration quality gates and end-to-end collaboration checks</name>
<files>apps/api/tests/realtime-sync.test.mjs, apps/web/tests/realtime-collab.test.mjs, package.json, .atlas/verify.md</files>
<action>
Specific implementation steps:
1. Add end-to-end collaboration tests for two-client sync, permission enforcement, and reconnect behavior.
2. Add or update root scripts for realtime collaboration verification bundle.
3. Update `.atlas/verify.md` to include collaboration-specific checks for Phase 3 completion.
</action>
<verify>npm run -s test:realtime-sync && npm run -s test:sharing-permissions && npm run -s lint --workspaces --if-present</verify>
<done>Project has repeatable collaboration verification that proves realtime sync correctness and permission safety before phase completion.</done>
</task>
