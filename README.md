# Category Theory Trainer

An interactive tool for building category theory intuition through rapid practice across concrete domains (cooking, logic, family/biology).

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Architecture

```
src/
├── App.jsx                    # Main shell, routing, state
├── main.jsx                   # Entry point
├── data/
│   └── challenges.js          # THE CONTENT DATABASE (115 challenges)
├── components/
│   ├── Classify.jsx           # Type 1: Sort objects vs morphisms
│   ├── Validate.jsx           # Type 2: Is this arrow valid?
│   ├── Compose.jsx            # Type 3: Fill in missing chain piece
│   ├── IsomorphismCheck.jsx   # Type 4: One-way or invertible?
│   ├── CategorySwitch.jsx     # Type 5: Same objects, different category
│   ├── SpotError.jsx          # Type 6: Find the broken arrow
│   ├── FunctorMatch.jsx       # Type 7: Map between two categories
│   ├── FreeConstruction.jsx   # Type 8: Build relationships from scratch
│   └── DiagramRenderer.jsx    # SVG commutative diagram generation
└── styles/
    └── app.css                # All styles
```

## Challenge Types

| # | Type | What it drills |
|---|------|----------------|
| 1 | **Classify** | Distinguish objects from morphisms |
| 2 | **Validate** | Morphism validity and directionality |
| 3 | **Compose** | Composition as a concrete operation |
| 4 | **Isomorphism** | Invertibility, information loss |
| 5 | **Category Switch** | Same objects, different arrows depending on category |
| 6 | **Spot the Error** | Debug invalid diagrams |
| 7 | **Functor Match** | Structure-preserving maps between categories |
| 8 | **Free Construction** | Build categorical relationships from scratch |

## Content Database

The content database is in `src/data/challenges.js`. This is the most important file. Each challenge includes:

- Precise morphism labels (no poetic gloss)
- Carefully designed distractors
- Explanations in categorical terms
- Difficulty ratings (1-3)
- Domain tags (cooking, logic, family, mixed)

### Adding More Challenges

The schema is consistent per type. To add challenges:

1. Pick a challenge type (e.g., `validate`)
2. Copy an existing challenge of that type
3. Change the id, content, and explanation
4. The app auto-discovers new entries

### Generating Batches with Claude Code

You can ask Claude Code to generate more challenges:

```
"Generate 15 new 'validate' challenges for the domain 'chemistry'. 
Follow the exact schema in src/data/challenges.js. 
Include plausible distractors and precise explanations."
```

The schema is designed for this — same structure works for hand-authored and generated content.

## Iteration Guide (Claude Code)

Priority areas for improvement:

### High Impact
- **Diagram rendering**: All 8 challenge types now render SVG diagrams. Compose (n=2) uses a proper commutative right triangle. FunctorMatch uses a clean two-column layout without literal boxes. Arrowheads use the tikz-cd stealth style. See `ROADMAP.md` for further diagram improvements including CT library research (Catlab.jl, discopy, quiver).
- ✓ ~~**Scoring/streaks**: Add a streak counter, accuracy tracking per challenge type, and persistence via localStorage.~~
- ✓ ~~**Content volume**: Generate more challenges. Target: 15+ per type per domain.~~

### Medium Impact
- **Animations**: Diagram elements appearing incrementally as you answer correctly.
- ✓ ~~**Shuffle quality**: Current shuffle is basic. Could weight by difficulty, prioritize unseen challenges, or space-repetition.~~
- **Mobile layout**: Responsive but could be more touch-friendly.

### Future (v2)
- **API-generated challenges**: Use Anthropic API to generate unlimited variations.
- **Competitive mode**: Side-by-side answers for the Free Construction type (the Emily game).
- **Additional domains**: Chemistry, music, programming, economics.
- **Timed mode**: Speed drills for building fast pattern recognition.

## Design Principles

1. **Precise language over poetic language.** Morphism labels describe the actual operation or deductive step, not a metaphorical gloss.
2. **The category determines the arrows.** This is the deepest insight and should be reinforced everywhere.
3. **Explanations are the real product.** Getting the answer right matters less than understanding why.
4. **Cross-domain pattern recognition.** Seeing the same structure in cooking and logic is the whole point.
