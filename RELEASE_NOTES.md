# Blue Bridge Sites 0.3.0 candidate

Add the marketing planning workflow: organization context, registered document discovery/search/reads, working plans, decisions, questions, planned-work Markdown, history and revision/idempotency-checked save guidance. Discover actual backend availability; saves need explicit marketing-write consent and current owner/editor access. Existing grants remain read-only until renewed. A successful saved response identifies a Git commit; pending/unknown outcomes require reconciliation.

Keep source/website, analytics and publication limits explicit. Existing mock names are not repurposed as saves. Website guidance now uses hosted source reads rather than assuming a client-local checkout. Skill names, plugin identity and connector address remain stable. Account-level Claude save/resume and marketplace sync still require live verification separately from local Worker/OAuth/package/browser tests.

# Blue Bridge Sites 0.2.5 candidate

Remove Claude's top-level `icon` key after the actual account marketplace importer reported it as unrecognized at `d82ea34` (October 17). Keep the **Blue Bridge Sites** display name, bundled company icon, portable OpenAI logo/composer references, skills and connector permissions. Packaging and CLI checks cannot establish account importer compatibility; re-sync to verify the warning is gone. The separate executable/settings-change notice is informational, not the icon warning.

# Blue Bridge Sites 0.2.4 candidate

Set Claude's explicit display name to **Blue Bridge Sites** and bundle the existing square Blue Bridge company icon. Reference it in Claude's manifest and the portable OpenAI interface. Preserve plugin/marketplace IDs, skill names, connector configuration and permissions. Marketplace sync and actual app rendering remain separate checks; no guarantee that every app uses the icon field.

# Blue Bridge Sites 0.2.3 candidate

Use `bluebridge-connect`, `bluebridge-marketing-plan`, `bluebridge-content-plan`, `bluebridge-website` and `bluebridge-results`, with client-facing titles describing their tasks. Update onboarding and cross-skill references. Plugin and marketplace IDs stay the same. Version 0.2.3 replaces the 0.2.2 skill names. Refresh/update the plugin and reload/start a new session. Existing tags and release assets stay unchanged.

# Blue Bridge Sites 0.2.2 candidate

Prefix all five skill names and folders with `bluebridge-sites-` so standalone discovery and command menus identify the product. The onboarding target and cross-skill references use the new paths/names. Plugin and marketplace IDs remain stable. Refresh/update the plugin and reload/start a new session; previous short skill names are no longer included.

Package/schema/archive checks and isolated Claude Code/Codex install-and-update checks passed with exactly the five prefixed skill directories.

This patch changes skill names only; it adds no backend permissions or execution capabilities. Account-level Claude Chat/Desktop/mobile and ChatGPT discovery/update behavior still requires verification. Earlier 0.2.1 tags/assets remain unchanged.

# Blue Bridge Sites 0.2.1 candidate

Bundles five distinct skills: setup, marketing strategy, content planning, website work and performance review. One shared skill tree supports Claude-compatible and portable OpenAI plugin manifests, with remote OAuth Sites access and separate marketplace catalogs.

Current execution capabilities are read-only organization/site lists and draft status. Strategy storage, content backlog storage, measurements, source preparation and draft submission remain explicit mocks. Social publishing is not implemented. Installation does not supply account consent, organization membership or publication approval.

Native Claude Code 2.1.296 and Codex 0.162.1 local-profile installation passed. Claude Chat/Cowork and ChatGPT account-level plugin installation, consent and fresh reads remain candidate checks. The earlier standalone Claude skill plus manually added connector was reported to read websites successfully.

Start at https://manage.bluebridgelogic.com/setup.md. Third-party Claude Code marketplace auto-update is opt-in. Refreshing a catalog and updating an installed plugin are separate checks; reload/new sessions may be necessary. This GitHub marketplace is not a listing in the OpenAI public directory.

Archives contain generic plugin files only. SHA256SUMS covers both ZIP downloads. Tags/assets are immutable; publish a new version rather than replacing old releases.

This patch shortens the OpenAI subtitle to its documented limit and adds an explicit listing description. It does not add execution capabilities or claim directory approval. Version 0.2.0 remains available unchanged.
