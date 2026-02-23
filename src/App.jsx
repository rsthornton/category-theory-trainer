import { useState, useCallback, useEffect } from 'react'
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

function getTier(h) {
  if (!h) return 0;
  if (!h.lastCorrect) return 1;
  const acc = h.correct / h.attempts;
  if (acc < 0.5) return 2;
  if (h.attempts >= 3 && acc >= 0.8) return 4;
  return 3;
}

function weightedShuffle(pool, history) {
  const tiered = [[], [], [], [], []];
  for (const c of pool) {
    tiered[getTier(history[c.id])].push(c);
  }
  return tiered.flatMap(group => shuffleArray(group));
}

const TOTAL_CHALLENGES = Object.values(challenges).flat().length

export default function App() {
  const [activeType, setActiveType] = useState(null)
  const [challengeIndex, setChallengeIndex] = useState(0)
  const [history, setHistory] = useState({})
  const [streak, setStreak] = useState(0)
  const [showDiagram, setShowDiagram] = useState(null)
  const [shuffledChallenges, setShuffledChallenges] = useState({})

  // Derive completed from history so existing rendering code is unchanged
  const completed = Object.fromEntries(
    Object.entries(history).map(([id, h]) => [id, h.lastCorrect])
  )

  // Mount hydration
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('ct-trainer-v1') || '{}');
      if (saved.history) setHistory(saved.history);
      if (typeof saved.streak === 'number') setStreak(saved.streak);
    } catch (_) {}
  }, []);

  const getChallenges = useCallback((typeKey) => {
    return shuffledChallenges[typeKey] || []
  }, [shuffledChallenges])

  const handleSelectType = (typeKey) => {
    const shuffled = weightedShuffle(challenges[typeKey] || [], history)
    setShuffledChallenges(prev => ({ ...prev, [typeKey]: shuffled }))
    setActiveType(typeKey)
    setChallengeIndex(0)
    setShowDiagram(null)
  }

  const handleComplete = useCallback((id, correct) => {
    setHistory(prev => {
      const entry = prev[id] ?? { attempts: 0, correct: 0, lastSeen: 0, lastCorrect: false };
      const next = {
        ...prev,
        [id]: {
          attempts: entry.attempts + 1,
          correct: entry.correct + (correct ? 1 : 0),
          lastSeen: Date.now(),
          lastCorrect: correct,
        }
      };
      setStreak(s => {
        const newStreak = correct ? s + 1 : 0;
        localStorage.setItem('ct-trainer-v1', JSON.stringify({ history: next, streak: newStreak }));
        return newStreak;
      });
      return next;
    });
  }, []);

  const handleNext = (pool) => {
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

  const handleReset = () => {
    if (!confirm('Reset all progress and streaks?')) return
    localStorage.removeItem('ct-trainer-v1')
    setHistory({})
    setStreak(0)
    setShuffledChallenges({})
  }

  // Stats
  const totalCompleted = Object.keys(completed).length
  const totalCorrect = Object.values(completed).filter(Boolean).length
  const accuracy = totalCompleted > 0 ? Math.round(totalCorrect / totalCompleted * 100) : 0

  // Main menu
  if (!activeType) {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Category Theory Trainer</h1>
          <p className="subtitle">Build intuition through practice. Objects, morphisms, composition, functors.</p>
          {totalCompleted > 0 && (
            <div className="stats-row">
              <span className="stats">Completed: {totalCompleted} / {TOTAL_CHALLENGES} · Accuracy: {accuracy}%</span>
              {streak >= 2 && <span className="streak-badge">🔥 {streak} streak</span>}
            </div>
          )}
          {totalCompleted > 0 && (
            <button className="reset-btn" onClick={handleReset}>Reset progress</button>
          )}
        </header>
        <div className="type-grid">
          {CHALLENGE_TYPES.map((ct, i) => {
            const pool = challenges[ct.key] || []
            const done = pool.filter(c => completed[c.id] !== undefined).length
            const correct = pool.filter(c => completed[c.id] === true).length
            const acc = done > 0 ? Math.round(correct / done * 100) : null
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
                  <span className="type-progress">{correct}/{done} · {acc}%</span>
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

  const handleMarkKnown = () => {
    handleComplete(current.id, true)
    handleNext(pool)
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
        <button className="mark-known-btn" onClick={handleMarkKnown} title="Mark correct and skip">
          ✓ Mark as known
        </button>
        <button onClick={() => handleNext(pool)} disabled={challengeIndex >= pool.length - 1} className="nav-btn">Next →</button>
      </div>
    </div>
  )
}
