# Category Theory Trainer — Roadmap

## Current State

All 8 challenge types are fully playable with SVG commutative diagrams rendered
after each answer. Diagrams follow tikz-cd conventions: stealth arrowheads,
geometric layouts (commutative triangles for composition), no flowchart boxes.

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
- **Difficulty scaling**: Track per-type accuracy and weight challenge selection
  toward weak spots (spaced repetition)
- **API-generated challenges**: Use Claude API with the existing schema to
  generate unlimited domain-specific variations

---

## Infrastructure

- **Persistence**: localStorage for progress, streaks, accuracy per type
- **Export**: Download current diagram as SVG or PNG
- **Sharing**: URL-encoded challenge state so you can link to a specific challenge
