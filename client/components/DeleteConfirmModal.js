
export default function DeleteConfirmModal({ shipment, onConfirm, onClose }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 12, padding: '1.5rem', width: '90%', maxWidth: 400 }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: '#f0f6fc', margin: '0 0 8px' }}>Delete shipment?</p>
        <p style={{ fontSize: 13, color: '#8b949e', margin: '0 0 6px' }}>This will permanently delete:</p>
        <p style={{ fontFamily: 'monospace', fontSize: 13, color: '#f85149', margin: '0 0 8px' }}>{shipment.tracking_number}</p>
        <p style={{ fontSize: 12, color: '#484f58', margin: '0 0 20px' }}>All events and history will also be deleted. This cannot be undone.</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ background: 'transparent', border: '1px solid #30363d', color: '#c9d1d9', padding: '8px 16px', borderRadius: 7, fontSize: 13, cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => onConfirm(shipment.id)} style={{ background: '#f85149', color: 'white', border: 'none', padding: '8px 20px', borderRadius: 7, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Delete</button>
        </div>
      </div>
    </div>
  )
}
