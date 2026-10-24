# Blue Bridge Sites 0.7.0 candidate

Local website editing uses the already authenticated MCP connection to issue a one-use, short-lived handoff to the transfer helper. The helper downloads source/assets and saves bounded batches directly with a 15-minute session for the selected site. It does not require a second browser OAuth login; renewal goes through the connector. Consent, session, client, organization role, revision and publication boundaries remain enforced.

All five skills now default to plain business-owner language: choose a site, preview changes, save a draft and review before publishing. Technical local-workspace procedures live in a supporting reference and are performed by the agent. Explicit technical questions still receive useful detail.

This package requires the matching deployed workspace-session API and helper 0.7.0. Automated/package evidence is distinct from actual account import and Claude Code Desktop acceptance. No client website was published by this release.
