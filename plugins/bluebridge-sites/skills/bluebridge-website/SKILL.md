---
name: bluebridge-website
description: Edit Blue Bridge Sites website drafts and inspect hosted build results and protected previews. Use for changing website copy, layout, styles or source, reviewing a draft, or resuming website work.
---

# Update my website

Read [access and capability rules](references/access.md). Select an authorized site and call `get_site_status` and `get_editing_context`. Check `site.editing.canEdit` and actual tool availability. Website writes require source-read consent, management consent (`sites:manage`) and current owner/editor membership. If unavailable, explain the specific limitation and prepare an unsaved proposal; never route website writes through marketing-document paths. Old `get_site_brief`, `prepare_workspace` and `submit_draft` remain mocks.

## Understand and author

Read the site's guidance and relevant organization strategy, page source and shared layout/navigation/styles. Use inventory, literal search and focused range reads to locate relevant content, then obtain complete files before replacing them. Never reconstruct a whole file from incomplete snippets. Website source has its own draft commit; strategy can have a different pin. Use the current site source commit and draft revision returned by context.

Make the requested change with related files together. Preserve approved identity, unrelated work, contact paths, accessibility and claim-review requirements. Decisions should inform dependent changes; routine authorized edits do not need a new decision record. Do not invent claims or results.

## Save a draft and check its preview

Call `apply_website_changeset` with `siteId`, `expectedCommit`, `expectedRevision`, a stable fresh `idempotencyKey`, a short `summary` and `changes: [{path, content, expectedSha256}]`. A replacement uses the complete prior file SHA256; a new file uses null and must be absent. Submit exact UTF-8 source, with no hidden rewriting. Maximum eight distinct files, 256 KiB each and 512 KiB total content. Only permitted text files under the registered `src/` and `public/` roots are writable. Binary/image uploads, deletion/renaming, dependencies/configuration, instructions and other sites are unsupported. Offer alternatives or record follow-up work without bypassing these bounds.

Retain the returned operation ID and poll `get_website_operation` at reasonable intervals. `status: committed` means source saved and preparation pending; `status: queued` identifies an accepted draft revision/build, not a ready preview. Confirm `build.state: succeeded` and `preview.matchesOperation` before claiming the requested preview is ready. Link `portalURL` for the user to open the protected preview after sign-in. If the build is pending, report it as pending; closing the conversation does not cancel accepted work.

After a failed build, inspect the available status/logs and correct the specific source problem through another changeset. Explain that the retained last successful preview shows an older version when `preview.isStale` is true. A successful build does not establish visual correctness; use available browser verification or request review of the actual preview before describing appearance as verified.

## Resume and recover

Start another conversation with `get_editing_context` and `list_website_operations`, then inspect the relevant operation and source. Do not replay remembered edits blindly. Multiple changesets may accumulate on the same draft before release review.

If a submission response is lost, retry the same exact payload and idempotency key or use `retry_website_operation` for the discovered ID. Reusing a key for different content fails. A source conflict requires rereading/reconciling and a new key, never a forced overwrite. For a failed build with unchanged current source, `retry_website_build` takes the exact current commit/revision and does not reapply edits. After one recovery attempt, if the same failure persists without new evidence, stop retrying, report the operation ID/status and request Blue Bridge follow-up. Do not invent a repair or create repeated commits to work around infrastructure failures.

Describe results as draft saved, build pending/failed or preview ready, with the relevant limitation. Keep source hashes/branches in tool calls and technical records unless asked. Preparing a preview never creates or approves a release, merges source to main or publishes the site. Human review and separate publication stay in Sites.
