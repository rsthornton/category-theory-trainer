# Category Theory Trainer — Roadmap

## Current State (2026-02-23)

All 8 challenge types fully playable. Deployed to Vercel via GitHub auto-deploy.

**Core features:**
- SVG commutative diagrams after each answer (tikz-cd conventions)
- localStorage persistence (`ct-trainer-v1`): history, streak, helpSeen, manualUnlocks
- Spaced repetition (weightedShuffle, 5 priority tiers)
- Keyboard shortcuts: 1–4 select options, Enter confirms
- "Mark as known" button, streak badge (≥2), reset progress button

**Visual design (Halcyonic theme):**
- Animated ocean/teal pastel gradient background (20s loop)
- Fraunces 800 display headings with gradient clip-text
- Glassmorphism cards + ocean/teal design token system

**Help modal:**
- Tutorial + Definitions tabs; all definitions in plain English with everyday examples
- Logic vocabulary section: proposition, conjunction, modus ponens, contrapositive, inference rule

**Tier unlock system (shipped 2026-02-23):**
- Foundation (classify, validate): always open
- Core (compose, isomorphism, spot_error): locked until 5 Foundation correct OR 4/5 test-out
- Advanced (category_switch, functor_match, free_construction): locked until 5 Core correct OR 4/5 test-out
- Soft gate: locked cards dimmed, still clickable, locked-banner inside with "Test out →"
- Test-out: 5-challenge sprint, pip progress display, result screen

---

## ~~DONE: Tier Unlock System (Option C)~~

### Rationale

The 8 challenge types have implicit pedagogical dependencies. Exposing all of
them immediately can be overwhelming and pedagogically backwards. A tier system
guides new learners through the material in the right order while respecting
prior knowledge via a test-out path.

### Tier Structure

| Tier | Types | Always available? |
|------|-------|-------------------|
| **Foundation** | Classify, Validate | Yes — always unlocked |
| **Core** | Compose, Isomorphism, Spot the Error | Unlocks after 5 correct in Foundation, OR test-out pass |
| **Advanced** | Category Switch, Functor Match, Free Construction | Unlocks after 5 correct in Core, OR test-out pass |

The dependency rationale:
```
Classify → Validate → Compose → Isomorphism
                         │
                         ▼
                   Spot the Error
                         │
                         ▼
              Category Switch → Functor Match → Free Construction
```

### Soft Gate (not hard wall)

Locked tiers are **dimmed** on the main menu but never fully blocked. A user
can click into a locked type and see a banner: *"Core tier — complete Foundation
challenges or test out to unlock."* with a "Try anyway" link. Adult learners
must never feel trapped.

### Test-Out Flow

Each locked tier displays a "Test out →" button. Clicking it runs **5 challenges**
sampled randomly from that tier's types. Pass **4 out of 5** → tier immediately
unlocked. Challenges answered during test-out count toward `history` normally.

### Open Questions (resolved)
- Test-out bar: **4/5** ✓
- Organic unlock bar: **5 correct across the tier** (not per-type — more forgiving)
- Re-locking: **never** — once unlocked, always unlocked ✓
- Test-out challenges count toward history: **yes** ✓

### Implementation Notes

- Unlock state stored in localStorage under existing `"ct-trainer-v1"` key:
  `{ history, streak, unlockedTiers: ['foundation', 'core', 'advanced'] }`
- Derive `foundationCorrect` and `coreCorrect` counts from existing `history`
  object — no schema migration needed for organic unlock
- Test-out is a small modal or inline flow, not a separate route
- Main menu cards: locked cards get reduced opacity + lock icon + "Test out" CTA
- `weightedShuffle` already works per-type; no changes needed there

---

## Diagram Rendering — Future Work

This is the richest area for improvement. The current renderer hand-draws SVG
using hardcoded coordinate math. There are better approaches on the horizon.

### Research: CT Diagram Libraries

#### JavaScript / Web-native

| Library | Notes |
|---------|-------|
| **[quiver](https://q.uiver.app/)** | Best-in-class interactive CT diagram editor. Open source. Exports tikz and SVG. Worth studying the SVG output format for inspiration. |
| **[KaTeX](https://katex.org/) + tikzcd** | KaTeX supports `\tikzcd` via `tikzcd-compat`. Could render proper LaTeX CT diagrams server-side or via WebAssembly. |
| **[d3.js](https://d3js.org/)** | Force-directed layout could auto-position objects; arrows as bezier curves. Overkill for fixed diagrams, powerful for dynamic ones. |

#### Python

| Library | Notes |
|---------|-------|
| **[Catlab.jl](https://algebraicjulia.org/)** | Julia library for applied CT. Has `@present` macro for categories, functors, limits, colimits. Can generate Graphviz diagrams. Best-in-class for actual CT computation. |
| **[networkx](https://networkx.org/)** | Python graph library. Could represent categories as directed graphs and export to SVG/Matplotlib. Simple but not CT-aware. |
| **[matplotlib](https://matplotlib.org/) + annotate** | Manual but scriptable CT diagrams. Good for generating diagram PNGs for static content. |
| **[discopy](https://discopy.org/)** | Python library for monoidal categories and string diagrams. Specifically designed for CT. Can draw string diagrams (different style — horizontal composition). Relevant for monoidal structure in future challenge types. |

#### Julia

| Library | Notes |
|---------|-------|
| **[Catlab.jl](https://algebraicjulia.org/catlab/)** | The serious option. Implements categories, functors, natural transformations, limits, colimits, adjunctions as first-class objects. The `Catlab.Graphics` module renders Graphviz and TikZ. Could be used to: (1) validate challenge correctness, (2) generate diagram SVGs programmatically, (3) power a future "compute the limit" challenge type. |
| **[AlgebraicRewriting.jl](https://algebraicjulia.org/)** | Built on Catlab. Double pushout rewriting. Relevant if we ever add rewriting/transformation challenges. |

### Recommended Investigation Path

1. **Short term**: Try rendering a `functor_match` diagram using quiver's URL
   encoding (quiver supports URL-based diagram specs). Could embed quiver iframes
   for the most complex diagrams.

2. **Medium term**: Stand up a small Python/Julia service using `Catlab.jl` that
   accepts a challenge payload and returns an SVG string. The React app calls it
   as a sidecar. This decouples diagram layout from challenge content and enables
   mathematically-verified diagrams.

3. **Long term**: Use Catlab to validate challenge data itself — e.g., verify
   that declared compositions actually compose, that functor mappings actually
   preserve structure, that errorIndex morphisms actually violate CT axioms.

---

## Diagram Layout Improvements (SVG, no external libs needed)

These can be done without any new dependencies:

- **Compose n≥3**: Staircase layout (objects on a diagonal grid) instead of
  linear chain, so the composed arrow forms a proper triangle at any length
- **Category Switch**: Overlay all rows so A and B share a single x-position
  (like parallel arrows between same pair of objects in a multi-category diagram)
- **Spot Error**: Place objects on a circle so backward morphisms don't arc
  awkwardly below the chain
- **Natural transformation**: Add a `⟹` double arrow between parallel functors
  for any future challenge type involving nat. transformations
- **Monoid diagrams**: Self-loop arrow on a single object (identity + composition
  shown as a loop) — already mentioned in README

---

## Challenge Content

- **More challenge types**: Limits/colimits (products, coproducts, pullbacks),
  adjunctions, monads
- **More domains**: Music theory (transposition), programming (type functions),
  chemistry (reaction networks), economics (preference orderings)
- ~~**Difficulty scaling**: Track per-type accuracy and weight challenge selection
  toward weak spots (spaced repetition)~~
- **API-generated challenges**: Use Claude API with the existing schema to
  generate unlimited domain-specific variations

---

## Infrastructure

- ~~**Persistence**: localStorage for progress, streaks, accuracy per type~~
- **Export**: Download current diagram as SVG or PNG
- **Sharing**: URL-encoded challenge state so you can link to a specific challenge

### Cross-Device Sync — Upgrade Path

Progress is currently stored per-device in localStorage. Two upgrade tiers:

#### Short term: Export / Import (~30 min, no backend)

Add an Export button in the header that serializes the `"ct-trainer-v1"`
localStorage blob to a downloadable JSON file. Add a corresponding Import
button that reads the file and merges history (taking the higher `correct`
count per challenge to avoid regressing).

```js
// Export
const blob = new Blob([localStorage.getItem('ct-trainer-v1')], { type: 'application/json' })
const url = URL.createObjectURL(blob)
// ... trigger download

// Import
const merged = mergeHistory(existing, imported) // max(correct), max(attempts)
localStorage.setItem('ct-trainer-v1', JSON.stringify(merged))
```

No server, no auth, no dependencies. Works on Vercel as-is. Good enough for
a single user moving between machines or doing a browser migration.

#### Long term: Authenticated backend (~1–2 days, requires backend)

The `history` object in localStorage maps cleanly to a single database row
keyed by `userId`. The schema is already flat enough to store as JSON.

Recommended stack:
- **Auth**: [Clerk](https://clerk.com/) — drop-in React auth, generous free tier
- **Database**: [Supabase](https://supabase.com/) or [Turso](https://turso.tech/) (SQLite-compatible, edge-friendly)
- **API**: A single Vercel serverless function (`/api/sync`) — POST to save, GET to load

The sync function would accept the same `{ history, streak }` shape that
localStorage already uses, storing it per-user. On mount, fetch from the API
instead of (or in addition to) localStorage, merging the same way as the
import flow above.

---

## Session Log

### 2026-02-23

**Halcyonic visual overhaul**
- Animated ocean/teal pastel gradient background (`gradient-shift`, 20s loop, `@property --gradient-angle`)
- Fraunces 800 added to Google Fonts; applied to `h1` (gradient clip-text) and `h2` challenge heading
- Glassmorphism on all cards: `rgba(255,255,255,0.72)` + `backdrop-filter: blur(8px)`
- Ocean/teal CSS design token system (`--ocean-50` through `--ocean-900`, `--teal-*`) in `:root`
- `.submit-btn` / modal footer button: ocean→teal gradient + glow shadow
- `.nav-btn`: ocean-outlined (border + text use ocean tokens)
- `.option-btn.selected` / `.mapping-btn.selected`: ocean border + focus ring
- `.type-card:hover`: card-lift (`translateY(-2px)`) + ocean drop shadow
- Streak badge: ocean/teal gradient; progress dots: teal (done) / ocean (active)
- Modal tabs active state: ocean-600 text, ocean-500 underline
- Object nodes: ocean-50 bg, ocean-200 border; arrows: ocean-200 color
- Feedback boxes: green/red semantics preserved; added `backdrop-filter: blur(4px)`

**Help modal — Definitions rewrite**
- Logic domain vocabulary section added: proposition, conjunction, conjunction introduction/elimination, modus ponens, contrapositive, inference rule — each with CT interpretation (object vs morphism vs isomorphism)
- All definitions rewritten: plain English first, jargon explained, everyday examples throughout
- Column headers changed from "Definition/Example" to "What it means / Everyday example"
- Category laws: associativity and unitality now lead with plain English before symbols
- Derived concepts: functor gets "structure-preserving dictionary between worlds"; natural transformation gets French/Italian cuisine analogy

**Tier unlock system**
- Foundation (classify, validate): always open
- Core (compose, isomorphism, spot_error): locked; unlocks at 5 Foundation correct OR 4/5 test-out
- Advanced (category_switch, functor_match, free_construction): locked; unlocks at 5 Core correct OR 4/5 test-out
- Organic unlock: `computeOrganicUnlocks(history)` recomputed every render — never stale
- Manual unlock: `manualUnlocks` Set persisted as `manualUnlocks: string[]` in localStorage
- `testOutRef` pattern: ref synced with testOut state so stable `handleComplete` callback can read it without dependency
- `pendingResult` bridges answer submission → test-out scoring (set by `handleComplete`, consumed by `handleTestOutNext`)
- Main menu: tier section headings, progress hint, "Test out →" pill button on locked sections
- Locked cards: opacity 0.45, hover softened, no lift
- Test-out challenge view: pip row (pending/active/correct/incorrect), counter, "Continue →" / "See results →"
- Test-out result screen: Fraunces verdict (✓ Passed / ✗ Not quite), score, pip breakdown, CTA
- Soft gate: locked-banner inside locked challenge views with inline "Test out →" escape
- Reset progress now also resets `manualUnlocks` to `['foundation']`
