
import { useState, useEffect } from 'react'

const CARRIERS = ['dhl', 'fedex', 'ups', 'maersk', 'msc', 'cma_cgm', 'other']
const STATUSES = ['pending', 'info_received', 'in_transit', 'out_for_delivery', 'delivered', 'attempt_failed', 'exception']

const inp = {
  width: '100%', background: '#0d1117', border: '1px solid #30363d',
  borderRadius: 7, padding: '9px 12px', color: '#f0f6fc',
  fontSize: 13, fontFamily: 'sans-serif', outline: 'none'
}

export default function EditShipmentModal({ shipment, onSave, onClose }) {
  const [form, setForm] = useState({ description: '', origin: '', destination: '', carrier: 'dhl', status: 'in_transit' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (shipment) setForm({
      description: shipment.description || '',
      origin: shipment.origin || '',
      destination: shipment.destination || '',
      carrier: shipment.carrier || 'dhl',
      status: shipment.status || 'in_transit'
    })
  }, [shipment])

  const handleSave = async () => {
    setLoading(true)
    await onSave(shipment.id, form)
    setLoading(false)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 12, padding: '1.5rem', width: '90%', maxWidth: 520 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: '#f0f6fc', margin: 0 }}>Edit shipment</p>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer', fontSize: 22 }}>x</button>
        </div>
        <p style={{ fontSize: 11, color: '#58a6ff', fontFamily: 'monospace', marginBottom: 16 }}>{shipment.tracking_number}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ fontSize: 11, color: '#8b949e', display: 'block', marginBottom: 5 }}>Description</label>
            <input style={inp} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="e.g. Electronics batch" />
          </div>
          <div>
            <label style={{ fontSize: 11, color: '#8b949e', display: 'block', marginBottom: 5 }}>Origin</label>
            <input style={inp} value={form.origin} onChange={e => setForm({...form, origin: e.target.value})} placeholder="e.g. Shanghai, CN" />
          </div>
          <div>
            <label style={{ fontSize: 11, color: '#8b949e', display: 'block', marginBottom: 5 }}>Destination</label>
            <input style={inp} value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} placeholder="e.g. Mumbai, IN" />
          </div>
          <div>
            <label style={{ fontSize: 11, color: '#8b949e', display: 'block', marginBottom: 5 }}>Carrier</label>
            <select style={inp} value={form.carrier} onChange={e => setForm({...form, carrier: e.target.value})}>
              {CARRIERS.map(c => <option key={c} value={c} style={{ background: '#161b22' }}>{c.toUpperCase()}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, color: '#8b949e', display: 'block', marginBottom: 5 }}>Status</label>
            <select style={inp} value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
              {STATUSES.map(s => <option key={s} value={s} style={{ background: '#161b22' }}>{s.replace(/_/g, ' ')}</option>)}
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ background: 'transparent', border: '1px solid #30363d', color: '#c9d1d9', padding: '8px 16px', borderRadius: 7, fontSize: 13, cursor: 'pointer' }}>Cancel</button>
          <button onClick={handleSave} disabled={loading} style={{ background: '#1c6ef3', color: 'white', border: 'none', padding: '8px 20px', borderRadius: 7, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            {loading ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
