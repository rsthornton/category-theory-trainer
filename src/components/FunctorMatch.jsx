import { useState } from 'react'

export default function FunctorMatch({ challenge, onComplete, onShowDiagram }) {
  const [objectMap, setObjectMap] = useState({}) // { sourceObj: targetObj }
  const [morphismMap, setMorphismMap] = useState({}) // { sourceLabel: targetLabel }
  const [submitted, setSubmitted] = useState(false)
  const [step, setStep] = useState('objects') // 'objects' | 'morphisms'

  const catA = challenge.categoryA
  const catB = challenge.categoryB
  const correct = challenge.correctMapping

  const handleObjectMap = (sourceObj, targetObj) => {
    if (submitted) return
    setObjectMap(prev => ({ ...prev, [sourceObj]: targetObj }))
  }

  const handleMorphismMap = (sourceLabel, targetLabel) => {
    if (submitted) return
    setMorphismMap(prev => ({ ...prev, [sourceLabel]: targetLabel }))
  }

  const allObjectsMapped = catA.objects.every(o => objectMap[o])
  const uniqueMorphLabelsA = [...new Set(catA.morphisms.map(m => m.label))]
  const uniqueMorphLabelsB = [...new Set(catB.morphisms.map(m => m.label))]
  const allMorphismsMapped = uniqueMorphLabelsA.every(l => morphismMap[l])

  const handleSubmit = () => {
    const objCorrect = catA.objects.every(o => objectMap[o] === correct.objects[o])
    const morphCorrect = Object.keys(correct.morphisms).every(k => morphismMap[k] === correct.morphisms[k])
    const allCorrect = objCorrect && morphCorrect
    setSubmitted(true)
    onComplete(challenge.id, allCorrect)
    onShowDiagram({
      type: 'functor_match',
      categoryA: challenge.categoryA,
      categoryB: challenge.categoryB,
      correctMapping: challenge.correctMapping,
    })
  }

  const objCorrect = submitted && catA.objects.every(o => objectMap[o] === correct.objects[o])
  const morphCorrect = submitted && Object.keys(correct.morphisms).every(k => morphismMap[k] === correct.morphisms[k])
  const allCorrect = objCorrect && morphCorrect

  return (
    <div className="functor-challenge">
      <p className="challenge-prompt">{challenge.prompt}</p>

      <div className="functor-categories">
        <div className="functor-cat">
          <h4>{catA.name}</h4>
          <div className="functor-items">
            {catA.objects.map(o => (
              <div key={o} className="functor-obj">{o}</div>
            ))}
            <div className="functor-morphisms-list">
              {catA.morphisms.map((m, i) => (
                <div key={i} className="functor-morph">{m.from} —<em>{m.label}</em>→ {m.to}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="functor-arrow-col">
          <span className="functor-F">F</span>
          <span className="arrow-line">———→</span>
        </div>

        <div className="functor-cat">
          <h4>{catB.name}</h4>
          <div className="functor-items">
            {catB.objects.map(o => (
              <div key={o} className="functor-obj">{o}</div>
            ))}
            <div className="functor-morphisms-list">
              {catB.morphisms.map((m, i) => (
                <div key={i} className="functor-morph">{m.from} —<em>{m.label}</em>→ {m.to}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Object mapping step */}
      {step === 'objects' && (
        <div className="mapping-section">
          <h4>Step 1: Map each object in {catA.name} to an object in {catB.name}</h4>
          {catA.objects.map(srcObj => (
            <div key={srcObj} className="mapping-row">
              <span className="mapping-source">{srcObj} ↦</span>
              <div className="mapping-options">
                {catB.objects.map(tgtObj => (
                  <button
                    key={tgtObj}
                    className={`mapping-btn ${objectMap[srcObj] === tgtObj ? 'selected' : ''} ${
                      submitted ? (correct.objects[srcObj] === tgtObj ? 'correct-option' : (objectMap[srcObj] === tgtObj ? 'incorrect-option' : '')) : ''
                    }`}
                    onClick={() => handleObjectMap(srcObj, tgtObj)}
                    disabled={submitted}
                  >
                    {tgtObj}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {allObjectsMapped && !submitted && (
            <button className="submit-btn" onClick={() => setStep('morphisms')}>
              Next: Map Morphisms →
            </button>
          )}
        </div>
      )}

      {/* Morphism mapping step */}
      {step === 'morphisms' && (
        <div className="mapping-section">
          <h4>Step 2: Map each morphism in {catA.name} to a morphism in {catB.name}</h4>
          {uniqueMorphLabelsA.map(srcLabel => (
            <div key={srcLabel} className="mapping-row">
              <span className="mapping-source">{srcLabel} ↦</span>
              <div className="mapping-options">
                {uniqueMorphLabelsB.map(tgtLabel => (
                  <button
                    key={tgtLabel}
                    className={`mapping-btn ${morphismMap[srcLabel] === tgtLabel ? 'selected' : ''} ${
                      submitted ? (correct.morphisms[srcLabel] === tgtLabel ? 'correct-option' : (morphismMap[srcLabel] === tgtLabel ? 'incorrect-option' : '')) : ''
                    }`}
                    onClick={() => handleMorphismMap(srcLabel, tgtLabel)}
                    disabled={submitted}
                  >
                    {tgtLabel}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {!submitted && (
            <div className="mapping-actions">
              <button className="nav-btn" onClick={() => setStep('objects')}>← Back to Objects</button>
              <button className="submit-btn" onClick={handleSubmit} disabled={!allMorphismsMapped}>
                Check Functor
              </button>
            </div>
          )}
        </div>
      )}

      {submitted && (
        <div className={`feedback ${allCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
          <p className="feedback-verdict">{allCorrect ? '✓ Correct functor' : '✗ Not quite'}</p>
          <p className="feedback-explanation">{challenge.explanation}</p>
        </div>
      )}
    </div>
  )
}
