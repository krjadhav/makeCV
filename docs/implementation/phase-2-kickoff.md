# Phase 2 Kickoff Checklist

## Goal

Implement core editor and compile loop so users can edit LaTeX collaboratively, get fast error feedback, preview successful output, and download PDFs.

## Work Items

1. Editor foundation
- Build web editor shell with LaTeX syntax highlighting and diagnostics panel.
- Wire document state model with revision IDs and autosave hooks.
- Verify: open sample document, trigger local diagnostics, confirm line/column mapping.

2. Realtime collaboration baseline
- Implement session channel for document updates between two clients.
- Add optimistic update handling and server acknowledgements.
- Verify: edit from client A appears on client B within target sync latency.

3. Compile pipeline integration
- Add compile request API client and compile status polling/subscription.
- Render compile errors in editor using structured payload.
- Verify: invalid source returns failed status and highlights exact positions.

4. Preview gating behavior
- Implement preview state machine (`idle`, `success`, `blocked`, `stale`).
- Gate preview refresh on successful compile revision only.
- Verify: failed revision never updates current preview artifact.

5. PDF download behavior
- Enable download button only when latest successful artifact exists.
- Route downloads through secured endpoint for current document access.
- Verify: successful compile enables download and returns current artifact.

6. Sharing baseline
- Add share modal to generate view/edit links.
- Validate permission when link recipient opens document.
- Verify: view link blocks edits, edit link allows edits.

## Exit Criteria for Phase 2

- Core editing and compile loop is functional end-to-end.
- Error feedback is accurate and actionable.
- Preview/download behavior respects compile success state.
- Sharing works with basic permission model.
