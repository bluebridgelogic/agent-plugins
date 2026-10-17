---
name: bluebridge-connect
description: Set up Blue Bridge Sites, connect the client account, select an organization and verify fresh website reads. Use when installing, connecting or troubleshooting Blue Bridge Sites.
---

# Connect to Blue Bridge

Help the user start using Sites for their digital marketing with the agent they already know. Follow the current public guide at https://manage.bluebridgelogic.com/setup.md; identify the intended app/surface before configuring anything. Reading a guide is not installation.

The plugin already supplies the workflow skills and remote connector definition. In Claude main Chat/Cowork, guide the user to this plugin's Connectors tab, add/connect Blue Bridge Sites and complete browser sign-in. Enable it in the conversation where required. Do not install a Code-only server or send a main Chat user to a terminal. In local Code/Codex, inspect the bundled connection before adding a duplicate and use that interface's supported authentication flow. Preserve existing modified skills and unrelated connections.

After the tools are available, read [access and capability rules](references/access.md), call `get_capabilities`, `list_organizations`, `list_sites`, and `get_site_status` for a returned site. Empty access can be real. Select an organization/site only from the returned choices; ask if ambiguous. Mark skill discovery, connector configuration, authentication and fresh reads separately. A failed or absent tool is not success.

Ask what the client wants to accomplish next. Explain available actions and relevant limitations in client language, without reciting internal tool names or mock implementation details. A successful context read and `permissions.save` establish access, not a completed save; say “I can save your plan” until a real save returns `status: saved`. If the user intends to work on a marketing plan, verify `get_marketing_context` and the required source consent; explain that saving also needs explicit marketing-write consent and an owner/editor role. The user can use existing memory, prompts and documents in their agent; Sites has no automatic access to all of them. Do not claim setup saved client preferences or selected workspace server-side; connection setup alone does not save a marketing plan.
