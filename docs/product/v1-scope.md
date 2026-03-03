# V1 Scope

## Product Summary

Web-based collaborative LaTeX editor focused on instant compilation feedback, in-browser preview, and link-based sharing for teammates.

## Core Value

Compilation feedback should be immediate, clear, and actionable while editing.

## In Scope

- Real-time collaborative editing on shared LaTeX documents
- Syntax-aware editor highlighting for LaTeX and compile errors
- Compile pipeline that reports line/column/message for failures
- Preview panel that renders only successful compile outputs
- Link-based sharing with basic `view` and `edit` permissions
- PDF download of latest successful compile artifact

## Out of Scope

- Billing/subscriptions
- Third-party integrations
- Project management workflows
- Rich commenting/review workflows

## Release Guardrails

- No preview rendering from revisions with compile/syntax errors
- No download for revisions without a successful compile artifact
- Web UX must be usable on modern desktop and mobile browsers
