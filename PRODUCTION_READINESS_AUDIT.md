# Pleading Sanity production readiness audit

Date: 2026-10-09
Repository: pleadingSanity/pleadingSanity-pleadingsanity
Branch: feature/production-hardening

## Changes made on this branch

- Removed the catch-all Firestore rule that allowed every visitor to read and write every document.
- Added explicit rules for users, profiles, follows, lives, posts, creator applications, and sanctuary_notes.
- Added a default-deny rule for all other collections.
- This change is intentionally isolated from main and does not deploy or publish rules automatically.

## Critical findings from source inspection

1. **Firestore was critically exposed on main.** The existing final wildcard match granted public read and write to all documents. That can override intended protection in earlier matches. Do not deploy the old rules.
2. **The replacement rules need emulator validation against every collection used by the app.** Collections not listed in the explicit rules are denied until reviewed and added intentionally.
3. **Sanctuary note sync is user-scoped in the UI**, but localStorage notes remain device-local. Cross-device sync is not implemented for all existing notes; only the create path attempts a Firestore write when signed in.
4. **Google Workspace features are partly simulated.** Source inspection found fallback mock tokens and timeout-based success messages for Tasks, Drive, Docs, Gmail and Chat. These must not be described as real cloud operations unless actual Google API requests and OAuth scopes are verified.
5. **Arron is not currently a live Gemini-backed chat in the inspected component.** Its response logic uses local keyword matching and preset text. The component includes prompt/schema text but that alone does not connect a model or implement the advertised API.
6. **Firebase configuration is committed as a project JSON file.** Firebase web config is generally client-side, but OAuth client identifiers and any private credentials must be handled carefully. Never put Gemini API keys or service-account credentials in client files.
7. **Firebase connection testing needs stronger error handling.** Permission-denied and other failures should be caught and surfaced cleanly rather than risking unhandled rejections.
8. **Authentication is implemented in source, but is not verified** without a real browser test using the deployed Firebase project's enabled providers and authorized domains.
9. **PWA setup exists in vite.config.ts**, but generated manifest, icons, service worker and production build must be tested.
10. **The AI Studio repository is a separate React/Vite app**, not the static-site repo pleadingSanity/pleadingsanity. Do not point the existing Netlify production site at this repo until deployment configuration, domain routing, and feature parity have been reviewed.

## Required release checks

- Run the supported dependency install, then npm run lint and npm run build.
- Run Firestore emulator tests: unauthenticated access denied for private data; user A cannot read/write user B's notes/profile; public reads only where intended; owner-only edits/deletes; posts/lives enforce authenticated ownership.
- Review every Firestore collection used in src/ before publishing the replacement rules.
- Configure Gemini API key as a server-side secret only. Never ship it in Vite VITE_* variables or frontend bundles.
- Implement server-side Gemini calls and genuine Google API integrations; remove simulated success states and mock OAuth tokens.
- Verify Firebase Auth providers, authorized domains, email/password flows, Google sign-in, persistence and sign-out in production.
- Validate mobile/desktop UI, accessibility, crisis links, cart, PWA install/update, offline fallback and console errors.
- Deploy only to a preview first. Production domain and existing live website must remain unchanged until checks pass.

## Deployment status

No Netlify deployment was run from this audit. The account's usage-credit state could not be inspected. No production site or Firebase rules were changed by this branch commit.