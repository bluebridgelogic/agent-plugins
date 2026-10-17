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
