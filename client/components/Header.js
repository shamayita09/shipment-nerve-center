
export default function Header({ pulse, onAdd }) {
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <header style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', padding: '0 24px', height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 36, height: 36, background: 'var(--blue)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
        </div>
        <div>
          <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-1)', letterSpacing: '-0.3px', lineHeight: 1.2 }}>Shipment Nerve Center</p>
          <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>Global Trade Operations</p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{today}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: pulse ? 'var(--amber-dim)' : 'var(--green-dim)', border: '1px solid ' + (pulse ? 'var(--amber-border)' : 'var(--green-border)'), borderRadius: 20, padding: '5px 12px', transition: 'all 0.4s' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: pulse ? 'var(--amber)' : 'var(--green)', transition: 'background 0.4s' }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: pulse ? 'var(--amber)' : 'var(--green)', letterSpacing: '0.05em', transition: 'color 0.4s' }}>{pulse ? 'UPDATING' : 'LIVE'}</span>
        </div>
        <button
          onClick={onAdd}
          style={{ background: 'var(--blue)', color: 'white', border: 'none', padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Track Shipment
        </button>
      </div>
    </header>
  )
}
