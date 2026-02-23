import { useState, useEffect } from 'react'

export default function IsomorphismCheck({ challenge, onComplete, onShowDiagram }) {
  const [answer, setAnswer] = useState(null) // "iso" | "not_iso"
  const [submitted, setSubmitted] = useState(false)

  const correctAnswer = challenge.isIso ? 'iso' : 'not_iso'

  const handleSubmit = () => {
    if (!answer) return
    const correct = answer === correctAnswer
    setSubmitted(true)
    onComplete(challenge.id, correct)

    if (correct) {
      onShowDiagram({
        type: 'isomorphism',
        objectA: challenge.objectA,
        objectB: challenge.objectB,
        morphismAtoB: challenge.morphismAtoB,
        isIso: challenge.isIso,
        reverseMorphism: challenge.reverseMorphism,
      })
    }
  }

  useEffect(() => {
    if (submitted) return
    const handler = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key === '1') setAnswer('iso')
      if (e.key === '2') setAnswer('not_iso')
      if (e.key === 'Enter' && answer) handleSubmit()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [submitted, answer]) // eslint-disable-line react-hooks/exhaustive-deps

  const isCorrect = submitted && answer === correctAnswer

  return (
    <div className="iso-challenge">
      <div className="iso-diagram">
        <span className="obj-node">{challenge.objectA}</span>
        <span className="chain-arrow">
          <span className="arrow-label">{challenge.morphismAtoB}</span>
          <span className="arrow-line">———→</span>
        </span>
        <span className="obj-node">{challenge.objectB}</span>
      </div>

      <p className="challenge-prompt">Is this an isomorphism? Does a reverse morphism exist?</p>

      <div className="option-list">
        <button
          className={`option-btn ${answer === 'iso' ? 'selected' : ''} ${
            submitted ? ('iso' === correctAnswer ? 'correct-option' : (answer === 'iso' ? 'incorrect-option' : '')) : ''
          }`}
          onClick={() => !submitted && setAnswer('iso')}
          disabled={submitted}
        >
          <span className="key-hint-inline">1</span> <strong>Isomorphism</strong> — a reverse morphism exists, no information is lost
        </button>
        <button
          className={`option-btn ${answer === 'not_iso' ? 'selected' : ''} ${
            submitted ? ('not_iso' === correctAnswer ? 'correct-option' : (answer === 'not_iso' ? 'incorrect-option' : '')) : ''
          }`}
          onClick={() => !submitted && setAnswer('not_iso')}
          disabled={submitted}
        >
          <span className="key-hint-inline">2</span> <strong>Not an isomorphism</strong> — the morphism is one-way, information is lost
        </button>
      </div>

      {!submitted && (
        <button onClick={handleSubmit} disabled={!answer} className="submit-btn">
          Check Answer <span className="key-hint-inline">↵</span>
        </button>
      )}

      {submitted && (
        <div className={`feedback ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
          <p className="feedback-verdict">{isCorrect ? '✓ Correct' : '✗ Not quite'}</p>
          {challenge.isIso && challenge.reverseMorphism && (
            <p className="feedback-detail">Reverse morphism: <em>{challenge.reverseMorphism}</em></p>
          )}
          <p className="feedback-explanation">{challenge.explanation}</p>
        </div>
      )}
    </div>
  )
}
