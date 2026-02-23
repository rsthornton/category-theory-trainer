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
            <th>Definition</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Object</td>
            <td>A node in a category. No internal structure assumed — just a thing.</td>
            <td>In cooking: <em>ingredient</em>, <em>dish</em>, <em>technique</em>. In logic: <em>proposition</em>.</td>
          </tr>
          <tr>
            <td>Morphism</td>
            <td>An arrow from one object to another — a relationship, process, or transformation.</td>
            <td><code>chop : ingredient → prep</code>, <code>proves : axioms → theorem</code></td>
          </tr>
          <tr>
            <td>Identity</td>
            <td>Every object has a do-nothing arrow back to itself: <code>id_A : A → A</code>.</td>
            <td><code>id_ingredient</code> — leave the ingredient unchanged</td>
          </tr>
          <tr>
            <td>Composition</td>
            <td>If <code>f : A → B</code> and <code>g : B → C</code> exist, their composite <code>g ∘ f : A → C</code> also exists.</td>
            <td>Chop then cook = <code>chop ; cook : ingredient → dish</code></td>
          </tr>
        </tbody>
      </table>

      <p className="def-subsection-label">Category laws</p>
      <table className="def-table">
        <thead>
          <tr>
            <th>Law</th>
            <th>Statement</th>
            <th>Why it matters</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Associativity</td>
            <td><code>h ∘ (g ∘ f) = (h ∘ g) ∘ f</code></td>
            <td>Grouping doesn't matter — only the sequence of steps</td>
          </tr>
          <tr>
            <td>Unitality</td>
            <td><code>id_B ∘ f = f</code> and <code>f ∘ id_A = f</code></td>
            <td>Composing with identity leaves a morphism unchanged</td>
          </tr>
        </tbody>
      </table>

      <p className="def-subsection-label">Logic domain vocabulary</p>
      <table className="def-table">
        <thead>
          <tr>
            <th>Term</th>
            <th>Meaning</th>
            <th>In CT terms</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Proposition</td>
            <td>A statement that is either true or false — e.g. "It is raining."</td>
            <td>An <strong>object</strong> in the logic category</td>
          </tr>
          <tr>
            <td>Conjunction</td>
            <td>"P and Q" — true only when both P and Q are true.</td>
            <td>An object: the combined proposition P ∧ Q</td>
          </tr>
          <tr>
            <td>Conjunction introduction</td>
            <td>Given P and given Q separately, derive "P and Q."</td>
            <td>A <strong>morphism</strong>: (P, Q) → P ∧ Q</td>
          </tr>
          <tr>
            <td>Conjunction elimination</td>
            <td>From "P and Q," extract P alone (or Q alone).</td>
            <td>A <strong>morphism</strong>: P ∧ Q → P</td>
          </tr>
          <tr>
            <td>Modus ponens</td>
            <td>Given "If P then Q" and given P, conclude Q.</td>
            <td>A <strong>morphism</strong>: (P → Q, P) → Q</td>
          </tr>
          <tr>
            <td>Contrapositive</td>
            <td>"If P then Q" is equivalent to "If not-Q then not-P." Always valid.</td>
            <td>An <strong>isomorphism</strong>: (P → Q) ↔ (¬Q → ¬P)</td>
          </tr>
          <tr>
            <td>Inference rule</td>
            <td>Any rule that derives one proposition from others — the general category for conjunction elimination, modus ponens, etc.</td>
            <td>A <strong>morphism</strong> in the logic category</td>
          </tr>
        </tbody>
      </table>

      <p className="def-subsection-label">Derived concepts</p>
      <table className="def-table">
        <thead>
          <tr>
            <th>Term</th>
            <th>Definition</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Isomorphism</td>
            <td>A morphism <code>f : A → B</code> with an inverse <code>g : B → A</code> — no information lost.</td>
            <td>Celsius ↔ Fahrenheit: invertible. Cooking an egg: not invertible.</td>
          </tr>
          <tr>
            <td>Functor</td>
            <td>A structure-preserving map between categories. Sends objects to objects, morphisms to morphisms, preserving composition.</td>
            <td>A functor Cooking → Logic maps ingredients to propositions and recipes to proofs.</td>
          </tr>
          <tr>
            <td>Natural transformation</td>
            <td>A coherent family of morphisms between two functors. A "map of maps."</td>
            <td>If F and G are two translations of the same domain, a nat. transformation shows they're compatibly related.</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
