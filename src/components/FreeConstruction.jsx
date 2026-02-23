import { useState } from 'react'

export default function FreeConstruction({ challenge, onComplete, onShowDiagram }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showAuthor, setShowAuthor] = useState(false)

  const steps = challenge.steps
  const step = steps[currentStep]
  const selectedForStep = answers[currentStep] ?? null

  const handleSelect = (optionIndex) => {
    const newAnswers = [...answers]
    newAnswers[currentStep] = optionIndex
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (selectedForStep === null) return
    if (currentStep < steps.length - 1) {
      setCurrentStep(s => s + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1)
    }
  }

  const allAnswered = answers.length === steps.length && answers.every(a => a !== null && a !== undefined)
  const isLastStep = currentStep === steps.length - 1

  const handleFinish = () => {
    // Score it
    const correctCount = steps.reduce((count, s, i) => {
      return count + (s.options[answers[i]] === s.answer ? 1 : 0)
    }, 0)
    const allCorrect = correctCount === steps.length
    onComplete(challenge.id, allCorrect)
    setShowAuthor(true)
    onShowDiagram({
      type: 'free_construction',
      objectA: challenge.objectA,
      objectB: challenge.objectB,
      morphism: challenge.authorAnalysis.morphism,
      direction: challenge.authorAnalysis.direction,
      isIso: challenge.authorAnalysis.isIso,
    })
  }

  return (
    <div className="freecon-challenge">
      <div className="freecon-objects">
        <span className="obj-node freecon-obj">{challenge.objectA}</span>
        <span className="freecon-question">?</span>
        <span className="obj-node freecon-obj">{challenge.objectB}</span>
      </div>

      {/* Progress dots */}
      <div className="freecon-progress">
        {steps.map((_, i) => (
          <span
            key={i}
            className={`progress-dot ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'done' : ''}`}
          />
        ))}
      </div>

      {/* Current step */}
      {!showAuthor && (
        <div className="freecon-step">
          <p className="challenge-prompt">{step.question}</p>
          <div className="option-list">
            {step.options.map((opt, i) => {
              const isSelected = selectedForStep === i
              const isCorrectOpt = opt === step.answer
              const showResult = showAuthor
              return (
                <button
                  key={i}
                  className={`option-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(i)}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          <div className="freecon-nav">
            {currentStep > 0 && (
              <button className="nav-btn" onClick={handlePrevStep}>← Previous</button>
            )}
            {!isLastStep && (
              <button className="submit-btn" onClick={handleNext} disabled={selectedForStep === null}>
                Next →
              </button>
            )}
            {isLastStep && selectedForStep !== null && (
              <button className="submit-btn" onClick={handleFinish}>
                See Analysis
              </button>
            )}
          </div>
        </div>
      )}

      {/* Author's analysis */}
      {showAuthor && (
        <div className="freecon-analysis">
          <h4>Your Answers vs. Author's Analysis</h4>

          {steps.map((s, i) => {
            const userAnswer = s.options[answers[i]]
            const correct = userAnswer === s.answer
            return (
              <div key={i} className={`freecon-review ${correct ? 'review-correct' : 'review-incorrect'}`}>
                <p className="review-question">{s.question}</p>
                <p className="review-user">
                  {correct ? '✓' : '✗'} Your answer: <em>{userAnswer}</em>
                </p>
                {!correct && (
                  <p className="review-correct-answer">Author's answer: <em>{s.answer}</em></p>
                )}
              </div>
            )
          })}

          <div className="feedback feedback-correct" style={{ marginTop: '20px' }}>
            <p className="feedback-verdict">Author's Full Analysis</p>
            <p><strong>Category:</strong> {challenge.authorAnalysis.category}</p>
            <p><strong>Morphism:</strong> {challenge.authorAnalysis.morphism}</p>
            <p><strong>Direction:</strong> {challenge.authorAnalysis.direction === 'both' ? 'Both directions' : `${challenge.objectA} → ${challenge.objectB}`}</p>
            <p><strong>Isomorphism:</strong> {challenge.authorAnalysis.isIso ? 'Yes' : 'No'}</p>
            <p className="feedback-explanation">{challenge.authorAnalysis.explanation}</p>
          </div>
        </div>
      )}
    </div>
  )
}
