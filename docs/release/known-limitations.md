# Known Limitations

- Realtime collaboration currently uses in-memory session state and is not horizontally scalable.
- Compile pipeline is a simplified simulation and does not execute a full TeX engine runtime.
- Presence tracking is session-scoped and does not persist across server restarts.
- Error messaging is standardized for current routes but does not yet include localized language variants.

## Post-v1 Follow-up Backlog

- Add persistent realtime backend and distributed pub/sub transport.
- Replace compile simulation with hardened sandboxed LaTeX worker runtime.
- Add observability dashboards and structured alerting for compile/realtime failure rates.
- Improve limitation documentation with SLO targets and production capacity constraints.
