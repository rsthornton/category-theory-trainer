import { useState } from 'react'

export default function SpotError({ challenge, onComplete, onShowDiagram }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

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
          {challenge.diagram.morphisms.map((m, i) => (
            <button
              key={i}
              className={`error-arrow ${selected === i ? 'selected' : ''} ${
                submitted ? (i === challenge.errorIndex ? 'error-found' : (selected === i ? 'incorrect-option' : 'correct-arrow')) : ''
              }`}
              onClick={() => !submitted && setSelected(i)}
              disabled={submitted}
            >
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
          This arrow is the error
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
