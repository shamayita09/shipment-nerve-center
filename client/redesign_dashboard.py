import os

os.makedirs('components', exist_ok=True)
os.makedirs('pages', exist_ok=True)
os.makedirs('styles', exist_ok=True)

# Global styles
with open('styles/globals.css', 'w') as f:
    f.write("""
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --navy: #0a0f1e;
  --navy-2: #111827;
  --navy-3: #1a2235;
  --navy-4: #243049;
  --accent: #00d4ff;
  --accent-dim: rgba(0,212,255,0.12);
  --accent-border: rgba(0,212,255,0.3);
  --green: #00e5a0;
  --green-dim: rgba(0,229,160,0.1);
  --amber: #ffb020;
  --amber-dim: rgba(255,176,32,0.1);
  --red: #ff4d4d;
  --red-dim: rgba(255,77,77,0.1);
  --text-primary: #f0f4ff;
  --text-secondary: #8896b3;
  --text-muted: #4a5568;
  --border: rgba(255,255,255,0.06);
  --border-accent: rgba(0,212,255,0.2);
  --mono: 'Space Mono', monospace;
  --sans: 'DM Sans', sans-serif;
}

body {
  background: var(--navy);
  color: var(--text-primary);
  font-family: var(--sans);
  min-height: 100vh;
}

.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }
""")
print('Done: globals.css')

# Main page
with open('pages/index.js', 'w') as f:
    f.write("""
import { useEffect, useState } from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import Head from 'next/head'
import ShipmentTable from '../components/ShipmentTable'
import AddShipmentForm from '../components/AddShipmentForm'
import EventTimeline from '../components/EventTimeline'
import StatsBar from '../components/StatsBar'
import '../styles/globals.css'

const socket = io('http://localhost:3001')
const API = 'http://localhost:3001/api'

export default function Home() {
  const [shipments, setShipments] = useState([])
  const [selected, setSelected] = useState(null)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [pulse, setPulse] = useState(false)

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
      setPulse(true)
      setTimeout(() => setPulse(false), 1000)
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
    setAdding(false)
  }

  return (
    <>
      <Head><title>Shipment Nerve Center</title></Head>
      <div style={{ minHeight: '100vh', background: 'var(--navy)' }}>

        <header style={{ borderBottom: '1px solid var(--border)', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 32, height: 32, background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.05em' }}>SHIPMENT NERVE CENTER</p>
              <p style={{ fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.08em' }}>LIVE TRACKING DASHBOARD</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: pulse ? 'var(--amber)' : 'var(--green)', transition: 'background 0.3s', boxShadow: '0 0 8px ' + (pulse ? 'var(--amber)' : 'var(--green)') }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>{pulse ? 'UPDATING' : 'LIVE'}</span>
            </div>
            <button onClick={() => setAdding(true)} style={{ background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', color: 'var(--accent)', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontFamily: 'var(--mono)', cursor: 'pointer', letterSpacing: '0.05em' }}>
              + NEW SHIPMENT
            </button>
          </div>
        </header>

        <main style={{ padding: '2rem', maxWidth: 1400, margin: '0 auto' }}>
          <StatsBar shipments={shipments} />

          {adding && (
            <AddShipmentForm onAdd={handleAdd} onCancel={() => setAdding(false)} />
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)', fontFamily: 'var(--mono)', fontSize: 13, letterSpacing: '0.1em' }}>
              LOADING SHIPMENTS...
            </div>
          ) : (
            <ShipmentTable shipments={shipments} onSelect={handleSelect} selected={selected} />
          )}

          {selected && (
            <EventTimeline shipment={selected} events={events} onClose={() => setSelected(null)} />
          )}
        </main>
      </div>
    </>
  )
}
""")
print('Done: pages/index.js')

# StatsBar
with open('components/StatsBar.js', 'w') as f:
    f.write("""
export default function StatsBar({ shipments }) {
  const total = shipments.length
  const inTransit = shipments.filter(s => s.status === 'in_transit').length
  const delivered = shipments.filter(s => s.status === 'delivered').length
  const delayed = shipments.filter(s => s.predicted_delay_days > 2).length
  const avgDelay = total > 0 ? (shipments.reduce((a, s) => a + (s.predicted_delay_days || 0), 0) / total).toFixed(1) : 0

  const stats = [
    { label: 'TOTAL SHIPMENTS', value: total, color: 'var(--accent)', dim: 'var(--accent-dim)', border: 'var(--accent-border)' },
    { label: 'IN TRANSIT', value: inTransit, color: 'var(--green)', dim: 'var(--green-dim)', border: 'rgba(0,229,160,0.2)' },
    { label: 'DELIVERED', value: delivered, color: 'var(--text-secondary)', dim: 'rgba(136,150,179,0.1)', border: 'rgba(136,150,179,0.2)' },
    { label: 'AT RISK', value: delayed, color: 'var(--amber)', dim: 'var(--amber-dim)', border: 'rgba(255,176,32,0.2)' },
    { label: 'AVG DELAY', value: avgDelay + 'd', color: delayed > 0 ? 'var(--red)' : 'var(--green)', dim: delayed > 0 ? 'var(--red-dim)' : 'var(--green-dim)', border: delayed > 0 ? 'rgba(255,77,77,0.2)' : 'rgba(0,229,160,0.2)' },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: '2rem' }}>
      {stats.map(s => (
        <div key={s.label} style={{ background: s.dim, border: '1px solid ' + s.border, borderRadius: 12, padding: '1rem 1.25rem' }}>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-secondary)', letterSpacing: '0.1em', marginBottom: 8 }}>{s.label}</p>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 28, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</p>
        </div>
      ))}
    </div>
  )
}
""")
print('Done: StatsBar.js')

# ShipmentTable
with open('components/ShipmentTable.js', 'w') as f:
    f.write("""
const STATUS = {
  in_transit:       { label: 'IN TRANSIT',    color: 'var(--accent)',  dim: 'var(--accent-dim)' },
  delivered:        { label: 'DELIVERED',      color: 'var(--green)',   dim: 'var(--green-dim)' },
  pending:          { label: 'PENDING',         color: 'var(--text-secondary)', dim: 'rgba(136,150,179,0.1)' },
  info_received:    { label: 'INFO RECEIVED',   color: '#a78bfa',       dim: 'rgba(167,139,250,0.1)' },
  out_for_delivery: { label: 'OUT FOR DEL.',    color: 'var(--amber)',   dim: 'var(--amber-dim)' },
  attempt_failed:   { label: 'FAILED',          color: 'var(--red)',     dim: 'var(--red-dim)' },
  exception:        { label: 'EXCEPTION',       color: 'var(--red)',     dim: 'var(--red-dim)' },
  unknown:          { label: 'UNKNOWN',         color: 'var(--text-muted)', dim: 'rgba(74,85,104,0.2)' }
}

export default function ShipmentTable({ shipments, onSelect, selected }) {
  if (shipments.length === 0) {
    return (
      <div style={{ border: '1px dashed rgba(255,255,255,0.08)', borderRadius: 12, padding: '4rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>NO SHIPMENTS TRACKED — ADD YOUR FIRST ONE</p>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--navy-2)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: '1.5rem' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--navy-3)' }}>
              {['TRACKING #', 'CARRIER', 'DESCRIPTION', 'ROUTE', 'STATUS', 'ETA', 'PRED. DELAY'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', fontWeight: 400, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shipments.map((s, i) => {
              const st = STATUS[s.status] || STATUS.unknown
              const isSelected = selected?.id === s.id
              const delay = s.predicted_delay_days || 0
              const delayColor = delay > 3 ? 'var(--red)' : delay > 1 ? 'var(--amber)' : 'var(--green)'
              return (
                <tr
                  key={s.id}
                  onClick={() => onSelect(s)}
                  style={{
                    borderBottom: i < shipments.length - 1 ? '1px solid var(--border)' : 'none',
                    cursor: 'pointer',
                    background: isSelected ? 'var(--navy-4)' : 'transparent',
                    transition: 'background 0.15s'
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'var(--navy-3)' }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent' }}
                >
                  <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--accent)', letterSpacing: '0.05em' }}>{s.tracking_number}</td>
                  <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-secondary)', letterSpacing: '0.08em' }}>{s.carrier.toUpperCase()}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-primary)' }}>{s.description || '—'}</td>
                  <td style={{ padding: '14px 16px', fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                    {s.origin || '—'} <span style={{ color: 'var(--text-muted)' }}>→</span> {s.destination || '—'}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ background: st.dim, color: st.color, border: '1px solid ' + st.color.replace(')', ', 0.3)').replace('var(', 'rgba(').replace('--accent', '0,212,255').replace('--green', '0,229,160').replace('--amber', '255,176,32').replace('--red', '255,77,77').replace('--text-secondary', '136,150,179').replace('--text-muted', '74,85,104').replace('a78bfa', '167,139,250'), padding: '3px 10px', borderRadius: 6, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                      {st.label}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                    {s.eta ? new Date(s.eta).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                  </td>
                  <td style={{ padding: '14px 16px', fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 700, color: delayColor }}>
                    {delay > 0 ? '+' + delay + 'd' : 'ON TIME'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
""")
print('Done: ShipmentTable.js')

# AddShipmentForm
with open('components/AddShipmentForm.js', 'w') as f:
    f.write("""
import { useState } from 'react'

const CARRIERS = ['dhl', 'fedex', 'ups', 'maersk', 'msc', 'cma_cgm', 'other']

const inp = {
  width: '100%',
  background: 'var(--navy)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 8,
  padding: '10px 14px',
  color: 'var(--text-primary)',
  fontSize: 13,
  fontFamily: 'var(--sans)',
  outline: 'none'
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
    <div style={{ background: 'var(--navy-2)', border: '1px solid var(--accent-border)', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em' }}>NEW SHIPMENT</p>
        <button onClick={onCancel} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 20, lineHeight: 1 }}>×</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 16 }}>
        <div>
          <label style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-secondary)', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>TRACKING NUMBER *</label>
          <input style={inp} value={form.tracking_number} onChange={e => setForm({...form, tracking_number: e.target.value})} placeholder="e.g. MSKU1234567" />
        </div>
        <div>
          <label style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-secondary)', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>CARRIER *</label>
          <select style={{...inp}} value={form.carrier} onChange={e => setForm({...form, carrier: e.target.value})}>
            {CARRIERS.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-secondary)', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>DESCRIPTION</label>
          <input style={inp} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="e.g. Electronics batch" />
        </div>
        <div>
          <label style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-secondary)', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>ORIGIN</label>
          <input style={inp} value={form.origin} onChange={e => setForm({...form, origin: e.target.value})} placeholder="e.g. Shanghai, CN" />
        </div>
        <div>
          <label style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-secondary)', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>DESTINATION</label>
          <input style={inp} value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} placeholder="e.g. Mumbai, IN" />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={handleSubmit} disabled={loading} style={{ background: 'var(--accent)', color: 'var(--navy)', border: 'none', padding: '10px 24px', borderRadius: 8, fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em' }}>
          {loading ? 'ADDING...' : 'ADD SHIPMENT'}
        </button>
        <button onClick={onCancel} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', padding: '10px 20px', borderRadius: 8, fontFamily: 'var(--mono)', fontSize: 12, cursor: 'pointer', letterSpacing: '0.05em' }}>
          CANCEL
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
  const delay = shipment.predicted_delay_days || 0
  const delayColor = delay > 3 ? 'var(--red)' : delay > 1 ? 'var(--amber)' : 'var(--green)'

  return (
    <div style={{ background: 'var(--navy-2)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.5rem', marginTop: '0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 6 }}>SHIPMENT HISTORY</p>
          <p style={{ fontFamily: 'var(--mono)', fontSize: 16, color: 'var(--accent)', letterSpacing: '0.05em', marginBottom: 4 }}>{shipment.tracking_number}</p>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{shipment.carrier.toUpperCase()} · {shipment.origin} → {shipment.destination}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {delay > 0 && (
            <div style={{ background: delay > 2 ? 'var(--amber-dim)' : 'var(--green-dim)', border: '1px solid ' + (delay > 2 ? 'rgba(255,176,32,0.3)' : 'rgba(0,229,160,0.3)'), borderRadius: 8, padding: '8px 16px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-secondary)', letterSpacing: '0.08em', marginBottom: 4 }}>PREDICTED DELAY</p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 20, fontWeight: 700, color: delayColor }}>+{delay}d</p>
            </div>
          )}
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 22, lineHeight: 1 }}>×</button>
        </div>
      </div>

      {events.length === 0 ? (
        <p style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>NO EVENTS RECORDED</p>
      ) : (
        <div style={{ position: 'relative', paddingLeft: 24 }}>
          <div style={{ position: 'absolute', left: 5, top: 8, bottom: 8, width: 1, background: 'var(--border)' }} />
          {events.map((e, i) => (
            <div key={e.id} style={{ position: 'relative', marginBottom: 24 }}>
              <div style={{ position: 'absolute', left: -19, top: 4, width: 9, height: 9, borderRadius: '50%', background: i === 0 ? 'var(--accent)' : 'var(--navy-4)', border: '1px solid ' + (i === 0 ? 'var(--accent)' : 'rgba(255,255,255,0.15)'), boxShadow: i === 0 ? '0 0 8px var(--accent)' : 'none' }} />
              <p style={{ fontSize: 13, color: 'var(--text-primary)', marginBottom: 4 }}>{e.raw_status}</p>
              <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                {e.location} · {new Date(e.carrier_timestamp).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
""")
print('Done: EventTimeline.js')
print('All files written! Dashboard redesigned.')