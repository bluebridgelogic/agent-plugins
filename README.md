# Blue Bridge Sites plugin

Develop marketing plans with your existing Claude or ChatGPT agent. The plugin guides organization context/document retrieval, working plans, decisions, open questions and content priorities. Where enabled, authorized owner/editor users can save planning Markdown to the client repository using explicit write consent and revision-checked changesets, then continue in a fresh session. Website source/status reads are available with source consent; authorized website editing and hosted preview builds are available where configured. Capable desktop environments can download a local site workspace, iterate with a local development preview, then save a batch through Sites. Other environments retain hosted editing. Unsent local changes are not available on another device. Supported still-image additions can be saved with page edits where the backend advertises upload support and the agent can access the image bytes. Page deletion/renaming, analytics ingestion and social publishing remain unavailable.

This is version 0.6.0, a candidate release. Start at https://manage.bluebridgelogic.com/setup.md. Installing this package is separate from signing in, obtaining organization access and verifying fresh reads. The existing manually configured Claude connector was reported to work; the new bundled plugin still requires account-level Chat/Cowork/ChatGPT testing.

Claude: add https://github.com/bluebridgelogic/agent-plugins as a marketplace in Customize → Plugins, then install Blue Bridge Sites. Connect/sign in from its Connectors tab. In Claude Code, enable this third-party marketplace's auto-update explicitly if desired; updates are used after reload/new session. Local Codex can use the repository's .agents/plugins catalog. ChatGPT web distribution/import depends on workspace support and directory review; this repository is not itself an approved public-directory listing.

The public repository contains generic instructions only. Client records remain behind Sites authentication and current membership checks. No API keys or secrets are bundled. Human approval and separate publication stay in Sites.

## Branding

Claude's manifest explicitly sets the display name to **Blue Bridge Sites**. The square company bridge mark in `assets/icon.png` comes from `bluebridgelogic/BlueBridge` (`company/brand-assets/icon.png`) and is bundled in both ZIPs. The portable OpenAI interface references it as its logo/composer icon. On October 17, Claude's account marketplace synced commit `d82ea34` but warned that the top-level `icon` key was unrecognized and stripped it. Version 0.2.5 omits that field from the Claude manifest; local CLI validation alone does not prove account marketplace support. A custom icon in that Claude interface remains unverified.

## Skill names

The skills are `bluebridge-connect` (Connect to Blue Bridge), `bluebridge-marketing-plan` (Plan my marketing), `bluebridge-content-plan` (Plan my content), `bluebridge-website` (Update my website) and `bluebridge-results` (Review my marketing results). These names describe client tasks while identifying Blue Bridge. The plugin ID remains `bluebridge-sites` and marketplace remains `bluebridge`. Refresh the marketplace, update the installed plugin and reload/start a new session to discover the new names.

## Releases

Run `npm ci` and `npm run validate` before sharing a revision. The combined gate runs package/schema/reference checks, negative fixtures, pinned Claude Code 2.1.299 strict plugin and marketplace validation, and reproducible packaging. Warnings fail the gate. CI and tagged releases use this same command. Artifacts are written to ignored `.artifacts`: plugin ZIP, marketplace ZIP and SHA256SUMS. Never replace existing release assets.

Run `npm run hooks:install` once per clone to enable the repository-local pre-push hook; it refuses existing hooks/configuration rather than replacing them. Alternatively, `npm run push:checked -- origin <review-branch>` uses the hook for that push. The hook validates the actual outgoing committed snapshots, so uncommitted fixes cannot hide broken pushed files. It blocks direct pushes to `main`: push a review branch, require the package check on its PR, then merge it. Configure the GitHub ruleset to require that check and prohibit bypass for server-side enforcement; the local hook alone cannot prevent another clone from bypassing it. Global hooks and personal agent profiles are unchanged.

Strict CLI checks do not establish Claude account importer/runtime compatibility. The observed top-level `icon` stripping has a regression check, but the authoritative Enterprise importer check is not run by this gate and is reported as NOT RUN. Final acceptance still records the exact marketplace version/commit and real-account sync warnings, OAuth, reads and saves. `python3 scripts/native-smoke.py` separately verifies installation/update in disposable Claude/Codex profiles.

## Claude Code installation

```text
/plugin install bluebridge-sites --marketplace bluebridgelogic/agent-plugins
```

For local Codex, add this Git repository through its plugin marketplace UI or CLI, then install `bluebridge-sites@bluebridge`. ChatGPT web and Claude Chat use their own plugin/connector interfaces; a CLI install does not install into those apps.

## Maintainer native smoke check

With Claude Code and Codex installed, run `python3 scripts/native-smoke.py`. It creates disposable profiles and a private version-update fixture, checks installation and cached skill files, then removes the profiles. It does not sign in or change your existing agent configuration. Package CI remains independent of proprietary CLIs and account credentials.
