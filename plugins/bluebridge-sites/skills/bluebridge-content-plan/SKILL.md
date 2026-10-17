---
name: bluebridge-content-plan
description: Prioritize content ideas, briefs and planned marketing work for Blue Bridge Sites clients. Use for articles, website content, social drafts or content calendars connected to the marketing plan.
---

# Plan my content

Read [access and capability rules](references/access.md). Select the organization, load `get_marketing_context` and search/read its plan plus existing work documents. `get_content_backlog` and `save_backlog` are old mocks; the real planning workflow stores Markdown work records through `save_marketing_changeset` when enabled. Do not create a second backlog when an existing registered index/work format already serves the client.

Prioritize using the agreed goals, audience needs, evidence, effort and production capacity. For each useful work item record a stable identity, working title, audience/purpose, target site/channel, format, priority and rationale, brief, owner, status, dependencies/missing inputs and relevant links. Use the returned planning-path convention, for example `strategy/work/<stable-id>.md`, and link work from the plan/index where appropriate. Preserve the same ID across updates.

Link work that depends on a strategic choice to its decision ID. Pending decisions block only dependent work; continue authorized independent briefs and routine improvements without requiring a new decision record. Keep any authorized reversible assumption explicit and preserve the decision status.

Interview the client for expertise and examples; draft content using approved positioning and voice. Flag unsupported claims and review needs. Distinguish an idea, a ready brief, work in progress, blocked work and client review. Mark published only with actual delivery evidence and a URL/date. A calendar entry does not schedule a post; a saved brief does not execute website changes.

To save, follow bluebridge-marketing-plan's revision/hash and retry rules: read complete existing documents, submit related changes as one changeset, and confirm a saved response. Respect explicit unsaved brainstorming. If the save tool or editing role/consent is unavailable, return exportable conversation-only proposals. Website implementation belongs to bluebridge-website; planning access grants no website mutation or publication authority.
