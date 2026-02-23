import { useState } from 'react'

export default function CategorySwitch({ challenge, onComplete, onShowDiagram }) {
  const [revealed, setRevealed] = useState([false, false, false])
  const [synthAnswer, setSynthAnswer] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleReveal = (idx) => {
    setRevealed(prev => {
      const next = [...prev]
      next[idx] = true
      return next
    })
  }

  const allRevealed = challenge.categories.every((_, i) => revealed[i])

  const handleShowAnswer = () => {
    setSubmitted(true)
    onComplete(challenge.id, true)
    onShowDiagram({
      type: 'category_switch',
      objectA: challenge.objectA,
      objectB: challenge.objectB,
      categories: challenge.categories,
    })
  }

  return (
    <div className="catswitch-challenge">
      <div className="catswitch-header">
        <span className="obj-node">{challenge.objectA}</span>
        <span className="arrow-line">———→</span>
        <span className="obj-node">{challenge.objectB}</span>
      </div>

      <p className="challenge-prompt">{challenge.prompt}</p>

      <div className="catswitch-categories">
        {challenge.categories.map((cat, i) => (
          <div key={i} className="catswitch-card">
            <h4 className="cat-name">{cat.name}</h4>
            {!revealed[i] ? (
              <button className="reveal-btn" onClick={() => handleReveal(i)}>
                What is the morphism here?
              </button>
            ) : (
              <div className="cat-revealed">
                <p className="cat-morphism">→ {cat.morphism}</p>
                <p className="cat-explanation">{cat.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {allRevealed && !submitted && (
        <div className="synthesis-section">
          <p className="synthesis-question"><strong>Synthesis:</strong> {challenge.synthesisQuestion}</p>
          <button className="submit-btn" onClick={handleShowAnswer}>
            Show Answer
          </button>
        </div>
      )}

      {submitted && (
        <div className="feedback feedback-correct">
          <p className="feedback-verdict">Key Insight</p>
          <p className="feedback-explanation">{challenge.synthesisAnswer}</p>
        </div>
      )}
    </div>
  )
}
