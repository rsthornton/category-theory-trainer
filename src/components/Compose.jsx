import { useState } from 'react'

export default function Compose({ challenge, onComplete, onShowDiagram }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (selected === null) return
    const correct = challenge.options[selected] === challenge.answer
    setSubmitted(true)
    onComplete(challenge.id, correct)

    if (correct) {
      onShowDiagram({
        type: 'compose',
        chain: challenge.chain,
        composed: challenge.missing === 'composed' ? challenge.answer : null,
      })
    }
  }

  const isCorrect = submitted && challenge.options[selected] === challenge.answer
  const correctIndex = challenge.options.indexOf(challenge.answer)

  return (
    <div className="compose-challenge">
      {/* Show the chain */}
      <div className="chain-display">
        {challenge.chain.map((step, i) => (
          <div key={i} className="chain-step">
            <div className="chain-nodes">
              <span className="obj-node">
                {step.from === '?' ? <span className="mystery">?</span> : step.from}
              </span>
              <span className="chain-arrow">
                <span className="arrow-label">
                  {step.morphism === '?' ? <span className="mystery">?</span> : step.morphism}
                </span>
                <span className="arrow-line">———→</span>
              </span>
              <span className="obj-node">
                {step.to === '?' ? <span className="mystery">?</span> : step.to}
              </span>
            </div>
          </div>
        ))}
      </div>

      {challenge.missing === 'composed' && (
        <div className="composed-prompt">
          <span className="arrow-line">- - - - - - →</span>
          <span className="mystery">composed morphism = ?</span>
        </div>
      )}

      <p className="challenge-prompt">{challenge.prompt}</p>

      <div className="option-list">
        {challenge.options.map((opt, i) => (
          <button
            key={i}
            className={`option-btn ${selected === i ? 'selected' : ''} ${
              submitted ? (i === correctIndex ? 'correct-option' : (selected === i ? 'incorrect-option' : '')) : ''
            }`}
            onClick={() => !submitted && setSelected(i)}
            disabled={submitted}
          >
            {opt}
          </button>
        ))}
      </div>

      {!submitted && (
        <button onClick={handleSubmit} disabled={selected === null} className="submit-btn">
          Check Answer
        </button>
      )}

      {submitted && (
        <div className={`feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
          <p className="feedback-verdict">{isCorrect ? '✓ Correct' : '✗ Not quite'}</p>
          <p className="feedback-explanation">{challenge.explanation}</p>
        </div>
      )}
    </div>
  )
}
