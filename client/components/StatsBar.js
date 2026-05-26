
const Stat = ({ label, value, color, dimBg, icon }) => (
  <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
    <div style={{ width: 30, height: 30, background: dimBg, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
      {icon}
    </div>
    <p style={{ fontSize: 26, fontWeight: 700, color: color || 'var(--text-1)', lineHeight: 1, marginBottom: 5, fontFamily: 'var(--mono)' }}>{value}</p>
    <p style={{ fontSize: 12, color: 'var(--text-3)' }}>{label}</p>
  </div>
)

export default function StatsBar({ shipments }) {
  const total = shipments.length
  const inTransit = shipments.filter(s => s.status === 'in_transit').length
  const delivered = shipments.filter(s => s.status === 'delivered').length
  const atRisk = shipments.filter(s => s.predicted_delay_days > 2).length
  const avgDelay = total > 0 ? (shipments.reduce((a, s) => a + (s.predicted_delay_days || 0), 0) / total).toFixed(1) : '0.0'

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 28 }}>
      <Stat label="Total shipments" value={total} color="var(--text-1)" dimBg="var(--blue-dim)"
        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#58a6ff" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>} />
      <Stat label="In transit" value={inTransit} color="var(--green)" dimBg="var(--green-dim)"
        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3fb950" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>} />
      <Stat label="Delivered" value={delivered} color="var(--text-2)" dimBg="var(--bg-3)"
        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>} />
      <Stat label="At risk" value={atRisk} color={atRisk > 0 ? 'var(--amber)' : 'var(--text-2)'} dimBg={atRisk > 0 ? 'var(--amber-dim)' : 'var(--bg-3)'}
        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={atRisk > 0 ? '#d29922' : '#8b949e'} strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>} />
      <Stat label="Avg delay" value={avgDelay + 'd'} color={parseFloat(avgDelay) > 1 ? 'var(--red)' : 'var(--green)'} dimBg={parseFloat(avgDelay) > 1 ? 'var(--red-dim)' : 'var(--green-dim)'}
        icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={parseFloat(avgDelay) > 1 ? '#f85149' : '#3fb950'} strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>} />
    </div>
  )
}
