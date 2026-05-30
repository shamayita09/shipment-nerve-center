
const STATUS = {
  in_transit:       { label: 'In transit',      dot: '#58a6ff', bg: '#0d2137', border: 'rgba(28,110,243,0.25)',  text: '#58a6ff' },
  delivered:        { label: 'Delivered',        dot: '#3fb950', bg: '#0d2a1a', border: 'rgba(63,185,80,0.25)',   text: '#3fb950' },
  pending:          { label: 'Pending',          dot: '#8b949e', bg: '#21262d', border: 'rgba(139,148,158,0.25)', text: '#8b949e' },
  info_received:    { label: 'Info received',    dot: '#bc8cff', bg: '#1a0d2e', border: 'rgba(188,140,255,0.2)',  text: '#bc8cff' },
  out_for_delivery: { label: 'Out for delivery', dot: '#d29922', bg: '#2a1f0d', border: 'rgba(210,153,34,0.25)',  text: '#d29922' },
  attempt_failed:   { label: 'Attempt failed',   dot: '#f85149', bg: '#1a0d0d', border: 'rgba(248,81,73,0.25)',   text: '#f85149' },
  exception:        { label: 'Exception',        dot: '#f85149', bg: '#1a0d0d', border: 'rgba(248,81,73,0.25)',   text: '#f85149' },
  unknown:          { label: 'Unknown',          dot: '#484f58', bg: '#21262d', border: 'rgba(72,79,88,0.25)',    text: '#484f58' }
}

export default function ShipmentTable({ shipments, onSelect, selected, onEdit, onDelete }) {
  if (shipments.length === 0) return (
    <div style={{ border: '1px dashed rgba(255,255,255,0.08)', borderRadius: 10, padding: '4rem', textAlign: 'center' }}>
      <p style={{ fontSize: 13, color: '#484f58', margin: 0 }}>No shipments tracked yet. Add your first one.</p>
    </div>
  )

  const cols = '1.3fr 0.7fr 1fr 1.2fr 0.9fr 0.7fr 0.8fr 80px'

  return (
    <div style={{ background: '#161b22', border: '1px solid #21262d', borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 900 }}>
          <div style={{ display: 'grid', gridTemplateColumns: cols, padding: '10px 18px', borderBottom: '1px solid #21262d', background: '#0d1117' }}>
            {['Tracking no.', 'Carrier', 'Description', 'Route', 'Status', 'ETA', 'Pred. delay', 'Actions'].map(h => (
              <div key={h} style={{ fontSize: 11, color: '#8b949e', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{h}</div>
            ))}
          </div>
          {shipments.map((s, i) => {
            const st = STATUS[s.status] || STATUS.unknown
            const isSelected = selected?.id === s.id
            const delay = parseFloat(s.predicted_delay_days) || 0
            const delayColor = delay > 3 ? '#f85149' : delay > 1 ? '#d29922' : '#3fb950'
            return (
              <div key={s.id}
                style={{ display: 'grid', gridTemplateColumns: cols, padding: '13px 18px', borderBottom: i < shipments.length - 1 ? '1px solid #21262d' : 'none', background: isSelected ? 'rgba(28,110,243,0.06)' : 'transparent', borderLeft: isSelected ? '2px solid #1c6ef3' : '2px solid transparent', alignItems: 'center' }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent' }}
              >
                <div onClick={() => onSelect(s)} style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 600, color: '#1c6ef3', cursor: 'pointer' }}>{s.tracking_number}</div>
                <div><span style={{ fontSize: 10, fontWeight: 600, color: '#8b949e', background: '#21262d', padding: '2px 7px', borderRadius: 4 }}>{s.carrier.toUpperCase()}</span></div>
                <div onClick={() => onSelect(s)} style={{ fontSize: 13, color: '#c9d1d9', cursor: 'pointer' }}>{s.description || '—'}</div>
                <div style={{ fontSize: 12, color: '#8b949e' }}>{s.origin || '—'} <span style={{ color: '#484f58' }}>to</span> {s.destination || '—'}</div>
                <div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: st.bg, border: '1px solid ' + st.border, color: st.text, padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 500 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: st.dot, flexShrink: 0 }} />{st.label}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: '#8b949e', fontFamily: 'monospace' }}>
                  {s.eta ? new Date(s.eta).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '—'}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: delayColor, fontFamily: 'monospace' }}>
                  {delay > 0 ? '+' + delay + 'd' : 'On time'}
                </div>
                <div style={{ display: 'flex', gap: 5 }}>
                  <button onClick={() => onEdit(s)} title="Edit"
                    style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #30363d', background: 'transparent', color: '#8b949e', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    ✎
                  </button>
                  <button onClick={() => onDelete(s)} title="Delete"
                    style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid rgba(248,81,73,0.3)', background: 'transparent', color: '#f85149', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    ✕
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
