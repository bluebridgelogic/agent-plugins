# Local workspace operations

These instructions are for the agent's tools. Present preview, draft and publication outcomes to the business owner; do not recite this procedure.

Use helper 0.7.0 or later from the HTTPS helperURL returned by Sites (normally https://manage.bluebridgelogic.com/setup/sites-workspace.mjs). Save it outside the client site folder. Node 22+/npm and a reachable local preview are required; otherwise use hosted editing.

## One existing connection

The MCP connector is the authentication entry point. Select an authorized site. Call `create_website_workspace_session({siteId})` when no valid local session exists. It returns a small JSON handoff, not source bytes. Transfer that JSON to `node <helper> connect` over stdin or with `--handoff-file <private-file>`. A handoff file must be regular, mode 0600, at most 8 KiB, in a private tools/temp location outside the site folder; remove it after exchange. Do not put the token in command arguments, displayed instructions, screenshots or chat prose, and never inspect Claude credential files or the helper's saved session credentials. Default server is the management origin; use --server only for an explicitly intended trusted alternative.

The handoff expires in 60 seconds and can be exchanged once. The helper saves a 15-minute site-scoped session privately outside the working folder. It can download the selected site's source/assets and use the existing context/changeset/operation APIs; it cannot publish or operate on another site. Source bytes transfer directly, avoiding large MCP results. On expiry or access change, request a fresh handoff through the authenticated connector and run connect again. This is automatic transfer setup, not another user-facing login. If the connector itself is disconnected, guide its normal connection once. Do not run the helper's legacy login command. If tools are stale or the new tool is unavailable, refresh discovery or use hosted editing instead of registering a second OAuth client.

## Download, preview and save

For a new site, run `open <siteId> <new-folder>`. The destination must not exist. Reuse an existing valid `.sites-workspace/state.json` with `status <folder>`; never overwrite an existing folder. Read the downloaded organization/site guidance in `.sites-workspace/context.json` and the site instructions, refreshing relevant planning context when resuming.

Run `install <folder>`, then `dev <folder> --port 4321` as a managed background process, and open its reachable preview. Installation suppresses dependency lifecycle scripts. Run `check <folder>` as appropriate and stop the development server when finished. For new still PNG/JPEG/WebP photos, run `image <folder> <local-image>`, reference its returned URL and check meaningful alt text and browser rendering. Existing binary replacement, arbitrary binaries, deletion/renaming and configuration/dependency changes are unsupported.

When asked to save, run `submit <folder> <short-summary>`. It submits exact changed bytes, source revision, hashes and a persisted idempotency key through the normal shared changeset service. Never submit the same edits separately via MCP. The eight-file / 512 KiB decoded batch and 256 KiB/file limits still apply. Do not silently split or omit changes. `status` polls operations; `recover` retries the exact saved operation if a reply was lost. A renewed transfer session may retry the same pending submission without inventing a new idempotency key.

Unsent changes remain local. On stale revision, preserve all files, open the current shared draft in another new folder, compare and deliberately reapply the edits. After saving, wait for `build.state: succeeded` and `preview.matchesOperation: true`, then share the protected preview. Approval and publication are separate owner actions. A saved draft, local preview or successful command does not establish publication.
