import os

os.makedirs('components', exist_ok=True)
os.makedirs('pages', exist_ok=True)

# ShipmentTable
with open('components/ShipmentTable.js', 'w') as f:
    f.write(open('../write_components.js').read() if False else """
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
            {['Tracking #', 'Carrier', 'Description', 'Origin', 'Destination', 'Status', 'ETA'].map(h => (
              <th key={h} style={{ padding: '10px 12px', textAlign: 'left', color: '#6b7280', fontWeight: 500 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shipments.map(s => {
            const style = STATUS_COLORS[s.status] || STATUS_COLORS.unknown
            const isSelected = selected?.id === s.id
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
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
""")
print('Done: ShipmentTable.js')

# AddShipmentForm
with open('components/AddShipmentForm.js', 'w') as f:
    f.write("""
import { useState } from 'react'

const CARRIERS = ['dhl', 'fedex', 'ups', 'maersk', 'msc', 'other']

export default function AddShipmentForm({ onAdd }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    tracking_number: '', carrier: 'dhl', description: '', origin: '', destination: ''
  })

  const handleSubmit = async () => {
    if (!form.tracking_number) return
    setLoading(true)
    await onAdd(form)
    setForm({ tracking_number: '', carrier: 'dhl', description: '', origin: '', destination: '' })
    setLoading(false)
    setOpen(false)
  }

  const inp = {
    width: '100%', padding: '8px 12px', border: '1px solid #e5e7eb',
    borderRadius: 8, fontSize: 14, outline: 'none', boxSizing: 'border-box'
  }

  if (!open) return (
    <button onClick={() => setOpen(true)} style={{ marginBottom: '1.5rem', padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
      + Add Shipment
    </button>
  )

  return (
    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
      <h3 style={{ margin: '0 0 1rem', fontSize: 16, fontWeight: 600 }}>Add New Shipment</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 12 }}>
        <div>
          <label style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 4 }}>Tracking Number *</label>
          <input style={inp} value={form.tracking_number} onChange={e => setForm({...form, tracking_number: e.target.value})} placeholder="e.g. TEST123456" />
        </div>
        <div>
          <label style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 4 }}>Carrier *</label>
          <select style={inp} value={form.carrier} onChange={e => setForm({...form, carrier: e.target.value})}>
            {CARRIERS.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 4 }}>Description</label>
          <input style={inp} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="e.g. Electronics batch" />
        </div>
        <div>
          <label style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 4 }}>Origin</label>
          <input style={inp} value={form.origin} onChange={e => setForm({...form, origin: e.target.value})} placeholder="e.g. Shanghai, CN" />
        </div>
        <div>
          <label style={{ fontSize: 12, color: '#6b7280', display: 'block', marginBottom: 4 }}>Destination</label>
          <input style={inp} value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} placeholder="e.g. Mumbai, IN" />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={handleSubmit} disabled={loading} style={{ padding: '8px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>
          {loading ? 'Adding...' : 'Add Shipment'}
        </button>
        <button onClick={() => setOpen(false)} style={{ padding: '8px 16px', background: 'white', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 14, cursor: 'pointer' }}>
          Cancel
        </button>
      </div>
    </div>
  )
}
""")
print('Done: AddShipmentForm.js')

# EventTimeline
with open('components/EventTimeline.js', 'w') as f:
    f.write("""
export default function EventTimeline({ shipment, events, onClose }) {
  return (
    <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 12, padding: '1.5rem', marginTop: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{shipment.tracking_number}</h3>
          <p style={{ margin: 0, color: '#6b7280', fontSize: 13 }}>{shipment.carrier.toUpperCase()} — {shipment.origin} to {shipment.destination}</p>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#9ca3af' }}>x</button>
      </div>
      {events.length === 0 ? (
        <p style={{ color: '#9ca3af', fontSize: 14 }}>No events yet.</p>
      ) : (
        <div>
          {events.map((e, i) => (
            <div key={e.id} style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: i === 0 ? '#2563eb' : '#d1d5db', flexShrink: 0, marginTop: 3 }} />
                {i < events.length - 1 && <div style={{ width: 2, flex: 1, background: '#e5e7eb', marginTop: 4 }} />}
              </div>
              <div style={{ paddingBottom: 8 }}>
                <p style={{ margin: 0, fontWeight: 500, fontSize: 14 }}>{e.raw_status}</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: '#6b7280' }}>{e.location} · {new Date(e.carrier_timestamp).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
""")
print('Done: EventTimeline.js')

# Main page
with open('pages/index.js', 'w') as f:
    f.write("""
import { useEffect, useState } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import ShipmentTable from '../components/ShipmentTable'
import AddShipmentForm from '../components/AddShipmentForm'
import EventTimeline from '../components/EventTimeline'

const socket = io('http://localhost:3001')
const API = 'http://localhost:3001/api'

export default function Home() {
  const [shipments, setShipments] = useState([])
  const [selected, setSelected] = useState(null)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchShipments = async () => {
    const res = await axios.get(API + '/shipments')
    setShipments(res.data.shipments)
    setLoading(false)
  }

  const fetchEvents = async (id) => {
    const res = await axios.get(API + '/shipments/' + id + '/events')
    setEvents(res.data.events)
  }

  useEffect(() => {
    fetchShipments()
    socket.on('shipment_updated', (data) => {
      setShipments(prev => prev.map(s => s.id === data.id ? { ...s, status: data.status } : s))
    })
    return () => socket.off('shipment_updated')
  }, [])

  const handleSelect = (shipment) => {
    setSelected(shipment)
    fetchEvents(shipment.id)
  }

  const handleAdd = async (form) => {
    await axios.post(API + '/shipments', form)
    fetchShipments()
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 1100, margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>Shipment Nerve Center</h1>
          <p style={{ margin: 0, color: '#666', fontSize: 14 }}>Live tracking dashboard</p>
        </div>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px #dcfce7' }} />
      </div>
      <AddShipmentForm onAdd={handleAdd} />
      {loading ? (
        <p style={{ color: '#666' }}>Loading shipments...</p>
      ) : (
        <ShipmentTable shipments={shipments} onSelect={handleSelect} selected={selected} />
      )}
      {selected && (
        <EventTimeline shipment={selected} events={events} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
""")
print('Done: pages/index.js')

print('All files written successfully!')