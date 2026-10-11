# Blue Bridge plugin marketplace

This public repository contains generic plugin skills, catalogs and release tooling only. Keep client facts, private repositories, tokens and unpublished marketing work out of it. The Sites backend remains in ../sites; this repo has no authority to publish client websites.

Run npm test and npm run package before releasing. Preserve stable plugin/catalog names, bump both manifests/catalog versions for releases, and publish immutable versioned archives with SHA256 checksums. Never overwrite an existing tag or release artifact. Use isolated configuration directories for CLI installation tests; do not change the operator's personal profiles. Update release notes and report actual-app verification separately from package checks.
