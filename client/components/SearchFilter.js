import { useState } from 'react'

const STATUSES = ['all', 'in_transit', 'delivered', 'pending', 'out_for_delivery', 'attempt_failed', 'exception']
const CARRIERS = ['all', 'dhl', 'fedex', 'ups', 'maersk', 'msc', 'cma_cgm']

export default function SearchFilter({ shipments, onFilter }) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [carrier, setCarrier] = useState('all')

  const apply = (s, st, c) => {
    let result = [...shipments]
    if (s) result = result.filter(x =>
  x.tracking_number.toLowerCase().includes(s.toLowerCase()) ||
  (x.description && x.description.toLowerCase().includes(s.toLowerCase())) ||
  (x.origin && x.origin.toLowerCase().includes(s.toLowerCase())) ||
  (x.destination && x.destination.toLowerCase().includes(s.toLowerCase())) ||
  (x.carrier && x.carrier.toLowerCase().includes(s.toLowerCase()))
)
    if (st !== 'all') result = result.filter(x => x.status === st)
    if (c !== 'all') result = result.filter(x => x.carrier === c)
    onFilter(result)
  }

  const handleSearch = (val) => { setSearch(val); apply(val, status, carrier) }
  const handleStatus = (val) => { setStatus(val); apply(search, val, carrier) }
  const handleCarrier = (val) => { setCarrier(val); apply(search, status, val) }

  const handleReset = () => {
    setSearch(''); setStatus('all'); setCarrier('all')
    onFilter(shipments)
  }

  const sel = {
    background: 'var(--bg)',
    border: '1px solid var(--border-2)',
    borderRadius: 7,
    padding: '8px 12px',
    color: 'var(--text-2)',
    fontSize: 12,
    fontFamily: 'var(--sans)',
    outline: 'none',
    cursor: 'pointer'
  }

  const hasFilter = search || status !== 'all' || carrier !== 'all'

  return (
    <div style={{ display: 'flex', gap: 10, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ position: 'relative', flex: '1 1 220px' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" strokeWidth="2" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          value={search}
          onChange={e => handleSearch(e.target.value)}
          placeholder="Search tracking no., description, route..."
          style={{ ...sel, width: '100%', paddingLeft: 30 }}
        />
      </div>

      <select value={status} onChange={e => handleStatus(e.target.value)} style={sel}>
        {STATUSES.map(s => (
          <option key={s} value={s} style={{ background: 'var(--bg-2)' }}>
            {s === 'all' ? 'All statuses' : s.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </option>
        ))}
      </select>

      <select value={carrier} onChange={e => handleCarrier(e.target.value)} style={sel}>
        {CARRIERS.map(c => (
          <option key={c} value={c} style={{ background: 'var(--bg-2)' }}>
            {c === 'all' ? 'All carriers' : c.toUpperCase()}
          </option>
        ))}
      </select>

      {hasFilter && (
        <button
          onClick={handleReset}
          style={{ background: 'transparent', border: '1px solid var(--border-2)', color: 'var(--text-3)', padding: '8px 14px', borderRadius: 7, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          Clear filters
        </button>
      )}
    </div>
  )
}