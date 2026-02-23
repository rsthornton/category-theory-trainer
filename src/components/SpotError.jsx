import { useState, useEffect } from 'react'

export default function SpotError({ challenge, onComplete, onShowDiagram }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const morphisms = challenge.diagram.morphisms

  const handleSubmit = () => {
    if (selected === null) return
    const correct = selected === challenge.errorIndex
    setSubmitted(true)
    onComplete(challenge.id, correct)
    onShowDiagram({
      type: 'spot_error',
      objects: challenge.diagram.objects,
      morphisms: challenge.diagram.morphisms,
      errorIndex: challenge.errorIndex,
    })
  }

  useEffect(() => {
    if (submitted) return
    const handler = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const n = parseInt(e.key)
      if (n >= 1 && n <= morphisms.length) setSelected(n - 1)
      if (e.key === 'Enter' && selected !== null) handleSubmit()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [submitted, selected]) // eslint-disable-line react-hooks/exhaustive-deps

  const isCorrect = submitted && selected === challenge.errorIndex

  return (
    <div className="spoterror-challenge">
      <p className="challenge-prompt">{challenge.prompt}</p>

      <div className="error-diagram">
        {/* Show objects */}
        <div className="error-objects">
          {challenge.diagram.objects.map((obj, i) => (
            <span key={i} className="obj-node">{obj}</span>
          ))}
        </div>

        {/* Show morphisms as clickable arrows */}
        <div className="error-arrows">
          {morphisms.map((m, i) => (
            <button
              key={i}
              className={`error-arrow ${selected === i ? 'selected' : ''} ${
                submitted ? (i === challenge.errorIndex ? 'error-found' : (selected === i ? 'incorrect-option' : 'correct-arrow')) : ''
              }`}
              onClick={() => !submitted && setSelected(i)}
              disabled={submitted}
            >
              <span className="key-hint-inline">{i + 1}</span>
              <span className="error-from">{challenge.diagram.objects[m.from]}</span>
              <span className="error-line">—— {m.label} ——→</span>
              <span className="error-to">{challenge.diagram.objects[m.to]}</span>
              {submitted && i === challenge.errorIndex && (
                <span className="error-badge">✗ {challenge.errorType.replace('_', ' ')}</span>
              )}
              {submitted && i !== challenge.errorIndex && m.valid && (
                <span className="valid-badge">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {!submitted && (
        <button onClick={handleSubmit} disabled={selected === null} className="submit-btn">
          This arrow is the error <span className="key-hint-inline">↵</span>
        </button>
      )}

      {submitted && (
        <div className={`feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
          <p className="feedback-verdict">{isCorrect ? '✓ Correct — you found the error' : '✗ Wrong arrow'}</p>
          <p className="feedback-explanation">{challenge.explanation}</p>
        </div>
      )}
    </div>
  )
}
