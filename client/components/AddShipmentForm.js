
import { useState } from 'react'

const CARRIERS = ['dhl', 'fedex', 'ups', 'maersk', 'msc', 'cma_cgm', 'other']

const inp = {
  width: '100%',
  background: 'var(--bg)',
  border: '1px solid var(--border-2)',
  borderRadius: 7,
  padding: '9px 12px',
  color: 'var(--text-1)',
  fontSize: 13,
  fontFamily: 'var(--sans)',
  outline: 'none',
  transition: 'border-color 0.15s'
}

export default function AddShipmentForm({ onAdd, onCancel }) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ tracking_number: '', carrier: 'dhl', description: '', origin: '', destination: '' })

  const handleSubmit = async () => {
    if (!form.tracking_number) return
    setLoading(true)
    await onAdd(form)
    setLoading(false)
  }

  return (
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--blue-border)', borderRadius: 10, padding: '20px 22px', marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)' }} />
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>New shipment</p>
        </div>
        <button onClick={onCancel} style={{ background: 'none', border: 'none', color: 'var(--text-3)', cursor: 'pointer', fontSize: 20, lineHeight: 1, padding: 4 }}>×</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))', gap: 12, marginBottom: 16 }}>
        {[
          { key: 'tracking_number', label: 'Tracking number *', placeholder: 'e.g. MSKU1234567' },
          { key: 'description', label: 'Description', placeholder: 'e.g. Electronics batch' },
          { key: 'origin', label: 'Origin', placeholder: 'e.g. Shanghai, CN' },
          { key: 'destination', label: 'Destination', placeholder: 'e.g. Mumbai, IN' }
        ].map(field => (
          <div key={field.key}>
            <label style={{ fontSize: 11, color: 'var(--text-3)', display: 'block', marginBottom: 5, fontWeight: 500 }}>{field.label}</label>
            <input style={inp} value={form[field.key]} onChange={e => setForm({...form, [field.key]: e.target.value})} placeholder={field.placeholder} />
          </div>
        ))}
        <div>
          <label style={{ fontSize: 11, color: 'var(--text-3)', display: 'block', marginBottom: 5, fontWeight: 500 }}>Carrier *</label>
          <select style={{...inp}} value={form.carrier} onChange={e => setForm({...form, carrier: e.target.value})}>
            {CARRIERS.map(c => <option key={c} value={c} style={{ background: 'var(--bg-2)' }}>{c.toUpperCase()}</option>)}
          </select>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ background: 'var(--blue)', color: 'white', border: 'none', padding: '9px 22px', borderRadius: 7, fontSize: 13, fontWeight: 500, cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Adding...' : 'Add shipment'}
        </button>
        <button
          onClick={onCancel}
          style={{ background: 'transparent', border: '1px solid var(--border-2)', color: 'var(--text-2)', padding: '9px 18px', borderRadius: 7, fontSize: 13, cursor: 'pointer' }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
