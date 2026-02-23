# CLAUDE.md — Category Theory Trainer

Working notes for Claude Code sessions.

## Project Overview

An interactive web app for building category theory intuition through practice.
8 challenge types × 3 domains (cooking, logic, family/biology).
Currently ~115 challenges. Built with React + Vite, zero external UI dependencies.

## Architecture

```
src/
├── App.jsx                    # Shell: routing, all state, spaced repetition
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
│   └── DiagramRenderer.jsx    # SVG commutative diagram renderer
└── styles/app.css             # All styles (no CSS modules)
```

## State Architecture (App.jsx)

- `history`: `{ [challengeId]: { attempts, correct, lastSeen, lastCorrect } }`
- `streak`: number, persisted to localStorage
- `completed`: derived from `history` each render (not state) — preserves compatibility
- `shuffledChallenges`: `{ [typeKey]: challenge[] }`, recomputed on each type entry
- localStorage key: `"ct-trainer-v1"` — schema: `{ history, streak }`

## Spaced Repetition Tiers (weightedShuffle)

| Tier | Condition | Priority |
|------|-----------|----------|
| 0 | Never seen | Highest |
| 1 | Last attempt wrong | High |
| 2 | Last correct, accuracy < 50% | Medium-high |
| 3 | Seen, last correct, not mastered | Medium |
| 4 | ≥3 attempts, accuracy ≥ 80% | Lowest (mastered) |

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

## Content Counts (as of last session)

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
