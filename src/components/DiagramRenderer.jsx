/**
 * DiagramRenderer - renders commutative diagrams in textbook style.
 *
 * Supported data.type values:
 *   classify, validate, isomorphism, compose,
 *   category_switch, spot_error, functor_match, free_construction
 *
 * Arrow style: concave-back "stealth" head — matches tikz-cd convention.
 * Compose (n=2): commutative right triangle making the square law visual.
 * FunctorMatch: column layout, no literal boxes.
 */

export default function DiagramRenderer({ data }) {
  if (!data) return null

  const ARROW_COLOR = '#333'
  const DASH_COLOR = '#aaa'

  // Concave-back "stealth" arrowhead — standard mathematical arrow style
  const markerDef = (id, color = ARROW_COLOR) => (
    <marker id={id} markerWidth="9" markerHeight="8" refX="7" refY="3.5" orient="auto">
      <path d="M 0 0 L 7 3.5 L 0 7 L 2 3.5 Z" fill={color} />
    </marker>
  )

  // ---- classify ----
  if (data.type === 'classify') {
    return (
      <div className="diagram-reward">
        <p className="diagram-title">Classified:</p>
        <div className="diagram-classify">
          <div><strong>Objects:</strong> {data.objects.join(', ')}</div>
          <div><strong>Morphisms:</strong> {data.morphisms.join(', ')}</div>
        </div>
      </div>
    )
  }

  // ---- validate ----
  if (data.type === 'validate') {
    return (
      <div className="diagram-reward">
        <svg width="360" height="80" viewBox="0 0 360 80" style={{ overflow: 'visible' }}>
          <defs>{markerDef('arr-v')}</defs>
          <text x="40" y="44" textAnchor="middle" className="dia-obj">{data.from}</text>
          <text x="320" y="44" textAnchor="middle" className="dia-obj">{data.to}</text>
          <line x1="82" y1="38" x2="279" y2="38" stroke={ARROW_COLOR} strokeWidth="1.2" markerEnd="url(#arr-v)" />
          <text x="180" y="28" textAnchor="middle" className="dia-morph">{data.morphism}</text>
        </svg>
      </div>
    )
  }

  // ---- isomorphism ----
  if (data.type === 'isomorphism') {
    return (
      <div className="diagram-reward">
        <svg width="380" height="120" viewBox="0 0 380 120" style={{ overflow: 'visible' }}>
          <defs>{markerDef('arr-i')}</defs>
          <text x="50" y="60" textAnchor="middle" className="dia-obj">{data.objectA}</text>
          <text x="330" y="60" textAnchor="middle" className="dia-obj">{data.objectB}</text>
          <path d="M 90 48 Q 190 10 290 48" stroke={ARROW_COLOR} strokeWidth="1.2" fill="none" markerEnd="url(#arr-i)" />
          <text x="190" y="22" textAnchor="middle" className="dia-morph">{data.morphismAtoB}</text>
          {data.isIso ? (
            <>
              <path d="M 290 68 Q 190 106 90 68" stroke={ARROW_COLOR} strokeWidth="1.2" fill="none" markerEnd="url(#arr-i)" />
              <text x="190" y="104" textAnchor="middle" className="dia-morph">{data.reverseMorphism}</text>
              <text x="190" y="62" textAnchor="middle" className="dia-iso">≅</text>
            </>
          ) : (
            <>
              <path d="M 290 68 Q 190 106 90 68" stroke="#ddd" strokeWidth="1" fill="none" strokeDasharray="4 3" />
              <text x="190" y="100" textAnchor="middle" className="dia-morph" fill="#ccc">✗ no reverse</text>
            </>
          )}
        </svg>
      </div>
    )
  }

  // ---- compose ----
  if (data.type === 'compose') {
    const chain = data.chain
    const n = chain.length

    // n = 2: proper commutative right triangle
    // A ——f——→ B
    //  \       |
    // g∘f     g
    //    \     |
    //     ——→ C
    if (n === 2) {
      const [f, g] = chain
      const ax = 60,  ay = 60
      const bx = 330, by = 60
      const cx = 330, cy = 180
      const width = 410, height = 218

      return (
        <div className="diagram-reward">
          <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
            <defs>
              {markerDef('arr-c')}
              {markerDef('arr-cd', DASH_COLOR)}
            </defs>

            <text x={ax} y={ay} textAnchor="middle" className="dia-obj">{f.from}</text>
            <text x={bx} y={by} textAnchor="middle" className="dia-obj">{f.to}</text>
            <text x={cx} y={cy} textAnchor="middle" className="dia-obj">{g.to}</text>

            {/* f: A → B  (horizontal top) */}
            <line x1={ax + 36} y1={ay - 6} x2={bx - 36} y2={by - 6}
                  stroke={ARROW_COLOR} strokeWidth="1.2" markerEnd="url(#arr-c)" />
            <text x={(ax + bx) / 2} y={ay - 17} textAnchor="middle" className="dia-morph">
              {f.morphism}
            </text>

            {/* g: B → C  (vertical right side) */}
            <line x1={bx + 7} y1={by + 12} x2={cx + 7} y2={cy - 12}
                  stroke={ARROW_COLOR} strokeWidth="1.2" markerEnd="url(#arr-c)" />
            <text x={bx + 22} y={(by + cy) / 2 + 5} textAnchor="start" className="dia-morph">
              {g.morphism}
            </text>

            {/* g∘f: A → C  (diagonal, dashed — the composed morphism) */}
            {data.composed && (
              <>
                <line x1={ax + 18} y1={ay + 14} x2={cx - 18} y2={cy - 14}
                      stroke={DASH_COLOR} strokeWidth="1.1" strokeDasharray="5 3"
                      markerEnd="url(#arr-cd)" />
                <text
                  x={(ax + cx) / 2 - 22} y={(ay + cy) / 2 + 8}
                  textAnchor="end" className="dia-morph" fill={DASH_COLOR}
                >
                  {data.composed}
                </text>
              </>
            )}
          </svg>
        </div>
      )
    }

    // n ≥ 3: linear chain, wider spacing to avoid label crowding
    const width = n * 200 + 60
    const spacing = (width - 80) / n

    return (
      <div className="diagram-reward">
        <svg width={width} height="150" viewBox={`0 0 ${width} 150`} style={{ overflow: 'visible' }}>
          <defs>
            {markerDef('arr-c')}
            {markerDef('arr-cd', DASH_COLOR)}
          </defs>
          {chain.map((step, i) => (
            <text key={`obj-${i}`} x={40 + i * spacing} y="50" textAnchor="middle" className="dia-obj">
              {step.from}
            </text>
          ))}
          <text x={40 + n * spacing} y="50" textAnchor="middle" className="dia-obj">
            {chain[n - 1].to}
          </text>
          {chain.map((step, i) => {
            const x1 = 40 + i * spacing + Math.round(spacing * 0.28)
            const x2 = 40 + (i + 1) * spacing - Math.round(spacing * 0.28)
            return (
              <g key={`arr-${i}`}>
                <line x1={x1} y1="43" x2={x2} y2="43"
                      stroke={ARROW_COLOR} strokeWidth="1.2" markerEnd="url(#arr-c)" />
                <text x={(x1 + x2) / 2} y="32" textAnchor="middle" className="dia-morph">
                  {step.morphism}
                </text>
              </g>
            )
          })}
          {data.composed && n > 1 && (
            <>
              <path
                d={`M 55 62 Q ${40 + n * spacing / 2} ${110 + n * 12} ${25 + n * spacing} 62`}
                stroke={DASH_COLOR} strokeWidth="1.1" fill="none"
                strokeDasharray="5 3" markerEnd="url(#arr-cd)"
              />
              <text x={40 + n * spacing / 2} y={108 + n * 10}
                    textAnchor="middle" className="dia-morph" fill={DASH_COLOR}>
                {data.composed}
              </text>
            </>
          )}
        </svg>
      </div>
    )
  }

  // ---- category_switch ----
  if (data.type === 'category_switch') {
    const n = data.categories.length
    const height = n * 80 + 20
    return (
      <div className="diagram-reward">
        <svg width="560" height={height} viewBox={`0 0 560 ${height}`} style={{ overflow: 'visible' }}>
          <defs>{markerDef('arr-cs')}</defs>
          {data.categories.map((cat, i) => {
            const rowY = 10 + i * 80
            return (
              <g key={i}>
                {i > 0 && (
                  <line x1="20" y1={rowY} x2="540" y2={rowY} stroke="#eee" strokeWidth="1" />
                )}
                <text x="280" y={rowY + 14} textAnchor="middle" className="dia-category-label">{cat.name}</text>
                <text x="50"  y={rowY + 50} textAnchor="middle" className="dia-obj">{data.objectA}</text>
                <text x="510" y={rowY + 50} textAnchor="middle" className="dia-obj">{data.objectB}</text>
                <line x1="108" y1={rowY + 44} x2="455" y2={rowY + 44}
                      stroke={ARROW_COLOR} strokeWidth="1.2" markerEnd="url(#arr-cs)" />
                <text x="280" y={rowY + 32} textAnchor="middle" className="dia-morph">{cat.morphism}</text>
              </g>
            )
          })}
        </svg>
      </div>
    )
  }

  // ---- spot_error ----
  if (data.type === 'spot_error') {
    const { objects, morphisms, errorIndex } = data
    const n = objects.length
    const width = n * 140 + 80
    const objX = (i) => 40 + i * 140
    const arrowY = 50
    return (
      <div className="diagram-reward">
        <svg width={width} height="120" viewBox={`0 0 ${width} 120`} style={{ overflow: 'visible' }}>
          <defs>
            {markerDef('arr-se')}
            {markerDef('arr-se-err', '#ef4444')}
          </defs>
          {objects.map((obj, i) => (
            <text key={i} x={objX(i)} y="65" textAnchor="middle" className="dia-obj">{obj}</text>
          ))}
          {morphisms.map((m, i) => {
            const isError = i === errorIndex
            const color = isError ? '#ef4444' : ARROW_COLOR
            const markerId = isError ? 'arr-se-err' : 'arr-se'
            const fromX = objX(m.from)
            const toX = objX(m.to)
            const midX = (fromX + toX) / 2
            const forward = m.from < m.to
            return (
              <g key={i}>
                {forward ? (
                  <>
                    <line x1={fromX + 25} y1={arrowY} x2={toX - 25} y2={arrowY}
                          stroke={color} strokeWidth="1.2"
                          strokeDasharray={isError ? '5 3' : undefined}
                          markerEnd={`url(#${markerId})`} />
                    <text x={midX} y={arrowY - 12} textAnchor="middle" className="dia-morph">{m.label}</text>
                    {isError && (
                      <text x={midX} y={arrowY + 18} textAnchor="middle" fill="#ef4444" className="dia-morph">✗</text>
                    )}
                  </>
                ) : (
                  <>
                    <path d={`M ${fromX + 15} 72 Q ${midX} 105 ${toX - 15} 72`}
                          stroke={color} strokeWidth="1.2" fill="none"
                          strokeDasharray={isError ? '5 3' : undefined}
                          markerEnd={`url(#${markerId})`} />
                    <text x={midX} y="112" textAnchor="middle" className="dia-morph">{m.label}</text>
                    {isError && (
                      <text x={midX} y="100" textAnchor="middle" fill="#ef4444" className="dia-morph">✗</text>
                    )}
                  </>
                )}
              </g>
            )
          })}
        </svg>
      </div>
    )
  }

  // ---- functor_match ----
  // Two clean columns, no literal boxes — separated by thin vertical lines.
  // Objects listed as plain labels; F functor arrow bridges the center gap.
  if (data.type === 'functor_match') {
    const { categoryA, categoryB, correctMapping } = data
    const na = categoryA.objects.length
    const nb = categoryB.objects.length
    const n = Math.max(na, nb)
    const height = n * 52 + 80
    const centerY = height / 2

    // Column x-centers
    const lx = 95   // category A objects
    const rx = 505  // category B objects

    // Separator x positions (left of center gap)
    const sepL = 200
    const sepR = 400

    const startY = 65

    return (
      <div className="diagram-reward">
        <svg width="600" height={height} viewBox={`0 0 600 ${height}`} style={{ overflow: 'visible' }}>
          <defs>{markerDef('arr-fm', DASH_COLOR)}</defs>

          {/* Category name headers */}
          <text x={lx} y="22" textAnchor="middle" className="dia-category-label">{categoryA.name}</text>
          <text x={rx} y="22" textAnchor="middle" className="dia-category-label">{categoryB.name}</text>

          {/* Thin vertical separators flanking the F-arrow gap */}
          <line x1={sepL} y1="30" x2={sepL} y2={height - 12} stroke="#e8e8e8" strokeWidth="1" />
          <line x1={sepR} y1="30" x2={sepR} y2={height - 12} stroke="#e8e8e8" strokeWidth="1" />

          {/* Objects — left column */}
          {categoryA.objects.map((obj, i) => (
            <text key={i} x={lx} y={startY + i * 52} textAnchor="middle" className="dia-obj">{obj}</text>
          ))}

          {/* Objects — right column */}
          {categoryB.objects.map((obj, j) => (
            <text key={j} x={rx} y={startY + j * 52} textAnchor="middle" className="dia-obj">{obj}</text>
          ))}

          {/* F: functor label + arrow across the center gap */}
          <text x="300" y={centerY - 14} textAnchor="middle"
                fontStyle="italic" fontSize="15"
                fontFamily="'Libre Baskerville', serif" fill="#bbb">F</text>
          <line x1={sepL + 8} y1={centerY} x2={sepR - 8} y2={centerY}
                stroke={DASH_COLOR} strokeWidth="1.2" markerEnd="url(#arr-fm)" />

          {/* Object-mapping dashed connectors */}
          {Object.entries(correctMapping.objects).map(([src, tgt], k) => {
            const si = categoryA.objects.indexOf(src)
            const ti = categoryB.objects.indexOf(tgt)
            if (si < 0 || ti < 0) return null
            return (
              <line key={k}
                    x1={lx + 60} y1={startY + si * 52 - 7}
                    x2={rx - 60} y2={startY + ti * 52 - 7}
                    stroke="#ddd" strokeWidth="1" strokeDasharray="3 2" />
            )
          })}
        </svg>
      </div>
    )
  }

  // ---- free_construction ----
  if (data.type === 'free_construction') {
    const { objectA, objectB, morphism, direction, isIso } = data
    const showReverse = isIso || direction === 'both'
    const displayA = direction === 'BtoA' ? objectB : objectA
    const displayB = direction === 'BtoA' ? objectA : objectB
    return (
      <div className="diagram-reward">
        <svg width="380" height="120" viewBox="0 0 380 120" style={{ overflow: 'visible' }}>
          <defs>{markerDef('arr-fc')}</defs>
          <text x="50"  y="60" textAnchor="middle" className="dia-obj">{displayA}</text>
          <text x="330" y="60" textAnchor="middle" className="dia-obj">{displayB}</text>
          <path d="M 90 48 Q 190 10 290 48" stroke={ARROW_COLOR} strokeWidth="1.2" fill="none" markerEnd="url(#arr-fc)" />
          <text x="190" y="22" textAnchor="middle" className="dia-morph">{morphism}</text>
          {showReverse ? (
            <>
              <path d="M 290 68 Q 190 106 90 68" stroke={ARROW_COLOR} strokeWidth="1.2" fill="none" markerEnd="url(#arr-fc)" />
              <text x="190" y="104" textAnchor="middle" className="dia-morph">reverse</text>
              <text x="190" y="62" textAnchor="middle" className="dia-iso">≅</text>
            </>
          ) : (
            <>
              <path d="M 290 68 Q 190 106 90 68" stroke="#ddd" strokeWidth="1" fill="none" strokeDasharray="4 3" />
              <text x="190" y="100" textAnchor="middle" className="dia-morph" fill="#ccc">✗ one-way</text>
            </>
          )}
        </svg>
      </div>
    )
  }

  return null
}
