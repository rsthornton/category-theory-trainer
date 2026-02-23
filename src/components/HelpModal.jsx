import { useState, useEffect } from 'react'

export default function HelpModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('tutorial')

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal">
        <div className="modal-header">
          <h2>Category Theory Trainer — Help</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal-tabs">
          <button
            className={`modal-tab${activeTab === 'tutorial' ? ' active' : ''}`}
            onClick={() => setActiveTab('tutorial')}
          >
            Tutorial
          </button>
          <button
            className={`modal-tab${activeTab === 'definitions' ? ' active' : ''}`}
            onClick={() => setActiveTab('definitions')}
          >
            Definitions
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'tutorial' && <TutorialTab />}
          {activeTab === 'definitions' && <DefinitionsTab />}
        </div>

        <div className="modal-footer">
          <button onClick={onClose}>Start Practicing</button>
        </div>
      </div>
    </div>
  )
}

function TutorialTab() {
  return (
    <>
      <div className="help-section">
        <h3>What is category theory?</h3>
        <p>
          Category theory is the mathematics of relationships. Instead of studying what
          things <em>are</em>, it studies how they <em>connect</em>. A category has <strong>objects</strong> (the nodes)
          and <strong>morphisms</strong> (arrows between them). The key insight: the structure of the
          arrows tells you everything interesting — not the internal nature of the objects.
        </p>
      </div>

      <div className="help-section">
        <h3>How to use this app</h3>
        <ul>
          <li>Pick a challenge type from the menu</li>
          <li>Read the prompt and select your answer</li>
          <li>Keyboard shortcuts: <strong>1–4</strong> select options, <strong>Enter</strong> confirms</li>
          <li><strong>✓ Mark as known</strong> skips a challenge you've already mastered</li>
          <li>Progress and streak are saved in your browser (localStorage)</li>
          <li>The app uses spaced repetition — hard challenges come back more often</li>
        </ul>
      </div>

      <div className="help-section">
        <h3>Challenge types</h3>
        <table className="type-ref-table">
          <tbody>
            <tr><td>1</td><td>Classify</td><td>Is this word an object or a morphism?</td></tr>
            <tr><td>2</td><td>Validate</td><td>Is this arrow valid? Which direction?</td></tr>
            <tr><td>3</td><td>Compose</td><td>Fill in the missing piece of a chain</td></tr>
            <tr><td>4</td><td>Isomorphism</td><td>One-way or fully invertible?</td></tr>
            <tr><td>5</td><td>Category Switch</td><td>Same objects, different category — how do arrows change?</td></tr>
            <tr><td>6</td><td>Spot the Error</td><td>Find the broken arrow in a diagram</td></tr>
            <tr><td>7</td><td>Functor Match</td><td>Map objects and arrows between two categories</td></tr>
            <tr><td>8</td><td>Free Construction</td><td>Build relationships from scratch</td></tr>
          </tbody>
        </table>
      </div>

      <div className="help-section">
        <h3>Domains</h3>
        <table className="type-ref-table">
          <tbody>
            <tr><td>🍳</td><td>Cooking</td><td>Physical kitchen transformations — irreversible by default</td></tr>
            <tr><td>💡</td><td>Logic</td><td>Propositions, inference rules, proof as morphism</td></tr>
            <tr><td>🌿</td><td>Family / Biology</td><td>Kinship and biological relationships</td></tr>
            <tr><td>🏛</td><td>Political Economy</td><td>Institutions, governance, policy processes, Hayekian feedback cycles</td></tr>
            <tr><td>🔐</td><td>Cryptoeconomics</td><td>Blockchain states, cryptographic operations, consensus mechanisms</td></tr>
            <tr><td>🔁</td><td>Systems Science</td><td>Hierarchical composition, feedback loops, cross-scale structural patterns</td></tr>
            <tr><td>🧠</td><td>Neuromorphics</td><td>Neural computation, substrate-independence, learning as morphism</td></tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

function DefinitionsTab() {
  return (
    <>
      <p className="def-subsection-label">Core primitives</p>
      <table className="def-table">
        <thead>
          <tr>
            <th>Term</th>
            <th>What it means</th>
            <th>Everyday example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Object</td>
            <td>A <em>thing</em> in your category — a noun, a state, a position. You treat it as a black box; what matters is how arrows connect to it, not what's inside.</td>
            <td>In cooking: <em>raw egg</em>, <em>cooked egg</em>, <em>plate</em>. In logic: <em>"It is raining"</em> (a statement that can be true or false).</td>
          </tr>
          <tr>
            <td>Morphism</td>
            <td>A process or relationship that goes <em>from</em> one object <em>to</em> another — a verb, an action, a step. Morphisms have a fixed direction; going backwards is a different (and not always possible) arrow.</td>
            <td>"Fry" goes from raw egg → cooked egg. "Prove" goes from axioms → theorem. You can't un-fry an egg, so there's no reverse arrow.</td>
          </tr>
          <tr>
            <td>Identity</td>
            <td>Every object has a built-in do-nothing arrow that takes it back to itself — "stay exactly as you are." This must exist for a valid category.</td>
            <td>"Leave the egg alone" — raw egg → raw egg. It sounds trivial, but it's what allows composition to work cleanly.</td>
          </tr>
          <tr>
            <td>Composition</td>
            <td>If you can get from A to B, and from B to C, then you can always get from A to C in one combined step. Steps chain together, and the chain is itself a valid morphism.</td>
            <td>"Crack then fry" — raw egg → cracked egg → cooked egg collapses into a single arrow raw egg → cooked egg. The intermediate step is hidden inside the composite.</td>
          </tr>
        </tbody>
      </table>

      <p className="def-subsection-label">Category laws</p>
      <table className="def-table">
        <thead>
          <tr>
            <th>Law</th>
            <th>What it means in plain English</th>
            <th>Why it matters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Associativity</td>
            <td>When chaining three steps, it doesn't matter whether you "combine" the first two or the last two first — you get the same result either way. The <em>order</em> of steps is fixed; only the <em>grouping</em> is flexible.</td>
            <td>(Crack, then fry), then plate = Crack, then (fry, then plate). Same dish either way. This means you can freely refactor long chains without changing the outcome.</td>
          </tr>
          <tr>
            <td>Unitality</td>
            <td>Doing a step and then doing nothing is the same as just doing the step. Doing nothing and then doing a step is the same as just doing the step. Identity is genuinely invisible.</td>
            <td>"Fry, then leave the egg alone" = "just fry." The identity morphism doesn't interfere — it's a neutral element, like adding zero.</td>
          </tr>
        </tbody>
      </table>

      <p className="def-subsection-label">Logic domain vocabulary</p>
      <table className="def-table">
        <thead>
          <tr>
            <th>Term</th>
            <th>What it means</th>
            <th>Everyday example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Proposition</td>
            <td>Any statement that is either true or false — no in-betweens, no maybe. Commands, questions, and opinions aren't propositions. In the logic category, propositions are the <strong>objects</strong>.</td>
            <td>"It is raining" ✓ — true or false. "Pass me the salt" ✗ — a command, not a proposition. "The number 7 is odd" ✓ — definitely true.</td>
          </tr>
          <tr>
            <td>Conjunction</td>
            <td>"Conjunction" just means <em>and</em>. "P and Q" is a combined statement that is only true when <em>both</em> parts are true. It's a proposition in its own right — an <strong>object</strong>.</td>
            <td>"It is raining AND I forgot my umbrella." Both halves must be true. If the sun is shining, the whole conjunction is false.</td>
          </tr>
          <tr>
            <td>Conjunction introduction</td>
            <td>If you already know P is true, and you separately know Q is true, this rule lets you combine them into the single claim "P and Q." You're building up a richer statement. It's a <strong>morphism</strong>: two separate facts → one combined fact.</td>
            <td>You know "It's raining." You know "I forgot my umbrella." Conjunction introduction produces: "It's raining AND I forgot my umbrella."</td>
          </tr>
          <tr>
            <td>Conjunction elimination</td>
            <td>If you know "P and Q" is true, this rule lets you pull out either half on its own — just P, or just Q. You're simplifying a combined claim back to one of its parts. It's a <strong>morphism</strong>: combined fact → simpler fact.</td>
            <td>From "It's raining AND I forgot my umbrella," you can extract just "It's raining." That extraction step is conjunction elimination.</td>
          </tr>
          <tr>
            <td>Modus ponens</td>
            <td>The most basic rule of reasoning: if you know a rule ("if P then Q") and you know the trigger (P is true), you're guaranteed the result (Q is true). It's a <strong>morphism</strong> that follows the rule to its conclusion.</td>
            <td>Rule: "If it rains, the ground gets wet." Fact: "It is raining." Modus ponens gives you: "The ground is wet." You didn't observe the ground — you deduced it.</td>
          </tr>
          <tr>
            <td>Contrapositive</td>
            <td>Every "if P then Q" statement has a logically equivalent twin: "if not-Q then not-P." They carry <em>exactly</em> the same information — you can always swap between them and back. This makes it an <strong>isomorphism</strong>.</td>
            <td>"If it rains, the ground gets wet" ↔ "If the ground is not wet, it is not raining." Same logical content, two different phrasings. Neither loses anything.</td>
          </tr>
          <tr>
            <td>Inference rule</td>
            <td>The general name for any procedure that takes one or more propositions and produces another through guaranteed-valid reasoning. Modus ponens, conjunction introduction, and conjunction elimination are all inference rules — all <strong>morphisms</strong> in the logic category.</td>
            <td>Think of it as a recipe for conclusions: "given these premises as ingredients, produce this new statement as output."</td>
          </tr>
        </tbody>
      </table>

      <p className="def-subsection-label">Derived concepts</p>
      <table className="def-table">
        <thead>
          <tr>
            <th>Term</th>
            <th>What it means</th>
            <th>Everyday example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Isomorphism</td>
            <td>Two objects connected by arrows in <em>both directions</em> such that going A → B → A lands you back exactly where you started (and the same for B → A → B). No information is created or destroyed — the two objects are, for all categorical purposes, interchangeable.</td>
            <td>Converting 20°C to 68°F and back gives you 20°C again — an isomorphism. Scrambling an egg is not: you can't unscramble it, so there's no reverse arrow.</td>
          </tr>
          <tr>
            <td>Functor</td>
            <td>A translation between two whole categories that respects all the structure. Objects map to objects, arrows map to arrows, and chained steps stay chained. It's a structure-preserving dictionary between worlds.</td>
            <td>Translating a recipe into a proof: each ingredient becomes a proposition, each cooking step becomes an inference rule. A functor ensures the connections survive translation — if step A leads to B in the recipe, the translated proposition must lead to the translated conclusion.</td>
          </tr>
          <tr>
            <td>Natural transformation</td>
            <td>A coherent way to "upgrade" one functor to another. If F and G are two different translations of the same category, a natural transformation gives every object a bridge from F's version to G's version — and all those bridges fit together consistently.</td>
            <td>Say functor F translates every recipe into French cuisine, and functor G translates every recipe into Italian. A natural transformation would be a consistent way to convert each French dish to its Italian equivalent — the whole menu, not just one dish, and all the substitutions agreeing with each other.</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
