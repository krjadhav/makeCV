<task id="1">
<name>Define v1 architecture and service boundaries</name>
<files>docs/architecture.md, docs/adr/0001-v1-architecture.md</files>
<action>
Specific implementation steps:
1. Document the end-to-end request flow for edit, compile, preview, share, and PDF download.
2. Define service boundaries for web app, realtime collaboration layer, compile worker, and storage.
3. Capture architecture decisions and trade-offs in an ADR focused on reliability and fast compile feedback.
</action>
<verify>test -f docs/architecture.md && test -f docs/adr/0001-v1-architecture.md && rg "compile|preview|share|download|realtime" docs/architecture.md</verify>
<done>Architecture doc and ADR clearly describe components, data flow, and boundaries aligned with instant compilation feedback.</done>
</task>

<task id="2">
<name>Specify compile and sharing API contracts</name>
<files>docs/api/openapi.yaml, docs/contracts/compile-error.schema.json, docs/contracts/share-link.schema.json</files>
<action>
Specific implementation steps:
1. Define API endpoints for compile request/status, preview retrieval, share-link creation, and PDF download.
2. Specify compile error response shape with line/column and human-readable message for editor highlighting.
3. Define share-link permissions model (view/edit) and validation rules.
</action>
<verify>test -f docs/api/openapi.yaml && test -f docs/contracts/compile-error.schema.json && test -f docs/contracts/share-link.schema.json && rg "line|column|message|permission" docs/contracts/*.json</verify>
<done>Contracts are explicit enough for frontend/backend parallel work and include error metadata needed for syntax-highlighted feedback.</done>
</task>

<task id="3">
<name>Lock v1 UX behavior for compile feedback and error gating</name>
<files>docs/product/v1-scope.md, docs/product/user-flows.md, docs/product/error-feedback.md</files>
<action>
Specific implementation steps:
1. Define user flows for create/edit, compile, preview, share by link, and PDF download.
2. Specify exact behavior when LaTeX syntax/compile errors occur (preview blocked, error surfaced in editor).
3. Write acceptance scenarios for "instant feedback" and "preview only on successful compile".
</action>
<verify>test -f docs/product/v1-scope.md && test -f docs/product/user-flows.md && test -f docs/product/error-feedback.md && rg "blocked|syntax|compile|preview|PDF" docs/product/*.md</verify>
<done>Product docs make preview/error behavior unambiguous and define acceptance scenarios for core v1 journeys.</done>
</task>

<task id="4">
<name>Create Phase 2 technical kickoff checklist</name>
<files>docs/implementation/phase-2-kickoff.md, docs/testing/quality-gates.md</files>
<action>
Specific implementation steps:
1. Break Phase 2 into concrete engineering work items for editor, compile pipeline, and minimal sharing.
2. Define quality gates for compile latency, sync correctness, and error feedback accuracy.
3. Map each work item to verification commands/checks to support $atlas:execute.
</action>
<verify>test -f docs/implementation/phase-2-kickoff.md && test -f docs/testing/quality-gates.md && rg "latency|sync|error|verify" docs/implementation/phase-2-kickoff.md docs/testing/quality-gates.md</verify>
<done>Phase 2 has a concrete execution checklist with measurable quality gates and verification steps.</done>
</task>
