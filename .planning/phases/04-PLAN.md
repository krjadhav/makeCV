<task id="1">
<name>Polish editor UX states and error messaging consistency</name>
<files>apps/web/src/editor/EditorPage.tsx, apps/web/src/editor/CompilePanel.tsx, apps/web/src/editor/DownloadButton.tsx, apps/web/src/editor/ShareDialog.tsx</files>
<action>
Specific implementation steps:
1. Standardize loading, empty, success, blocked, and stale UI states across compile/preview/share/download interactions.
2. Normalize user-facing error copy for compile, sharing, and permission failures.
3. Add UX-focused tests for state transitions and message rendering.
</action>
<verify>npm run -s test --workspace apps/web -- preview compile-feedback share download</verify>
<done>Editor UX is consistent across all critical states, and users receive clear, actionable feedback for failures.</done>
</task>

<task id="2">
<name>Harden API validation and error handling for release safety</name>
<files>apps/api/src/routes/compile.ts, apps/api/src/routes/shareLinks.ts, apps/api/src/routes/download.ts, apps/api/src/types/contracts.ts</files>
<action>
Specific implementation steps:
1. Add strict payload validation for compile requests and share-link creation.
2. Ensure route handlers return stable error envelopes for invalid input and forbidden actions.
3. Add tests for boundary and negative cases to prevent regressions.
</action>
<verify>npm run -s test --workspace apps/api -- compile contracts sharing-permissions download</verify>
<done>API rejects malformed or unauthorized requests safely and returns consistent contract-aligned errors.</done>
</task>

<task id="3">
<name>Finalize realtime reliability checks and reconnect behavior</name>
<files>apps/api/src/realtime/sessionServer.ts, apps/api/src/realtime/conflictResolver.ts, apps/web/src/collab/sessionClient.ts, apps/web/src/collab/syncState.ts</files>
<action>
Specific implementation steps:
1. Add reconnect retry and session rejoin behavior coverage for network interruption scenarios.
2. Validate duplicate/conflict handling under rapid concurrent updates.
3. Add targeted reliability tests for reconnect + resync consistency.
</action>
<verify>npm run -s test --workspace apps/api -- realtime sync-conflicts realtime-sync && npm run -s test --workspace apps/web -- realtime-client sync-recovery realtime-collab</verify>
<done>Realtime collaboration remains stable through reconnects and conflict scenarios without lost edits.</done>
</task>

<task id="4">
<name>Add release-level verification and packaging scripts</name>
<files>package.json, apps/web/package.json, apps/api/package.json, .atlas/verify.md, docs/testing/quality-gates.md</files>
<action>
Specific implementation steps:
1. Add consolidated `verify:release` command covering lint + all critical tests.
2. Ensure workspace scripts expose deterministic release checks.
3. Sync `.atlas/verify.md` and quality-gate docs with final release command set.
</action>
<verify>npm run -s verify:release</verify>
<done>Project has one deterministic release verification command that enforces the full readiness gate.</done>
</task>

<task id="5">
<name>Prepare deployment/readiness documentation and handoff notes</name>
<files>docs/release/launch-checklist.md, docs/release/runbook.md, docs/release/known-limitations.md, .planning/phases/04-SUMMARY.md</files>
<action>
Specific implementation steps:
1. Document launch checklist including verification commands, smoke tests, and rollback notes.
2. Write operational runbook for compile/realtime/share failure triage.
3. Capture known limitations and post-v1 follow-up backlog for transparent handoff.
</action>
<verify>test -f docs/release/launch-checklist.md && test -f docs/release/runbook.md && test -f docs/release/known-limitations.md && rg \"verify|rollback|smoke|limitation\" docs/release/*.md</verify>
<done>Release documentation is complete, actionable, and sufficient for deployment and post-release support.</done>
</task>
