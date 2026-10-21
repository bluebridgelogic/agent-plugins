---
name: bluebridge-website
description: Edit Blue Bridge Sites website drafts and inspect hosted build results and protected previews. Use for changing website copy, layout, styles or source, reviewing a draft, or resuming website work.
---

# Update my website

Read [access and capability rules](references/access.md). Select an authorized site and read current status/context through the connector, or through the signed-in local helper when the desktop flow below is available. Check `site.editing.canEdit` and actual execution availability. Website writes require source-read consent, management consent (`sites:manage`) and current owner/editor membership. If unavailable, explain the specific limitation and prepare an unsaved proposal; never route website writes through marketing-document paths. Old `get_site_brief`, `prepare_workspace` and `submit_draft` remain mocks.

## Choose the editing environment

Prefer a local workspace when the agent can read/write a persistent folder, run Node 22+/npm and keep a development server running, and the user/browser can actually reach that preview. Claude Code Desktop is the initial target. Ordinary desktop chat, a phone, a sandbox with no reachable preview or a remote MCP connector alone does not establish those capabilities. Use the hosted flow below when local execution is unavailable. Both paths save through Sites and use the same hosted review/publication boundary.

For local work, first check whether the selected folder already contains `.sites-workspace/state.json`. Reuse a valid workspace with `status`, its saved context and current planning reads; do not download over it. For a different existing folder, choose a new subfolder without replacing its files.

1. When available, call `get_website_workspace` to discover the manifest/helper URL. A cached connector list may omit this new tool: the standalone helper establishes its own fresh Sites connection, so you may use the canonical helper URL below, sign in, list authorized sites with its `sites` command and let `open` fetch the manifest. If that fresh request reports the backend unavailable, use the supported hosted flow or explain the limitation. Never use the mock `prepare_workspace`. Preserve any existing working folder.
2. Download the standalone helper from the returned HTTPS `helperURL` (normally `https://manage.bluebridgelogic.com/setup/sites-workspace.mjs`) to a tools location outside the client's site folder. It is a Node script with no helper dependencies. Never add operator credentials or GitHub credentials. Run `node /path/to/sites-workspace.mjs login`; the user signs into Sites and consents in their browser. This helper has its own sign-in, separate from the connector. Never read or print its private credential files.
3. Run `node /path/to/sites-workspace.mjs open <siteId> /path/to/new-site-folder`. The destination must not already exist. The returned folder contains actual site source/assets/build inputs and `.sites-workspace/context.json` with organization/site guidance. Read that context and site guidance; refresh relevant strategy via the connector when resuming.
4. Run the helper's `install <folder>`, then `dev <folder> --port 4321` as a managed background task. Installation suppresses dependency lifecycle scripts. Use local preview/browser tools where available and verify the URL is reachable; otherwise explain the limitation and use the hosted path. Stop the server when finished. `check <folder>` runs the project's check script.
5. Make and preview several local edits without submitting each iteration. Run `status <folder>` before reporting saved work. Explicitly distinguish changes saved on this computer from a batch saved to Sites; another device cannot see unsent files.
6. To add a new photo, check current context advertises image upload support. Run the helper's `image <folder> <local-image>` command and use its returned URL in the page. It imports a still PNG/JPEG/WebP into an immutable content-addressed upload path. Each image must be at most 256 KiB; the eight-file and 512 KiB decoded batch limits include images. Verify rendering and meaningful alt text. Existing binary assets cannot be replaced.
7. When the user wants to save/share the batch, run `submit <folder> "Short summary"`. The helper gathers exact changed files and baseline hashes and invokes the same changeset API. Do not also submit those edits separately via MCP. Existing eight-file/512 KiB decoded batch limits apply. Unsupported configuration/arbitrary binary changes, deletion/renaming and links block the batch; do not silently omit them or split an atomic batch.
7. Run `status <folder>` to follow source acceptance/build/preview. If the response was lost or preparation needs retry, run `recover <folder>` once: it reuses the exact saved batch/key or operation. Preserve pending metadata. Additional local changes while a batch runs remain unsent. If the shared draft moved, preserve the original folder, open the current draft in a different new folder and intentionally reconcile; never reset or overwrite local edits.
8. Confirm the hosted operation's successful build and matching preview using the rules below. A fast local preview is not the verified hosted artifact. Approval and publication remain in Sites.

The user may select the downloaded site folder as the Claude Code Desktop project. Keep client-facing explanations about the working folder and preview; do not require the client to understand Git, branches or hashes. Credentials stay outside that folder, and the helper does not initialize/push Git. Mac desktop behavior is the initial target; actual app verification is separate from automated tests.

## Understand and author

Read the site's guidance and relevant organization strategy, page source and shared layout/navigation/styles. Use inventory, literal search and focused range reads to locate relevant content, then obtain complete files before replacing them. Never reconstruct a whole file from incomplete snippets. Website source has its own draft commit; strategy can have a different pin. Use the current site source commit and draft revision returned by context.

Make the requested change with related files together. Preserve approved identity, unrelated work, contact paths, accessibility and claim-review requirements. Decisions should inform dependent changes; routine authorized edits do not need a new decision record. Do not invent claims or results.

## Save a draft and check its preview

Call `apply_website_changeset` with `siteId`, `expectedCommit`, `expectedRevision`, a stable fresh `idempotencyKey`, a short `summary` and `changes: [{path, content, expectedSha256}]`. A replacement uses the complete prior file SHA256; a new file uses null and must be absent. Submit exact UTF-8 source, with no hidden rewriting. Maximum eight distinct files, 256 KiB each and 512 KiB total content. Only permitted text files under the registered `src/` and `public/` roots are writable. Still-image additions use the explicit image schema below. Arbitrary binary uploads, binary replacements, deletion/renaming, dependencies/configuration, instructions and other sites are unsupported. Offer alternatives or record follow-up work without bypassing these bounds.

Retain the returned operation ID and poll `get_website_operation` at reasonable intervals. `status: committed` means source saved and preparation pending; `status: queued` identifies an accepted draft revision/build, not a ready preview. Confirm `build.state: succeeded` and `preview.matchesOperation` before claiming the requested preview is ready. Link `portalURL` for the user to open the protected preview after sign-in. If the build is pending, report it as pending; closing the conversation does not cancel accepted work.

After a failed build, inspect the available status/logs and correct the specific source problem through another changeset. Explain that the retained last successful preview shows an older version when `preview.isStale` is true. A successful build does not establish visual correctness; use available browser verification or request review of the actual preview before describing appearance as verified.

## Resume and recover

Start another conversation with `get_editing_context` and `list_website_operations`, then inspect the relevant operation and source. Do not replay remembered edits blindly. Multiple changesets may accumulate on the same draft before release review.

If a submission response is lost, retry the same exact payload and idempotency key or use `retry_website_operation` for the discovered ID. Reusing a key for different content fails. A source conflict requires rereading/reconciling and a new key, never a forced overwrite. For a failed build with unchanged current source, `retry_website_build` takes the exact current commit/revision and does not reapply edits. After one recovery attempt, if the same failure persists without new evidence, stop retrying, report the operation ID/status and request Blue Bridge follow-up. Do not invent a repair or create repeated commits to work around infrastructure failures.

Describe results as draft saved, build pending/failed or preview ready, with the relevant limitation. Keep source hashes/branches in tool calls and technical records unless asked. Preparing a preview never creates or approves a release, merges source to main or publishes the site. Human review and separate publication stay in Sites.

## Images in hosted changesets

Discover `editing.imageUploads` before promising an upload. Where the agent can access the exact image bytes, image additions can share `apply_website_changeset` with text changes: canonical base64 content, `encoding: "base64"`, `expectedSha256: null`, and the selected project path followed by `public/uploads/<decoded-SHA256>.<png|jpg|webp>`. Use the canonical format extension (`jpg` for JPEG). Never guess image bytes or hashes, pass a remote URL as file content, or turn unsupported attachments into a fabricated upload. If the environment cannot access the bytes, explain that limitation and use a capable desktop environment. Container validation does not establish browser rendering. The same 256 KiB/file, eight-file and 512 KiB decoded batch limits apply, with server dimension limits. Do not split a requested atomic batch silently. Image save creates no approval/publication.
