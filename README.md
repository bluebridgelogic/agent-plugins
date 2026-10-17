# Blue Bridge Sites plugin

Manage digital marketing through your existing Claude or ChatGPT agent. The plugin bundles setup, marketing strategy, content planning, website work and performance review skills with the authenticated remote Sites connector. Website/organization lists and draft status are real; strategy storage, analytics, source preparation and draft submission are explicit non-persisting mocks. Social scheduling/publishing is not implemented.

This is version 0.2.5, a candidate release. Start at https://manage.bluebridgelogic.com/setup.md. Installing this package is separate from signing in, obtaining organization access and verifying fresh reads. The existing manually configured Claude connector was reported to work; the new bundled plugin still requires account-level Chat/Cowork/ChatGPT testing.

Claude: add https://github.com/bluebridgelogic/agent-plugins as a marketplace in Customize → Plugins, then install Blue Bridge Sites. Connect/sign in from its Connectors tab. In Claude Code, enable this third-party marketplace's auto-update explicitly if desired; updates are used after reload/new session. Local Codex can use the repository's .agents/plugins catalog. ChatGPT web distribution/import depends on workspace support and directory review; this repository is not itself an approved public-directory listing.

The public repository contains generic instructions only. Client records remain behind Sites authentication and current membership checks. No API keys or secrets are bundled. Human approval and separate publication stay in Sites.

## Branding

Claude's manifest explicitly sets the display name to **Blue Bridge Sites**. The square company bridge mark in `assets/icon.png` comes from `bluebridgelogic/BlueBridge` (`company/brand-assets/icon.png`) and is bundled in both ZIPs. The portable OpenAI interface references it as its logo/composer icon. On October 17, Claude's account marketplace synced commit `d82ea34` but warned that the top-level `icon` key was unrecognized and stripped it. Version 0.2.5 omits that field from the Claude manifest; local CLI validation alone does not prove account marketplace support. A custom icon in that Claude interface remains unverified.

## Skill names

The skills are `bluebridge-connect` (Connect to Blue Bridge), `bluebridge-marketing-plan` (Plan my marketing), `bluebridge-content-plan` (Plan my content), `bluebridge-website` (Update my website) and `bluebridge-results` (Review my marketing results). These names describe client tasks while identifying Blue Bridge. The plugin ID remains `bluebridge-sites` and marketplace remains `bluebridge`. Refresh the marketplace, update the installed plugin and reload/start a new session to discover the new names.

## Releases

Run npm ci, npm test, then npm run package. Artifacts are written to ignored .artifacts: plugin ZIP, marketplace ZIP and SHA256SUMS. Both archives carry the same source version. Publish a new Git tag/release; never replace old assets. Push a version bump to update the marketplace; catalog synchronization and installed-plugin refresh depend on the client interface and its settings.

## Claude Code installation

```text
/plugin install bluebridge-sites --marketplace bluebridgelogic/agent-plugins
```

For local Codex, add this Git repository through its plugin marketplace UI or CLI, then install `bluebridge-sites@bluebridge`. ChatGPT web and Claude Chat use their own plugin/connector interfaces; a CLI install does not install into those apps.

## Maintainer native smoke check

With Claude Code and Codex installed, run `python3 scripts/native-smoke.py`. It creates disposable profiles and a private version-update fixture, checks installation and cached skill files, then removes the profiles. It does not sign in or change your existing agent configuration. Package CI remains independent of proprietary CLIs and account credentials.
