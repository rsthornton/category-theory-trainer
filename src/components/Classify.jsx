import { useState } from 'react'

export default function Classify({ challenge, onComplete, onShowDiagram }) {
  const [placements, setPlacements] = useState({}) // { word: "object"|"morphism"|null }
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState(null)

  const words = challenge.words

  const handlePlace = (word, bucket) => {
    if (submitted) return
    setPlacements(prev => ({ ...prev, [word]: bucket }))
  }

  const handleSubmit = () => {
    const allPlaced = words.every(w => placements[w.word])
    if (!allPlaced) return

    const correct = words.every(w => placements[w.word] === w.kind)
    setResult(correct)
    setSubmitted(true)
    onComplete(challenge.id, correct)

    if (correct) {
      const objects = words.filter(w => w.kind === 'object').map(w => w.word)
      const morphisms = words.filter(w => w.kind === 'morphism').map(w => w.word)
      onShowDiagram({ type: 'classify', objects, morphisms })
    }
  }

  const objectBucket = words.filter(w => placements[w.word] === 'object')
  const morphismBucket = words.filter(w => placements[w.word] === 'morphism')
  const unplaced = words.filter(w => !placements[w.word])

  return (
    <div className="classify-challenge">
      <p className="challenge-prompt">{challenge.prompt}</p>

      {/* Unplaced words */}
      <div className="word-pool">
        {unplaced.map(w => (
          <div key={w.word} className="word-chip">
            <span>{w.word}</span>
            <div className="chip-actions">
              <button onClick={() => handlePlace(w.word, 'object')} className="chip-btn obj-btn">Object</button>
              <button onClick={() => handlePlace(w.word, 'morphism')} className="chip-btn morph-btn">Morphism</button>
            </div>
          </div>
        ))}
        {unplaced.length === 0 && !submitted && (
          <p className="hint-text">All words placed. Review your buckets below, then submit.</p>
        )}
      </div>

      {/* Buckets */}
      <div className="buckets">
        <div className="bucket">
          <h3 className="bucket-label">Objects</h3>
          {objectBucket.map(w => (
            <div
              key={w.word}
              className={`placed-word ${submitted ? (w.kind === 'object' ? 'correct' : 'incorrect') : ''}`}
              onClick={() => !submitted && setPlacements(prev => ({ ...prev, [w.word]: null }))}
            >
              {w.word}
              {submitted && w.kind !== 'object' && <span className="fix"> → morphism</span>}
            </div>
          ))}
          {objectBucket.length === 0 && <p className="empty-bucket">—</p>}
        </div>
        <div className="bucket">
          <h3 className="bucket-label">Morphisms</h3>
          {morphismBucket.map(w => (
            <div
              key={w.word}
              className={`placed-word ${submitted ? (w.kind === 'morphism' ? 'correct' : 'incorrect') : ''}`}
              onClick={() => !submitted && setPlacements(prev => ({ ...prev, [w.word]: null }))}
            >
              {w.word}
              {submitted && w.kind !== 'morphism' && <span className="fix"> → object</span>}
            </div>
          ))}
          {morphismBucket.length === 0 && <p className="empty-bucket">—</p>}
        </div>
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={unplaced.length > 0}
          className="submit-btn"
        >
          Check Answer
        </button>
      )}

      {submitted && (
        <div className={`feedback ${result ? 'feedback-correct' : 'feedback-incorrect'}`}>
          <p className="feedback-verdict">{result ? '✓ Correct' : '✗ Not quite'}</p>
          <p className="feedback-explanation">{challenge.explanation}</p>
        </div>
      )}
    </div>
  )
}
