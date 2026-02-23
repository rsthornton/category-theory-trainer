# CLAUDE.md — Category Theory Trainer

Working notes for Claude Code sessions.

## Project Overview

An interactive web app for building category theory intuition through practice.
8 challenge types × 3 domains (cooking, logic, family/biology).
Currently ~115 challenges. Built with React + Vite, zero external UI dependencies.

## Architecture

```
src/
├── App.jsx                    # Shell: routing, all state, spaced repetition, tier system
├── data/challenges.js         # THE content database — add challenges here
├── components/
│   ├── Classify.jsx           # Sort words into objects vs morphisms
│   ├── Validate.jsx           # Is this arrow valid? Which direction?
│   ├── Compose.jsx            # Fill in the missing chain piece
│   ├── IsomorphismCheck.jsx   # One-way or invertible?
│   ├── CategorySwitch.jsx     # Same objects, different category
│   ├── SpotError.jsx          # Find the broken arrow
│   ├── FunctorMatch.jsx       # Map objects/arrows between categories
│   ├── FreeConstruction.jsx   # Build relationships from scratch (multi-step)
│   ├── DiagramRenderer.jsx    # SVG commutative diagram renderer
│   └── HelpModal.jsx          # Tutorial + Definitions modal (tabbed)
└── styles/app.css             # All styles (no CSS modules)
```

## State Architecture (App.jsx)

- `history`: `{ [challengeId]: { attempts, correct, lastSeen, lastCorrect } }`
- `streak`: number, persisted to localStorage
- `completed`: derived from `history` each render (not state) — preserves compatibility
- `shuffledChallenges`: `{ [typeKey]: challenge[] }`, recomputed on each type entry
- `manualUnlocks`: `Set<string>` — tiers unlocked via test-out, persisted to localStorage
- `testOut`: test-out session state or `null` (see Tier System below)
- `testOutRef`: ref kept in sync with `testOut` so `handleComplete` can read it without stale closure
- localStorage key: `"ct-trainer-v1"` — schema: `{ history, streak, helpSeen, manualUnlocks: string[] }`

## Tier System

Challenge types are grouped into three tiers. Core and Advanced start locked.

| Tier | Types | Unlocks when |
|------|-------|-------------|
| Foundation | classify, validate | Always open |
| Core | compose, isomorphism, spot_error | 5 correct in Foundation, OR pass test-out |
| Advanced | category_switch, functor_match, free_construction | 5 correct in Core, OR pass test-out |

**Organic unlock**: `computeOrganicUnlocks(history)` counts `lastCorrect === true` entries
per tier. Recomputed every render — no stale state possible.

**Manual unlock (test-out)**: stored in `manualUnlocks` Set, persisted as `manualUnlocks: string[]`
in localStorage. Combined: `unlockedTiers = new Set([...organicUnlocks, ...manualUnlocks])`.

**Soft gate**: locked cards are dimmed (opacity 0.45) but still clickable. Entering a locked
type shows a `locked-banner` with an inline "Test out →" escape hatch.

**Test-out flow**:
```
testOut shape: {
  tier: string,
  challenges: Challenge[5],
  index: number,         // 0–4, current challenge
  correct: number,       // running score
  results: bool[],       // per-answer results for pip display
  pendingResult: bool|null,  // set by handleComplete, consumed by handleTestOutNext
  done: bool,
  passed: bool,
}
```
- `handleStartTestOut(tier, e?)` — builds pool, sets testOut, clears activeType
- `handleTestOutNext()` — scores pendingResult, advances index or sets done=true
- `handleTestOutFinish(passed)` — on pass: adds tier to manualUnlocks + localStorage; clears testOut

**Routing order**:
1. `testOut?.done` → test-out result screen
2. `!activeType && !testOut` → main menu
3. else → challenge view (`inTestOut = testOut !== null`)

## Spaced Repetition Tiers (weightedShuffle)

| Tier | Condition | Priority |
|------|-----------|----------|
| 0 | Never seen | Highest |
| 1 | Last attempt wrong | High |
| 2 | Last correct, accuracy < 50% | Medium-high |
| 3 | Seen, last correct, not mastered | Medium |
| 4 | ≥3 attempts, accuracy ≥ 80% | Lowest (mastered) |

## Visual Design

- **Fonts**: Fraunces 800 (headings, gradient clip-text), Libre Baskerville (body), IBM Plex Mono (labels/code)
- **Background**: animated ocean/teal gradient (`gradient-shift` keyframe, 20s loop)
- **Cards**: glassmorphism — `rgba(255,255,255,0.72)` + `backdrop-filter: blur(8px)`
- **Buttons**: `.submit-btn` is ocean→teal gradient; `.nav-btn` is ocean-outlined
- **Design tokens**: `--ocean-*` and `--teal-*` CSS custom properties in `:root`
- **Locked cards**: `opacity: 0.45`, hover softened, no lift/shadow

## Challenge Schema

Every challenge: `{ id, type, domain, difficulty (1-3) }`

**classify**: `{ words: [{word, kind: "object"|"morphism"}], explanation }`

**validate**: `{ objectA, objectB, candidate, valid: bool, direction: "AtoB"|"BtoA"|null, explanation }`

**compose**: `{ chain: [{from, to, morphism}], missing: "from"|"to"|"morphism"|"composed", missingIndex?, answer, options[], explanation }`

**isomorphism**: `{ objectA, objectB, morphismAtoB, isIso: bool, reverseMorphism?, explanation }`

**category_switch**: `{ objectA, objectB, categories: [{name, morphism, explanation}], synthesisQuestion, synthesisAnswer }`

**spot_error**: `{ diagram: {objects:[], morphisms:[{from, to, label, valid}]}, errorIndex, errorType, explanation }`

**functor_match**: `{ categoryA: {name, objects[], morphisms:[]}, categoryB: {name, objects[], morphisms:[]}, correctMapping: {objects: {}, morphisms: {}}, explanation }`

**free_construction**: `{ objectA, objectB, steps: [{question, options[], answer}], authorAnalysis: {category, morphism, direction, isIso, explanation} }`

## Naming Conventions

- Challenge IDs: `cl-cook-01`, `va-logic-03`, `iso-fam-02`, `cs-05`, `se-01`, `fu-03`, `fc-07`
- Prefixes: `cl-` classify, `va-` validate, `co-` compose, `iso-` isomorphism, `cs-` category_switch, `se-` spot_error, `fu-` functor_match, `fc-` free_construction
- Domains: `cooking`, `logic`, `family`, `mixed`

## Content Counts (as of 2026-02-23)

| Type | Count |
|------|-------|
| classify | 18 |
| validate | 21 |
| compose | 11 |
| isomorphism | 13 |
| category_switch | 15 |
| spot_error | 7 |
| functor_match | 15 |
| free_construction | 15 |
| **Total** | **115** |

## Design Principles (non-negotiable)

1. **Precise language over poetic language.** Morphism labels describe the actual operation.
2. **The category determines the arrows.** Reinforce this everywhere.
3. **Explanations are the product.** Right answers matter less than understanding why.
4. **Cross-domain pattern recognition.** Cooking and logic having the same structure is the whole point.

## Adding Challenges

1. Copy an existing challenge of the same type
2. Change the id, content, explanation — app auto-discovers
3. Keep `errorIndex` pointing to the correct invalid morphism in `spot_error`
4. For `functor_match`: `correctMapping.objects` keys must exactly match `categoryA.objects` values

## Key Patterns

```js
// Generate more challenges with Claude:
// "Generate 10 new 'validate' challenges for the 'chemistry' domain.
//  Follow the exact schema in src/data/challenges.js.
//  Include plausible distractors and precise categorical explanations."
```

## Keyboard Shortcuts (implemented)

In Validate, Compose, IsomorphismCheck, FreeConstruction, SpotError:
- `1`-`4`: select option by index (shown as inline key hints in the UI)
- `Enter`: confirm/submit

## Known Patterns & Gotchas

- `getChallenges(typeKey)` returns from `shuffledChallenges` only; `handleSelectType` always fills it first
- `handleComplete` uses nested updater pattern (`setHistory` → `setStreak`) to guarantee `history` is fresh when localStorage is written
- `completed` is derived (not state) — changes to `history` automatically reflect everywhere
- Component `key={current.id}` ensures full remount on challenge change — component state never leaks between challenges
- `useEffect` in challenge components uses `[submitted, answer/selected]` deps to avoid stale closure on Enter key handler
- `testOutRef` is a ref kept in sync with `testOut` via `useEffect` — allows `handleComplete` (stable `useCallback`) to read current testOut value without adding it as a dependency
- `pendingResult` in testOut is set by `handleComplete` and consumed by `handleTestOutNext` — this is the bridge between answer submission and test-out scoring
- `handleBack` clears both `activeType` AND `testOut` — always returns to main menu cleanly
- `handleReset` resets `manualUnlocks` to `new Set(['foundation'])` alongside history/streak
