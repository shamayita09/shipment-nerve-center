import os

os.makedirs('components', exist_ok=True)
os.makedirs('styles', exist_ok=True)

# Global styles
with open('styles/globals.css', 'w') as f:
    f.write("""
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0d1117;
  --bg-2: #161b22;
  --bg-3: #21262d;
  --bg-4: #30363d;
  --blue: #1c6ef3;
  --blue-dim: #0d2137;
  --blue-border: rgba(28,110,243,0.25);
  --green: #3fb950;
  --green-dim: #0d2a1a;
  --green-border: rgba(63,185,80,0.25);
  --amber: #d29922;
  --amber-dim: #2a1f0d;
  --amber-border: rgba(210,153,34,0.25);
  --red: #f85149;
  --red-dim: #1a0d0d;
  --red-border: rgba(248,81,73,0.25);
  --purple: #bc8cff;
  --purple-dim: #1a0d2e;
  --border: #21262d;
  --border-2: #30363d;
  --text-1: #f0f6fc;
  --text-2: #c9d1d9;
  --text-3: #8b949e;
  --text-4: #484f58;
  --mono: 'JetBrains Mono', 'Fira Code', monospace;
  --sans: 'Inter', -apple-system, sans-serif;
}

body {
  background: var(--bg);
  color: var(--text-1);
  font-family: var(--sans);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

* { scrollbar-width: thin; scrollbar-color: var(--bg-3) transparent; }
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
import Header from '../components/Header'

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
    try {
      const res = await axios.get(API + '/shipments')
      setShipments(res.data.shipments)
    } catch(e) { console.error(e) }
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
      setTimeout(() => setPulse(false), 1200)
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
      <Head>
        <title>Shipment Nerve Center</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        <Header pulse={pulse} onAdd={() => setAdding(true)} />
        <main style={{ maxWidth: 1400, margin: '0 auto', padding: '28px 24px' }}>
          <StatsBar shipments={shipments} />
          {adding && <AddShipmentForm onAdd={handleAdd} onCancel={() => setAdding(false)} />}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>Active shipments</p>
            <span style={{ fontSize: 12, color: 'var(--text-3)', background: 'var(--bg-3)', padding: '2px 10px', borderRadius: 20 }}>
              {shipments.length} total
            </span>
          </div>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-4)', fontSize: 13 }}>Loading shipments...</div>
          ) : (
            <ShipmentTable shipments={shipments} onSelect={handleSelect} selected={selected} />
          )}
          {selected && <EventTimeline shipment={selected} events={events} onClose={() => setSelected(null)} />}
        </main>
      </div>
    </>
  )
}
""")
print('Done: pages/index.js')

# Header component
with open('components/Header.js', 'w') as f:
    f.write("""
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
""")
print('Done: Header.js')

# StatsBar
with open('components/StatsBar.js', 'w') as f:
    f.write("""
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
""")
print('Done: StatsBar.js')

# ShipmentTable
with open('components/ShipmentTable.js', 'w') as f:
    f.write("""
const STATUS = {
  in_transit:       { label: 'In transit',     dot: 'var(--blue)',   bg: 'var(--blue-dim)',   border: 'var(--blue-border)',   text: '#58a6ff' },
  delivered:        { label: 'Delivered',       dot: 'var(--green)',  bg: 'var(--green-dim)',  border: 'var(--green-border)',  text: 'var(--green)' },
  pending:          { label: 'Pending',         dot: 'var(--text-3)', bg: 'var(--bg-3)',       border: 'var(--border-2)',      text: 'var(--text-3)' },
  info_received:    { label: 'Info received',   dot: 'var(--purple)', bg: 'var(--purple-dim)', border: 'rgba(188,140,255,0.2)', text: 'var(--purple)' },
  out_for_delivery: { label: 'Out for delivery',dot: 'var(--amber)',  bg: 'var(--amber-dim)',  border: 'var(--amber-border)', text: 'var(--amber)' },
  attempt_failed:   { label: 'Attempt failed',  dot: 'var(--red)',    bg: 'var(--red-dim)',    border: 'var(--red-border)',    text: 'var(--red)' },
  exception:        { label: 'Exception',       dot: 'var(--red)',    bg: 'var(--red-dim)',    border: 'var(--red-border)',    text: 'var(--red)' },
  unknown:          { label: 'Unknown',         dot: 'var(--text-4)', bg: 'var(--bg-3)',       border: 'var(--border-2)',      text: 'var(--text-4)' }
}

export default function ShipmentTable({ shipments, onSelect, selected }) {
  if (shipments.length === 0) return (
    <div style={{ border: '1px dashed var(--border-2)', borderRadius: 10, padding: '4rem', textAlign: 'center' }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--text-4)" strokeWidth="1.5" style={{ margin: '0 auto 12px', display: 'block' }}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
      <p style={{ fontSize: 13, color: 'var(--text-4)' }}>No shipments tracked yet. Add your first one.</p>
    </div>
  )

  const cols = '1.4fr 0.7fr 1fr 1.3fr 1fr 0.8fr 0.85fr'

  return (
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 16 }}>
      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 800 }}>
          <div style={{ display: 'grid', gridTemplateColumns: cols, padding: '10px 18px', borderBottom: '1px solid var(--border)', background: 'var(--bg)' }}>
            {['Tracking no.', 'Carrier', 'Description', 'Route', 'Status', 'ETA', 'Pred. delay'].map(h => (
              <div key={h} style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{h}</div>
            ))}
          </div>
          {shipments.map((s, i) => {
            const st = STATUS[s.status] || STATUS.unknown
            const isSelected = selected?.id === s.id
            const delay = parseFloat(s.predicted_delay_days) || 0
            const delayColor = delay > 3 ? 'var(--red)' : delay > 1 ? 'var(--amber)' : 'var(--green)'
            return (
              <div
                key={s.id}
                onClick={() => onSelect(s)}
                style={{ display: 'grid', gridTemplateColumns: cols, padding: '14px 18px', borderBottom: i < shipments.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'pointer', background: isSelected ? 'rgba(28,110,243,0.06)' : 'transparent', borderLeft: isSelected ? '2px solid var(--blue)' : '2px solid transparent', transition: 'background 0.15s', alignItems: 'center' }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent' }}
              >
                <div style={{ fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 600, color: 'var(--blue)', letterSpacing: '0.03em' }}>{s.tracking_number}</div>
                <div><span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)', background: 'var(--bg-3)', padding: '2px 7px', borderRadius: 4, letterSpacing: '0.04em' }}>{s.carrier.toUpperCase()}</span></div>
                <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{s.description || '—'}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{s.origin || '—'} <span style={{ color: 'var(--text-4)' }}>→</span> {s.destination || '—'}</div>
                <div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: st.bg, border: '1px solid ' + st.border, color: st.text, padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 500 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: st.dot, flexShrink: 0 }} />
                    {st.label}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'var(--mono)' }}>
                  {s.eta ? new Date(s.eta).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '—'}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: delayColor, fontFamily: 'var(--mono)' }}>
                  {delay > 0 ? '+' + delay + 'd' : 'On time'}
                </div>
              </div>
            )
          })}
        </div>
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
""")
print('Done: AddShipmentForm.js')

# EventTimeline
with open('components/EventTimeline.js', 'w') as f:
    f.write("""
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
""")
print('Done: EventTimeline.js')
print('')
print('All files written! Refresh http://localhost:3000')