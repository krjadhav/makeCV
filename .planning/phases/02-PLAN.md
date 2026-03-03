<task id="1">
<name>Scaffold web and api workspaces for phase 2</name>
<files>package.json, apps/web/package.json, apps/web/src/main.tsx, apps/api/package.json, apps/api/src/server.ts</files>
<action>
Specific implementation steps:
1. Create a minimal workspace structure with `apps/web` and `apps/api`.
2. Scaffold the web editor shell and API server entrypoint following architecture docs.
3. Add base scripts (`dev`, `build`, `test`, `lint`) so later tasks can be verified consistently.
</action>
<verify>test -f package.json && test -f apps/web/src/main.tsx && test -f apps/api/src/server.ts && npm run -s lint --workspaces --if-present</verify>
<done>Repository has runnable web and API workspaces with standard scripts and a bootable baseline for editor + compile loop work.</done>
</task>

<task id="2">
<name>Implement compile request/status flow with structured error payloads</name>
<files>apps/api/src/routes/compile.ts, apps/api/src/services/compileService.ts, apps/api/src/types/contracts.ts</files>
<action>
Specific implementation steps:
1. Add compile request and compile status endpoints matching `docs/api/openapi.yaml`.
2. Return structured failure payloads with `line`, `column`, and `message` fields.
3. Persist latest successful artifact metadata for preview/download eligibility checks.
</action>
<verify>npm run -s test --workspace apps/api -- compile && npm run -s test --workspace apps/api -- contracts</verify>
<done>API supports compile lifecycle with contract-aligned success/failure responses and structured error details for editor rendering.</done>
</task>

<task id="3">
<name>Wire editor compile UX with preview gating on failures</name>
<files>apps/web/src/editor/EditorPage.tsx, apps/web/src/editor/CompilePanel.tsx, apps/web/src/state/previewState.ts</files>
<action>
Specific implementation steps:
1. Connect web editor actions to compile request/status APIs.
2. Surface compile errors in editor UI with line/column-aware highlighting hooks.
3. Implement preview states so failed revisions block refresh and successful revisions render preview.
</action>
<verify>npm run -s test --workspace apps/web -- preview && npm run -s test --workspace apps/web -- compile-feedback</verify>
<done>Editor displays compile feedback clearly, highlights failures, and enforces preview gating exactly as product docs specify.</done>
</task>

<task id="4">
<name>Add PDF download and link-sharing baseline behaviors</name>
<files>apps/api/src/routes/download.ts, apps/api/src/routes/shareLinks.ts, apps/web/src/editor/ShareDialog.tsx, apps/web/src/editor/DownloadButton.tsx</files>
<action>
Specific implementation steps:
1. Implement download endpoint that serves latest successful PDF artifact only.
2. Implement share-link creation endpoint with `view`/`edit` permission options.
3. Add web UI controls for creating share links and downloading PDFs with disabled states on invalid compile status.
</action>
<verify>npm run -s test --workspace apps/api -- download share && npm run -s test --workspace apps/web -- share download</verify>
<done>Users can generate basic share links and download PDFs only when a successful compile artifact exists.</done>
</task>

<task id="5">
<name>Establish phase 2 quality gates in CI-style verify scripts</name>
<files>package.json, apps/web/package.json, apps/api/package.json, .atlas/verify.md</files>
<action>
Specific implementation steps:
1. Add script aliases for compile-feedback, preview-gating, realtime-sync smoke, and sharing-permissions checks.
2. Ensure root-level verify commands run lint plus essential tests for web and API.
3. Update `.atlas/verify.md` to reference the concrete phase 2 commands.
</action>
<verify>npm run -s lint --workspaces --if-present && npm run -s test:compile-feedback && npm run -s test:preview-gating && npm run -s test:sharing-permissions</verify>
<done>Project has reproducible verification commands aligned with documented quality gates and ready for iterative execution.</done>
</task>
