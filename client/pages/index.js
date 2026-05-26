import SearchFilter from '../components/SearchFilter'
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
  const [filtered, setFiltered] = useState(null)
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
    {(filtered || shipments).length} of {shipments.length}
  </span>
</div>
<SearchFilter shipments={shipments} onFilter={setFiltered} />
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-4)', fontSize: 13 }}>Loading shipments...</div>
          ) : (
            <ShipmentTable shipments={filtered || shipments} onSelect={handleSelect} selected={selected} />
          )}
          {selected && <EventTimeline shipment={selected} events={events} onClose={() => setSelected(null)} />}
        </main>
      </div>
    </>
  )
}
