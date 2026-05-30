import dynamic from 'next/dynamic'
const RouteMap = dynamic(() => import('./RouteMap'), { ssr: false })
export default function EventTimeline({ shipment, events, onClose }) {
  const delay = parseFloat(shipment.predicted_delay_days) || 0
  const delayColor = delay > 3 ? 'var(--red)' : delay > 1 ? 'var(--amber)' : 'var(--green)'
  const delayDimBg = delay > 3 ? 'var(--red-dim)' : delay > 1 ? 'var(--amber-dim)' : 'var(--green-dim)'
  const delayBorder = delay > 3 ? 'var(--red-border)' : delay > 1 ? 'var(--amber-border)' : 'var(--green-border)'

  return (
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 22px', marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <p style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>Shipment history</p>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 15, fontWeight: 600, color: 'var(--blue)', marginBottom: 4 }}>{shipment.tracking_number}</p>
          <p style={{ fontSize: 13, color: 'var(--text-3)' }}>{shipment.carrier.toUpperCase()} · {shipment.origin || '—'} → {shipment.destination || '—'}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ background: delayDimBg, border: '1px solid ' + delayBorder, borderRadius: 8, padding: '10px 18px', textAlign: 'center' }}>
            <p style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>Predicted delay</p>
            <p style={{ fontFamily: 'var(--mono)', fontSize: 20, fontWeight: 700, color: delayColor }}>{delay > 0 ? '+' + delay + 'd' : 'On time'}</p>
          </div>
          <button onClick={onClose} style={{ background: 'var(--bg-3)', border: '1px solid var(--border-2)', color: 'var(--text-3)', cursor: 'pointer', width: 32, height: 32, borderRadius: 7, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>
      </div>
<RouteMap shipment={shipment} events={events} />
      {events.length === 0 ? (
        <p style={{ fontSize: 13, color: 'var(--text-4)' }}>No events recorded yet.</p>
      ) : (
        <div style={{ paddingLeft: 22, position: 'relative' }}>
          <div style={{ position: 'absolute', left: 5, top: 8, bottom: 8, width: 1, background: 'var(--border-2)' }} />
          {events.map((e, i) => (
            <div key={e.id} style={{ position: 'relative', marginBottom: 22 }}>
              <div style={{ position: 'absolute', left: -17, top: 4, width: 9, height: 9, borderRadius: '50%', background: i === 0 ? 'var(--blue)' : 'var(--bg-4)', border: '1.5px solid ' + (i === 0 ? 'var(--blue)' : 'var(--border-2)') }} />
              <p style={{ fontSize: 13, color: i === 0 ? 'var(--text-1)' : 'var(--text-2)', fontWeight: i === 0 ? 500 : 400, marginBottom: 3 }}>{e.raw_status}</p>
              <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
                {e.location} · {new Date(e.carrier_timestamp).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
