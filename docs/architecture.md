# V1 Architecture

## Goals

- Deliver instant and clear compile feedback for collaborative LaTeX editing.
- Allow link-based sharing with minimal permission controls.
- Support browser preview and PDF download on successful compile.

## Components

- Web App: Browser UI for editor, syntax-highlighted errors, preview panel, and sharing controls.
- Realtime Collaboration Service: Synchronizes document operations between connected clients.
- Compile API: Accepts compile requests and returns status plus latest compile metadata.
- Compile Worker: Runs LaTeX compilation jobs in isolated workers.
- Asset Storage: Stores source snapshots, compile artifacts, and generated PDFs.
- Share Service: Issues and validates link-based access tokens (view/edit).

## End-to-End Flow

1. User opens document in Web App and receives current snapshot + realtime channel.
2. User edits content; operations are sent to Realtime Collaboration Service and broadcast to peers.
3. Compile trigger (manual or debounce) sends current document revision to Compile API.
4. Compile API enqueues a compile job; Compile Worker processes it.
5. If compile fails:
   - Worker emits structured errors (line, column, message).
   - Web App highlights syntax/compile errors.
   - Preview remains blocked for that failed revision.
6. If compile succeeds:
   - Worker stores PDF artifact in Asset Storage.
   - Compile API marks revision successful and returns artifact pointers.
   - Web App renders preview and enables download.
7. Share-by-link:
   - Owner creates share link (view/edit).
   - Invitee opens link, token is validated, and document access is granted per permission.

## Service Boundaries

- Web App only handles presentation and user interaction; no compile logic.
- Realtime Collaboration Service owns multi-user consistency and conflict handling.
- Compile API orchestrates compile requests/status and artifact references.
- Compile Worker owns LaTeX runtime execution and error extraction.
- Share Service owns permission model and token lifecycle.
- Asset Storage is source of truth for compile outputs and downloadable files.

## Reliability Notes

- Compile jobs are idempotent by document revision.
- Failed compile responses are never cached as preview artifacts.
- Realtime edits continue even when compile fails; feedback loop remains active.

