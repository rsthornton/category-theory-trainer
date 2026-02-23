import { useState, useCallback, useEffect, useRef } from 'react'
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
import HelpModal from './components/HelpModal'

const CHALLENGE_TYPES = [
  { key: 'classify',         label: 'Classify',          desc: 'Sort words into objects and morphisms',                        component: Classify },
  { key: 'validate',         label: 'Validate',          desc: 'Is this arrow valid? Which direction?',                        component: Validate },
  { key: 'compose',          label: 'Compose',           desc: 'Fill in the missing piece of a chain',                         component: Compose },
  { key: 'isomorphism',      label: 'Isomorphism',       desc: 'One-way or invertible?',                                       component: IsomorphismCheck },
  { key: 'category_switch',  label: 'Category Switch',   desc: 'Same objects, different category — how do arrows change?',     component: CategorySwitch },
  { key: 'spot_error',       label: 'Spot the Error',    desc: 'Find the broken arrow in a diagram',                           component: SpotError },
  { key: 'functor_match',    label: 'Functor Match',     desc: 'Map objects and arrows between two categories',                component: FunctorMatch },
  { key: 'free_construction',label: 'Free Construction', desc: 'Two objects — build the relationship from scratch',            component: FreeConstruction },
]

// ── Tier system ──────────────────────────────────────────────────────────────

const TIERS = {
  foundation: ['classify', 'validate'],
  core:       ['compose', 'isomorphism', 'spot_error'],
  advanced:   ['category_switch', 'functor_match', 'free_construction'],
}
const TIER_LABELS     = { foundation: 'Foundation', core: 'Core', advanced: 'Advanced' }
const TIER_ORDER      = ['foundation', 'core', 'advanced']
const TIER_PREREQ     = { core: 'foundation', advanced: 'core' }
const TESTOUT_SIZE    = 5
const TESTOUT_PASS    = 4
const ORGANIC_THRESHOLD = 5

function getTierForType(typeKey) {
  for (const [tier, types] of Object.entries(TIERS)) {
    if (types.includes(typeKey)) return tier
  }
  return 'foundation'
}

function countCorrectInTier(tier, hist) {
  return (TIERS[tier] || [])
    .flatMap(k => challenges[k] || [])
    .filter(c => hist[c.id]?.lastCorrect === true).length
}

function computeOrganicUnlocks(hist) {
  const s = new Set(['foundation'])
  if (countCorrectInTier('foundation', hist) >= ORGANIC_THRESHOLD) {
    s.add('core')
    if (countCorrectInTier('core', hist) >= ORGANIC_THRESHOLD) s.add('advanced')
  }
  return s
}

// ── Spaced repetition ────────────────────────────────────────────────────────

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function getTier(h) {
  if (!h) return 0
  if (!h.lastCorrect) return 1
  const acc = h.correct / h.attempts
  if (acc < 0.5) return 2
  if (h.attempts >= 3 && acc >= 0.8) return 4
  return 3
}

function weightedShuffle(pool, history) {
  const tiered = [[], [], [], [], []]
  for (const c of pool) tiered[getTier(history[c.id])].push(c)
  return tiered.flatMap(group => shuffleArray(group))
}

const TOTAL_CHALLENGES = Object.values(challenges).flat().length

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeType,         setActiveType]         = useState(null)
  const [challengeIndex,     setChallengeIndex]     = useState(0)
  const [history,            setHistory]            = useState({})
  const [streak,             setStreak]             = useState(0)
  const [showDiagram,        setShowDiagram]        = useState(null)
  const [shuffledChallenges, setShuffledChallenges] = useState({})
  const [showHelp,           setShowHelp]           = useState(false)
  const [manualUnlocks,      setManualUnlocks]      = useState(new Set(['foundation']))
  const [testOut,            setTestOut]            = useState(null)

  // Ref so handleComplete (stable callback) can read latest testOut without it
  // as a dependency — avoids stale closure on every answer.
  const testOutRef = useRef(null)
  useEffect(() => { testOutRef.current = testOut }, [testOut])

  // ── Derived ────────────────────────────────────────────────────────────────

  const completed = Object.fromEntries(
    Object.entries(history).map(([id, h]) => [id, h.lastCorrect])
  )

  const unlockedTiers = new Set([...computeOrganicUnlocks(history), ...manualUnlocks])
  const isUnlocked = (typeKey) => unlockedTiers.has(getTierForType(typeKey))

  // ── Hydration ──────────────────────────────────────────────────────────────

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('ct-trainer-v1') || '{}')
      if (saved.history) setHistory(saved.history)
      if (typeof saved.streak === 'number') setStreak(saved.streak)
      if (Array.isArray(saved.manualUnlocks)) setManualUnlocks(new Set(saved.manualUnlocks))
      if (!saved.helpSeen) setShowHelp(true)
    } catch (_) {}
  }, [])

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleCloseHelp = () => {
    setShowHelp(false)
    const existing = JSON.parse(localStorage.getItem('ct-trainer-v1') || '{}')
    localStorage.setItem('ct-trainer-v1', JSON.stringify({ ...existing, helpSeen: true }))
  }

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
      const entry = prev[id] ?? { attempts: 0, correct: 0, lastSeen: 0, lastCorrect: false }
      const next = {
        ...prev,
        [id]: {
          attempts:    entry.attempts + 1,
          correct:     entry.correct + (correct ? 1 : 0),
          lastSeen:    Date.now(),
          lastCorrect: correct,
        }
      }
      setStreak(s => {
        const newStreak = correct ? s + 1 : 0
        const existing = JSON.parse(localStorage.getItem('ct-trainer-v1') || '{}')
        localStorage.setItem('ct-trainer-v1', JSON.stringify({ ...existing, history: next, streak: newStreak }))
        return newStreak
      })
      return next
    })
    // Record test-out answer so the Continue button can score it
    if (testOutRef.current && !testOutRef.current.done) {
      setTestOut(prev => prev ? { ...prev, pendingResult: correct } : prev)
    }
  }, [])

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
    setTestOut(null)
  }

  const handleReset = () => {
    if (!confirm('Reset all progress and streaks?')) return
    localStorage.removeItem('ct-trainer-v1')
    setHistory({})
    setStreak(0)
    setShuffledChallenges({})
    setManualUnlocks(new Set(['foundation']))
    setTestOut(null)
  }

  // ── Test-out handlers ──────────────────────────────────────────────────────

  const handleStartTestOut = (tier, e) => {
    e?.stopPropagation()
    const pool = shuffleArray(TIERS[tier].flatMap(k => challenges[k] || []))
    setTestOut({
      tier,
      challenges:    pool.slice(0, TESTOUT_SIZE),
      index:         0,
      correct:       0,
      results:       [],
      pendingResult: null,
      done:          false,
      passed:        false,
    })
    setActiveType(null)
    setShowDiagram(null)
  }

  const handleTestOutNext = () => {
    setTestOut(prev => {
      if (!prev) return null
      const wasCorrect  = prev.pendingResult === true
      const newCorrect  = prev.correct + (wasCorrect ? 1 : 0)
      const newIndex    = prev.index + 1
      const newResults  = [...prev.results, wasCorrect]
      if (newIndex >= prev.challenges.length) {
        return { ...prev, correct: newCorrect, index: newIndex, results: newResults,
                 done: true, passed: newCorrect >= TESTOUT_PASS, pendingResult: null }
      }
      return { ...prev, correct: newCorrect, index: newIndex, results: newResults, pendingResult: null }
    })
    setShowDiagram(null)
  }

  const handleTestOutFinish = (passed) => {
    const tier = testOut?.tier
    if (passed && tier) {
      setManualUnlocks(prev => {
        const next = new Set([...prev, tier])
        const existing = JSON.parse(localStorage.getItem('ct-trainer-v1') || '{}')
        localStorage.setItem('ct-trainer-v1', JSON.stringify({ ...existing, manualUnlocks: [...next] }))
        return next
      })
    }
    setTestOut(null)
    setActiveType(null)
  }

  // ── Stats ──────────────────────────────────────────────────────────────────

  const totalCompleted = Object.keys(completed).length
  const totalCorrect   = Object.values(completed).filter(Boolean).length
  const accuracy       = totalCompleted > 0 ? Math.round(totalCorrect / totalCompleted * 100) : 0

  // ── Test-out result screen ─────────────────────────────────────────────────

  if (testOut?.done) {
    return (
      <div className="app">
        <div className="testout-result">
          <div className={`testout-verdict ${testOut.passed ? 'verdict-pass' : 'verdict-fail'}`}>
            {testOut.passed ? '✓ Passed' : '✗ Not quite'}
          </div>
          <div className="testout-score">{testOut.correct} / {TESTOUT_SIZE} correct</div>
          <div className="testout-pips">
            {testOut.results.map((r, i) => (
              <span key={i} className={`testout-pip ${r ? 'pip-correct' : 'pip-incorrect'}`} />
            ))}
          </div>
          {testOut.passed ? (
            <>
              <p className="testout-message">
                <strong>{TIER_LABELS[testOut.tier]}</strong> tier unlocked!
              </p>
              <button className="submit-btn" onClick={() => handleTestOutFinish(true)}>
                Start practicing →
              </button>
            </>
          ) : (
            <>
              <p className="testout-message">
                You need {TESTOUT_PASS}/{TESTOUT_SIZE} to unlock. Try more{' '}
                <strong>{TIER_LABELS[TIER_PREREQ[testOut.tier]]}</strong> challenges first,
                then come back.
              </p>
              <button className="submit-btn" onClick={() => handleTestOutFinish(false)}>
                Back to menu
              </button>
            </>
          )}
        </div>
        {showHelp && <HelpModal onClose={handleCloseHelp} />}
      </div>
    )
  }

  // ── Main menu ──────────────────────────────────────────────────────────────

  if (!activeType && !testOut) {
    const foundationCorrect = countCorrectInTier('foundation', history)
    const coreCorrect       = countCorrectInTier('core', history)

    return (
      <div className="app">
        <header className="app-header">
          <button className="help-btn" onClick={() => setShowHelp(true)} title="Help & Definitions">?</button>
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

        {TIER_ORDER.map(tier => {
          const tierUnlocked  = unlockedTiers.has(tier)
          const tierTypes     = CHALLENGE_TYPES.filter(ct => TIERS[tier].includes(ct.key))
          const prereq        = TIER_PREREQ[tier]
          const prereqUnlocked = !prereq || unlockedTiers.has(prereq)
          const prereqCorrect = tier === 'core' ? foundationCorrect : coreCorrect
          const remaining     = Math.max(0, ORGANIC_THRESHOLD - prereqCorrect)

          return (
            <div key={tier} className={`tier-section${tierUnlocked ? '' : ' tier-section-locked'}`}>
              <div className="tier-heading-row">
                <span className={`tier-label${tierUnlocked ? '' : ' tier-label-locked'}`}>
                  {!tierUnlocked && <span className="tier-lock">🔒</span>}
                  {TIER_LABELS[tier]}
                </span>
                {!tierUnlocked && prereqUnlocked && (
                  <button className="testout-btn" onClick={(e) => handleStartTestOut(tier, e)}>
                    Test out →
                  </button>
                )}
              </div>
              {!tierUnlocked && prereqUnlocked && remaining > 0 && (
                <p className="tier-hint">
                  {prereqCorrect}/{ORGANIC_THRESHOLD} {TIER_LABELS[prereq]} correct — {remaining} more to auto-unlock
                </p>
              )}
              {!tierUnlocked && !prereqUnlocked && (
                <p className="tier-hint">Unlock {TIER_LABELS[prereq]} first</p>
              )}
              <div className="type-grid">
                {tierTypes.map((ct) => {
                  const globalIndex = CHALLENGE_TYPES.findIndex(t => t.key === ct.key) + 1
                  const pool        = challenges[ct.key] || []
                  const done        = pool.filter(c => completed[c.id] !== undefined).length
                  const correct     = pool.filter(c => completed[c.id] === true).length
                  const acc         = done > 0 ? Math.round(correct / done * 100) : null
                  return (
                    <button
                      key={ct.key}
                      className={`type-card${tierUnlocked ? '' : ' locked'}`}
                      onClick={() => handleSelectType(ct.key)}
                    >
                      <span className="type-number">{globalIndex}</span>
                      <span className="type-label">{ct.label}</span>
                      <span className="type-desc">{ct.desc}</span>
                      {done > 0
                        ? <span className="type-progress">{correct}/{done} · {acc}%</span>
                        : <span className="type-progress">{pool.length} challenges</span>
                      }
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}

        {showHelp && <HelpModal onClose={handleCloseHelp} />}
      </div>
    )
  }

  // ── Challenge view (normal or test-out in progress) ────────────────────────

  const inTestOut = testOut !== null

  let current, typeInfo, ChallengeComponent, pool

  if (inTestOut) {
    current            = testOut.challenges[testOut.index]
    typeInfo           = CHALLENGE_TYPES.find(t => t.key === current.type)
    ChallengeComponent = typeInfo?.component
    pool               = null
  } else {
    typeInfo           = CHALLENGE_TYPES.find(t => t.key === activeType)
    ChallengeComponent = typeInfo?.component
    pool               = getChallenges(activeType)
    current            = pool[challengeIndex]
  }

  if (!current || !ChallengeComponent) {
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

  const currentTier       = typeInfo ? getTierForType(typeInfo.key) : null
  const challengeIsLocked = !inTestOut && typeInfo && !isUnlocked(typeInfo.key)

  return (
    <div className="app">
      <div className="challenge-header">
        {inTestOut ? (
          <div className="testout-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className="back-btn" style={{ marginBottom: 0 }} onClick={handleBack}>← Exit test-out</button>
            </div>
            <div className="testout-progress-row">
              <span className="testout-label">Testing: {TIER_LABELS[testOut.tier]}</span>
              <div className="testout-pips">
                {testOut.challenges.map((_, i) => {
                  const isDone   = i < testOut.index
                  const isActive = i === testOut.index
                  const result   = testOut.results[i]
                  return (
                    <span
                      key={i}
                      className={`testout-pip ${
                        isDone   ? (result ? 'pip-correct' : 'pip-incorrect') :
                        isActive ? 'pip-active' : 'pip-pending'
                      }`}
                    />
                  )
                })}
              </div>
              <span className="testout-counter">{testOut.index + 1}/{TESTOUT_SIZE}</span>
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <button className="back-btn" style={{ marginBottom: 0 }} onClick={handleBack}>← All Challenges</button>
              <button className="help-btn" onClick={() => setShowHelp(true)} title="Help & Definitions">?</button>
            </div>
            {challengeIsLocked && (
              <div className="locked-banner">
                <span>🔒 <strong>{TIER_LABELS[currentTier]}</strong> tier — complete {TIER_LABELS[TIER_PREREQ[currentTier]]} challenges to unlock</span>
                <button className="locked-banner-btn" onClick={(e) => handleStartTestOut(currentTier, e)}>
                  Test out →
                </button>
              </div>
            )}
          </>
        )}
        <div className="challenge-meta">
          <h2>{typeInfo.label}</h2>
          {!inTestOut && <span className="challenge-counter">{challengeIndex + 1} / {pool.length}</span>}
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
        {inTestOut ? (
          <>
            <span />
            <button
              className="submit-btn"
              onClick={handleTestOutNext}
              disabled={testOut.pendingResult === null}
            >
              {testOut.index + 1 < TESTOUT_SIZE ? 'Continue →' : 'See results →'}
            </button>
          </>
        ) : (
          <>
            <button onClick={handlePrev} disabled={challengeIndex === 0} className="nav-btn">← Previous</button>
            <button className="mark-known-btn" onClick={handleMarkKnown} title="Mark correct and skip">
              ✓ Mark as known
            </button>
            <button onClick={() => handleNext(pool)} disabled={challengeIndex >= pool.length - 1} className="nav-btn">Next →</button>
          </>
        )}
      </div>

      {showHelp && <HelpModal onClose={handleCloseHelp} />}
    </div>
  )
}
