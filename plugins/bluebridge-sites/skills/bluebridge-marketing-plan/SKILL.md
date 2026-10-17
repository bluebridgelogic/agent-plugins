---
name: bluebridge-marketing-plan
description: Develop and continue an organization's marketing plan with Blue Bridge Sites. Use for goals, audiences, positioning, channel priorities, working strategy, decisions and open questions.
---

# Plan my marketing

Read [access and capability rules](references/access.md). Call `get_capabilities`, select a returned organization, then use the real `get_marketing_context` tool. This workflow does not require selecting a website. Load the current plan and relevant supporting documents with `list_marketing_documents`, `search_marketing_documents`, `read_marketing_documents` or `read_marketing_range`. The old `get_organization_context` name remains a mock. Use `get_marketing_history` when earlier decisions or unfinished saves matter.

Start with a short account of what is known and the important gaps. Ask focused questions as the conversation develops; do not repeat questions answered in the saved plan or present a long generic questionnaire. Explore business outcomes, audience needs, positioning, offers/services, discovery/referral channels, budget, available expertise and production capacity. Research with browsing or connected tools when available and useful; Sites does not supply external research or analytics automatically. Record source/date and distinguish evidence from interpretation.

Develop priorities together, explaining reasons, tradeoffs and what evidence would change the recommendation. Keep client-confirmed decisions, working proposals and unresolved questions separate. Do not turn a suggestion into a confirmed decision or invent results, credentials, testimonials, forecasts or performance measurements. Strategy agreement does not approve website/legal claims for publication.

Preserve useful developing work when the user intends to create/update the plan; respect requests to brainstorm without saving. Use the document paths/conventions returned by context, reusing existing documents rather than creating duplicate plans. Markdown may include small YAML frontmatter fields such as status, owner and update date. Save the plan, decisions, open questions and next steps needed for another session, rather than a transcript of the conversation. Only label a decision agreed when the user has actually agreed. Concrete topics/briefs belong with bluebridge-content-plan.

When `save_marketing_changeset` is real and `permissions.save` is true, save related document changes together with the current `expectedCommit`, a unique idempotency key and expected full-document SHA-256 for every replacement; use null only for new files. A range returns `fileSha256` for the full document and `sha256` for the slice: never use the slice hash as the expected document hash. Read the complete document before replacing it, following all ranges where needed, and preserve unrelated material. Changes are exact full-text replacements/creates within the registered planning directory, not arbitrary repository writes.

A successful response with `status: saved` establishes the saved commit. Explain what was saved and which questions remain. After an unknown outcome, query `get_marketing_operation` if its ID is known (the original actor can use `includeChangeset` to recover exact `retryInput` in a new session), or repeat the exact original changeset and key to reconcile; do not generate a new key or content for a retry. On conflict, reload context/files, reconcile intentionally and use a new key. Pending/prepared is not saved. On a fresh session, reread authoritative context and continue from the saved plan/questions.

If saving is unavailable, explain the missing capability or role and provide a clearly labeled conversation-only draft. Do not collect credentials or imply it will survive into another session. A planning save creates no website build, candidate, approval, social schedule or publication.
