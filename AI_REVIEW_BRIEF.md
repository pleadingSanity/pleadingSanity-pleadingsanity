# Multi-AI independent review brief — Pleading Sanity

Target PR: https://github.com/pleadingSanity/pleadingSanity-pleadingsanity/pull/1
Review branch: feature/production-hardening
Production branch: main (do not modify)

## Instructions for Claude, Gemini, GPT and Grok

You are an independent reviewer, not an auto-merge agent. Inspect the complete repository and the draft PR. Do not push directly to main, deploy, change Firebase production rules, remove existing features, or introduce paid services without explicit approval.

### Review in order

1. **Security first:** inspect Firestore rules and every collection referenced by src/. Identify data leakage, missing rules, ownership errors, public write access, abuse vectors, and whether query patterns comply with rules. Propose emulator tests for both allowed and denied operations.
2. **Build correctness:** run Bun lockfile install, TypeScript type-check and Vite production build. Report exact failing file/line and minimal safe fixes. Do not claim tests passed unless you ran them.
3. **Firebase:** verify config project IDs, auth flows, authorised domains, user/profile document lifecycle, notes sync and cross-user isolation. Never request or output secret values.
4. **AI integration:** determine whether Arron calls a real model, which paths are local fallback, whether server-side API routes exist, how secrets are protected, and whether provider timeouts/rate limits/cost caps are enforced.
5. **Google Workspace:** find every simulated success, mock token, placeholder URL and timeout-based fake operation. Replace only with real API integrations where credentials/scopes/endpoints and error handling can be verified; otherwise clearly label it not connected.
6. **Games:** inventory each game and engine; verify state rules, legal actions, win/loss/draw detection, reset, mobile/touch and keyboard accessibility. Add isolated engine tests. Do not claim a game is complete from metadata or a decorative UI alone.
7. **Information architecture:** identify duplicate pages/navigation while preserving every unique feature and content. Recommend grouped hubs/tabs, redirects and shared components. Do not delete content until a mapping is documented.
8. **Performance/accessibility:** lazy-load heavy game/audio sections, check mobile layouts, focus states, contrast, reduced motion, PWA install/update/offline behaviour, and console errors.
9. **Sustainable income:** prioritise transparent shop sales and creator support first. Verify payment flows and ledger before claiming payouts. Preserve free crisis support and never monetise sensitive journal/crisis data. Apply quotas and spend caps to AI generation.
10. **Final audit:** rerun tests after changes. Return a table of finding, severity, file/line, reproduction evidence, fix, and retest result.

## Output required

- P0/P1 blockers that must be fixed before deployment.
- P2 improvements that can follow after safe launch.
- Exact test commands and actual pass/fail output.
- Minimal patch suggestions with file paths.
- A clear statement of what you could not verify.
- Never deploy, merge, or alter production on the basis of this review.

## Current known issues to independently confirm

- Previous main Firestore rules had a catch-all public read/write rule; the draft replaces it with explicit rules and default deny.
- WorkspaceHub contains simulated Google Drive/Docs/Gmail/Chat/Tasks actions; this branch changes those paths to report not connected rather than false success.
- ArronAICompanion's inspected message handler used local keyword-based preset responses, not a verified live Gemini call.
- Sanctuary notes persist locally; signed-in cloud save is attempted, and this branch reports whether that cloud save succeeded.
- A CI workflow was added but no workflow run/test result has yet been observed.

Return findings in your own review; do not assume this brief is authoritative if source code contradicts it.