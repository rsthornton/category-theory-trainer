import { useState } from 'react'

export default function Validate({ challenge, onComplete, onShowDiagram }) {
  const [answer, setAnswer] = useState(null) // "valid_AtoB" | "valid_BtoA" | "invalid"
  const [submitted, setSubmitted] = useState(false)

  const getCorrectAnswer = () => {
    if (!challenge.valid) return 'invalid'
    return challenge.direction === 'AtoB' ? 'valid_AtoB' : 'valid_BtoA'
  }

  const handleSubmit = () => {
    if (!answer) return
    const correct = answer === getCorrectAnswer()
    setSubmitted(true)
    onComplete(challenge.id, correct)

    if (correct && challenge.valid) {
      onShowDiagram({
        type: 'validate',
        from: challenge.direction === 'AtoB' ? challenge.objectA : challenge.objectB,
        to: challenge.direction === 'AtoB' ? challenge.objectB : challenge.objectA,
        morphism: challenge.candidate,
      })
    }
  }

  const correctAnswer = getCorrectAnswer()
  const isCorrect = submitted && answer === correctAnswer

  return (
    <div className="validate-challenge">
      <div className="validate-diagram">
        <span className="obj-node">{challenge.objectA}</span>
        <span className="candidate-arrow">— "{challenge.candidate}" →</span>
        <span className="obj-node">{challenge.objectB}</span>
      </div>

      <p className="challenge-prompt">Is this morphism valid? If so, in which direction?</p>

      <div className="option-list">
        {[
          { key: 'valid_AtoB', label: `Valid: ${challenge.objectA} → ${challenge.objectB}` },
          { key: 'valid_BtoA', label: `Valid: ${challenge.objectB} → ${challenge.objectA}` },
          { key: 'invalid', label: 'Not a valid morphism' },
        ].map(opt => (
          <button
            key={opt.key}
            className={`option-btn ${answer === opt.key ? 'selected' : ''} ${
              submitted ? (opt.key === correctAnswer ? 'correct-option' : (answer === opt.key ? 'incorrect-option' : '')) : ''
            }`}
            onClick={() => !submitted && setAnswer(opt.key)}
            disabled={submitted}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {!submitted && (
        <button onClick={handleSubmit} disabled={!answer} className="submit-btn">
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
