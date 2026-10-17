---
name: bluebridge-website
description: Inspect Blue Bridge Sites source and draft status, and plan website changes. Use for understanding a website, checking its draft or reviewing a protected preview.
---

# Update my website

Read [access and capability rules](references/access.md). Choose an authorized site and call `get_site_status`. With source consent, use `get_editing_context`, inventory, literal search and focused range reads to inspect guidance, relevant pages and shared layout/styles at the returned draft commit. Organization strategy has a separate source commit; do not substitute its `main` tip for the website draft. Old `get_site_brief` is a mock.

Website mutation/build submission remains unavailable through MCP. `prepare_workspace` and `submit_draft` previews perform no work. Explain this when asked to implement an edit; prepare an accurate proposal from the source. An available marketing save tool can record the brief/planned work in registered organization documents, but cannot change website files or build a preview. Do not route writes through planning paths to bypass this boundary.

The selected future website workflow uses hosted edits/previews without a client-local runtime. Keep local developer work distinct from real accepted source/build results. Human approval and separate publication remain in Sites; a ready preview or saved brief is not publication.
