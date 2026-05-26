
const STATUS = {
  in_transit:       { label: 'In transit',     dot: 'var(--blue)',   bg: 'var(--blue-dim)',   border: 'var(--blue-border)',   text: '#58a6ff' },
  delivered:        { label: 'Delivered',       dot: 'var(--green)',  bg: 'var(--green-dim)',  border: 'var(--green-border)',  text: 'var(--green)' },
  pending:          { label: 'Pending',         dot: 'var(--text-3)', bg: 'var(--bg-3)',       border: 'var(--border-2)',      text: 'var(--text-3)' },
  info_received:    { label: 'Info received',   dot: 'var(--purple)', bg: 'var(--purple-dim)', border: 'rgba(188,140,255,0.2)', text: 'var(--purple)' },
  out_for_delivery: { label: 'Out for delivery',dot: 'var(--amber)',  bg: 'var(--amber-dim)',  border: 'var(--amber-border)', text: 'var(--amber)' },
  attempt_failed:   { label: 'Attempt failed',  dot: 'var(--red)',    bg: 'var(--red-dim)',    border: 'var(--red-border)',    text: 'var(--red)' },
  exception:        { label: 'Exception',       dot: 'var(--red)',    bg: 'var(--red-dim)',    border: 'var(--red-border)',    text: 'var(--red)' },
  unknown:          { label: 'Unknown',         dot: 'var(--text-4)', bg: 'var(--bg-3)',       border: 'var(--border-2)',      text: 'var(--text-4)' }
}

export default function ShipmentTable({ shipments, onSelect, selected }) {
  if (shipments.length === 0) return (
    <div style={{ border: '1px dashed var(--border-2)', borderRadius: 10, padding: '4rem', textAlign: 'center' }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" strokeWidth="1.5" style={{ margin: '0 auto 12px', display: 'block' }}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
      <p style={{ fontSize: 13, color: 'var(--text-4)' }}>No shipments tracked yet. Add your first one.</p>
    </div>
  )

  const cols = '1.4fr 0.7fr 1fr 1.3fr 1fr 0.8fr 0.85fr'

  return (
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 800 }}>
          <div style={{ display: 'grid', gridTemplateColumns: cols, padding: '10px 18px', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
            {['Tracking no.', 'Carrier', 'Description', 'Route', 'Status', 'ETA', 'Pred. delay'].map(h => (
              <div key={h} style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{h}</div>
            ))}
          </div>
          {shipments.map((s, i) => {
            const st = STATUS[s.status] || STATUS.unknown
            const isSelected = selected?.id === s.id
            const delay = parseFloat(s.predicted_delay_days) || 0
            const delayColor = delay > 3 ? 'var(--red)' : delay > 1 ? 'var(--amber)' : 'var(--green)'
            return (
              <div
                key={s.id}
                onClick={() => onSelect(s)}
                style={{ display: 'grid', gridTemplateColumns: cols, padding: '14px 18px', borderBottom: i < shipments.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'pointer', background: isSelected ? 'rgba(28,110,243,0.06)' : 'transparent', borderLeft: isSelected ? '2px solid var(--blue)' : '2px solid transparent', transition: 'background 0.15s', alignItems: 'center' }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent' }}
              >
                <div style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600, color: 'var(--blue)', letterSpacing: '0.03em' }}>{s.tracking_number}</div>
                <div><span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)', background: 'var(--bg-3)', padding: '2px 7px', borderRadius: 4, letterSpacing: '0.04em' }}>{s.carrier.toUpperCase()}</span></div>
                <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{s.description || '—'}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{s.origin || '—'} <span style={{ color: 'var(--text-4)' }}>→</span> {s.destination || '—'}</div>
                <div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: st.bg, border: '1px solid ' + st.border, color: st.text, padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 500 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: st.dot, flexShrink: 0 }} />
                    {st.label}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
                  {s.eta ? new Date(s.eta).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '—'}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: delayColor, fontFamily: 'var(--mono)' }}>
                  {delay > 0 ? '+' + delay + 'd' : 'On time'}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
