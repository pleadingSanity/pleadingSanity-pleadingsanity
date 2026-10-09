# Pleading Sanity consolidation and growth plan

Purpose: simplify navigation and reduce duplicate destinations without deleting unique content, preserving the live site and the New Gen Bible ethos of Evolution, Not Erasure.

## Navigation architecture

Use a small number of top-level hubs. Keep individual tools and modes as sections/tabs inside their relevant hub; retain deep links for existing URLs where practical.

- **Home / Sanctuary Hub:** mission, current highlights, urgent support access, featured creator/live content, and clear next actions.
- **Connect:** social feed, profiles, friends/follows, Resilience Wall, stories and community discovery. Preserve unique feed/story capabilities as tabs.
- **Create & Go Live:** live status, schedule/upcoming streams, share an existing stream, creator tools, clips and creator earnings. Label any unimplemented integrations honestly.
- **Arron & AI Family:** Arron companion, model/provider status, safe failover, creator-content generation and prompts. Show when a response is local/fallback vs a live model response.
- **Healing & Journal:** Healing Hz, grounding tools, Sanctuary Notes, safety plan and saved reflections. Keep crisis resources reachable globally in the interface.
- **Games Arcade:** one game library with categories, recent/favourite games, shared achievements and a consistent game-engine interface. Do not ship superficial mock game controls as finished games.
- **New Gen Bible & Story:** New Gen Bible, founder story, manifesto and educational content, with their distinctive content preserved.
- **Workspace:** Google integrations grouped into a single hub; each integration must show connected/not connected and only report success after a real API response.
- **Shop & Creator Economy:** shop/cart, creator pages, monetisation explainer, transparent payout accounting and creator onboarding.

## Duplication policy

1. Inventory current pages, navigation IDs, features, and inbound links before changing routes.
2. Consolidate only overlapping navigation entries; move unique features into tabs/sections rather than deleting them.
3. Maintain redirects or compatibility links for existing URLs, bookmarks and search engines.
4. Share components, styles, auth/session utilities and error/empty/loading states where practical; avoid one giant component.
5. Use progressive loading for heavy games, audio and visual content; avoid loading every game engine on the home page.

## Game quality standard

- Each game must have an actual deterministic or appropriately random game engine, state model, legal-move validation, win/loss/draw detection, restart/undo where appropriate, and touch/keyboard support.
- Separate rules/engine logic from UI so engines can be unit tested without a browser.
- Add unit tests for edge cases, scoring and game completion; add persistence only when user consent and privacy expectations are clear.
- For AI-generated game content, require schema validation, safe rendering, moderation/safety filters, rate limits and cost caps. Generated content must not silently execute code or arbitrary HTML.
- Prefer client-side games when possible to keep hosting costs low; use server-side AI generation only behind protected server endpoints.

## Realistic monetisation path

- Start with transparent creator subscriptions/support and product sales using an established payment provider; confirm fees, tax and legal requirements before launch.
- Creator payout promises (including the proposed 90% share) must be backed by a ledger, refund/chargeback handling, clear terms and reconciliation before being advertised as operational.
- Offer optional paid creator tools or AI generation quotas only after the free core experience is stable. Never charge for crisis resources or basic sanctuary access.
- Measure conversion with privacy-respecting aggregate analytics; do not sell sensitive journal, crisis or mental-health data.
- Set provider budgets, usage limits and fallbacks. Do not call paid AI endpoints directly from browser code or expose API keys in Vite client bundles.

## Release gates

- Typecheck and production build pass in CI.
- Firestore emulator rules tests cover all app-used collections and prove cross-user isolation.
- Real Firebase email/password and Google sign-in tested with correct authorized domains.
- Gemini calls verified server-side with secrets protected; usage caps and provider timeout/fallback tests pass.
- Google Workspace operations are verified against real API responses; remove all mock tokens and fake success notifications.
- Games pass engine unit tests and mobile interaction tests.
- Lighthouse/accessibility/mobile smoke tests; crisis links work; PWA manifest/service worker tested.
- Netlify preview passes before production; production domain and existing site stay unchanged until explicit release approval.