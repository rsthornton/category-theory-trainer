import { useState, useCallback } from 'react'
import challenges from './data/challenges'
import Classify from './components/Classify'
import Validate from './components/Validate'
import Compose from './components/Compose'
import IsomorphismCheck from './components/IsomorphismCheck'
import CategorySwitch from './components/CategorySwitch'
import SpotError from './components/SpotError'
import FunctorMatch from './components/FunctorMatch'
import FreeConstruction from './components/FreeConstruction'
import DiagramRenderer from './components/DiagramRenderer'

const CHALLENGE_TYPES = [
  { key: 'classify', label: 'Classify', desc: 'Sort words into objects and morphisms', component: Classify },
  { key: 'validate', label: 'Validate', desc: 'Is this arrow valid? Which direction?', component: Validate },
  { key: 'compose', label: 'Compose', desc: 'Fill in the missing piece of a chain', component: Compose },
  { key: 'isomorphism', label: 'Isomorphism', desc: 'One-way or invertible?', component: IsomorphismCheck },
  { key: 'category_switch', label: 'Category Switch', desc: 'Same objects, different category — how do arrows change?', component: CategorySwitch },
  { key: 'spot_error', label: 'Spot the Error', desc: 'Find the broken arrow in a diagram', component: SpotError },
  { key: 'functor_match', label: 'Functor Match', desc: 'Map objects and arrows between two categories', component: FunctorMatch },
  { key: 'free_construction', label: 'Free Construction', desc: 'Two objects — build the relationship from scratch', component: FreeConstruction },
]

function shuffleArray(arr) {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function App() {
  const [activeType, setActiveType] = useState(null)
  const [challengeIndex, setChallengeIndex] = useState(0)
  const [completed, setCompleted] = useState({}) // { challengeId: true/false }
  const [showDiagram, setShowDiagram] = useState(null)
  const [shuffledChallenges, setShuffledChallenges] = useState({})

  const getChallenges = useCallback((typeKey) => {
    if (!shuffledChallenges[typeKey]) {
      const shuffled = shuffleArray(challenges[typeKey] || [])
      setShuffledChallenges(prev => ({ ...prev, [typeKey]: shuffled }))
      return shuffled
    }
    return shuffledChallenges[typeKey]
  }, [shuffledChallenges])

  const handleSelectType = (typeKey) => {
    setActiveType(typeKey)
    setChallengeIndex(0)
    setShowDiagram(null)
    getChallenges(typeKey) // ensure shuffled
  }

  const handleComplete = (challengeId, correct) => {
    setCompleted(prev => ({ ...prev, [challengeId]: correct }))
  }

  const handleNext = () => {
    const pool = getChallenges(activeType)
    if (challengeIndex < pool.length - 1) {
      setChallengeIndex(i => i + 1)
      setShowDiagram(null)
    }
  }

  const handlePrev = () => {
    if (challengeIndex > 0) {
      setChallengeIndex(i => i - 1)
      setShowDiagram(null)
    }
  }

  const handleBack = () => {
    setActiveType(null)
    setChallengeIndex(0)
    setShowDiagram(null)
  }

  // Stats
  const totalCompleted = Object.keys(completed).length
  const totalCorrect = Object.values(completed).filter(Boolean).length

  // Main menu
  if (!activeType) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Category Theory Trainer</h1>
          <p className="subtitle">Build intuition through practice. Objects, morphisms, composition, functors.</p>
          {totalCompleted > 0 && (
            <p className="stats">{totalCorrect}/{totalCompleted} correct across all challenges</p>
          )}
        </header>
        <div className="type-grid">
          {CHALLENGE_TYPES.map((ct, i) => {
            const pool = challenges[ct.key] || []
            const done = pool.filter(c => completed[c.id] !== undefined).length
            const correct = pool.filter(c => completed[c.id] === true).length
            return (
              <button
                key={ct.key}
                className="type-card"
                onClick={() => handleSelectType(ct.key)}
              >
                <span className="type-number">{i + 1}</span>
                <span className="type-label">{ct.label}</span>
                <span className="type-desc">{ct.desc}</span>
                {done > 0 && (
                  <span className="type-progress">{correct}/{done} · {pool.length} total</span>
                )}
                {done === 0 && (
                  <span className="type-progress">{pool.length} challenges</span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Challenge view
  const typeInfo = CHALLENGE_TYPES.find(t => t.key === activeType)
  const ChallengeComponent = typeInfo.component
  const pool = getChallenges(activeType)
  const current = pool[challengeIndex]

  if (!current) {
    return (
      <div className="app">
        <button className="back-btn" onClick={handleBack}>← Back</button>
        <p>No challenges available for this type.</p>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="challenge-header">
        <button className="back-btn" onClick={handleBack}>← All Challenges</button>
        <div className="challenge-meta">
          <h2>{typeInfo.label}</h2>
          <span className="challenge-counter">{challengeIndex + 1} / {pool.length}</span>
          <span className={`domain-tag domain-${current.domain}`}>{current.domain}</span>
          <span className="diff-tag">{'●'.repeat(current.difficulty)}{'○'.repeat(3 - current.difficulty)}</span>
        </div>
      </div>

      <div className="challenge-body">
        <ChallengeComponent
          key={current.id}
          challenge={current}
          onComplete={handleComplete}
          onShowDiagram={setShowDiagram}
        />
      </div>

      {showDiagram && (
        <div className="diagram-panel">
          <DiagramRenderer data={showDiagram} />
        </div>
      )}

      <div className="challenge-nav">
        <button onClick={handlePrev} disabled={challengeIndex === 0} className="nav-btn">← Previous</button>
        <button onClick={handleNext} disabled={challengeIndex >= pool.length - 1} className="nav-btn">Next →</button>
      </div>
    </div>
  )
}
