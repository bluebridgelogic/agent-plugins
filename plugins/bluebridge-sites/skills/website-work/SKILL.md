---
name: website-work
description: Inspect Blue Bridge Sites website draft status and plan or prepare website changes. Use for editing a site, checking a draft or reviewing a protected preview.
---

# Website Work

Read [access and capability rules](references/access.md). Choose a returned authorized site and call `get_site_status`. Load `get_site_brief` when implemented; current mock context is not a real brief. Report draft/preview status in client language and link the returned portal URL.

Check source/workspace and submission capabilities before promising edits. The current `prepare_workspace` and `submit_draft` previews perform no work and return no repository, commit or build URL. If unavailable, prepare a proposed edit/brief in the conversation. Ordinary Chat may lack a local runtime even when other interfaces have one.

When actual authorized source access becomes available, preserve local edits, read the site's guidance, use its locked package manager and registered checks, and inspect the local preview including mobile behavior, links and contact paths. Submit using expected source commit/draft revision only through implemented, authorized operations. Reconcile concurrent edits without force-pushing or resetting dirty work.

Only real hosted preparation establishes a protected draft. A local preview/commit is separate evidence. Human approval and separate publication remain in Sites; never approve or publish on the client's behalf.
