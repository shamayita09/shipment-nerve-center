with open('components/ShipmentTable.js', 'w') as f:
    f.write("""
const STATUS_COLORS = {
  in_transit: { bg: '#dbeafe', color: '#1d4ed8' },
  delivered: { bg: '#dcfce7', color: '#15803d' },
  pending: { bg: '#f3f4f6', color: '#374151' },
  info_received: { bg: '#ede9fe', color: '#6d28d9' },
  out_for_delivery: { bg: '#fef9c3', color: '#a16207' },
  attempt_failed: { bg: '#fee2e2', color: '#dc2626' },
  exception: { bg: '#fee2e2', color: '#dc2626' },
  unknown: { bg: '#f3f4f6', color: '#374151' }
}

export default function ShipmentTable({ shipments, onSelect, selected }) {
  if (shipments.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', background: '#f9fafb', borderRadius: 12, border: '1px dashed #e5e7eb' }}>
        <p style={{ color: '#9ca3af', margin: 0 }}>No shipments yet. Add one above.</p>
      </div>
    )
  }
  return (
    <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
            {['Tracking #', 'Carrier', 'Description', 'Origin', 'Destination', 'Status', 'ETA', 'Predicted Delay'].map(h => (
              <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#6b7280', fontWeight: 500 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shipments.map(s => {
            const style = STATUS_COLORS[s.status] || STATUS_COLORS.unknown
            const isSelected = selected?.id === s.id
            const delay = s.predicted_delay_days
            const delayColor = delay > 3 ? '#dc2626' : delay > 1 ? '#d97706' : '#16a34a'
            return (
              <tr key={s.id} onClick={() => onSelect(s)} style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer', background: isSelected ? '#f0f9ff' : 'white' }}>
                <td style={{ padding: '12px', fontWeight: 500 }}>{s.tracking_number}</td>
                <td style={{ padding: '12px', textTransform: 'uppercase', fontSize: 12, fontWeight: 600 }}>{s.carrier}</td>
                <td style={{ padding: '12px' }}>{s.description || '-'}</td>
                <td style={{ padding: '12px' }}>{s.origin || '-'}</td>
                <td style={{ padding: '12px' }}>{s.destination || '-'}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ background: style.bg, color: style.color, padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 500 }}>
                    {s.status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>{s.eta ? new Date(s.eta).toLocaleDateString() : '-'}</td>
                <td style={{ padding: '12px', fontWeight: 500, color: delayColor }}>
                  {delay > 0 ? '+' + delay + ' days' : 'On time'}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
""")
print('Done: ShipmentTable.js updated')