# ADR 0001: V1 Architecture for Collaborative LaTeX Editor

## Status

Accepted

## Context

V1 requires realtime collaborative editing with fast compile feedback, browser preview, share-by-link access, and PDF download. Errors must surface clearly in the editor, and preview must be blocked when compilation fails.

## Decision

Use a service-oriented architecture with separate responsibilities:

- Web App for editing, error rendering, preview UI, and sharing controls.
- Realtime Collaboration Service for document synchronization.
- Compile API + Compile Worker for asynchronous LaTeX builds.
- Share Service for link generation and permission validation.
- Asset Storage for source snapshots and compile artifacts.

Compilation is asynchronous by revision ID. Successful revisions produce preview/downloadable artifacts. Failed revisions produce structured errors and no preview artifact.

## Trade-offs

- Pros:
  - Clear ownership boundaries reduce coupling.
  - Compile workloads can scale independently.
  - Error feedback path is explicit and optimized for UI rendering.
- Cons:
  - More cross-service coordination than monolith design.
  - Requires strong observability and job tracing between API and workers.

## Consequences

- API contracts must include compile revision IDs and structured error payloads.
- Product behavior must enforce preview gating on failed compile state.
- Phase 2 implementation should prioritize compile latency and revision consistency.

