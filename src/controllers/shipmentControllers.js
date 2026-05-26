const db = require('../db')
const { addTracking } = require('../services/aftership')
const { normalizeTracking } = require('../services/normalizer')

const createShipment = async (req, res) => {
  const { tracking_number, carrier, description, origin, destination } = req.body
  if (!tracking_number || !carrier) {
    return res.status(400).json({ error: 'tracking_number and carrier are required' })
  }
  try {
    const rawTracking = await addTracking(tracking_number, carrier)
    const normalized = normalizeTracking(rawTracking)
    const result = await db.query(
      `INSERT INTO shipments (tracking_number, carrier, description, origin, destination, status, eta)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [tracking_number, carrier, description, origin, destination, normalized.status, normalized.eta]
    )
    const shipment = result.rows[0]
    await db.query(
      `INSERT INTO shipment_events (shipment_id, status, raw_status, location, carrier_timestamp)
       VALUES ($1, $2, $3, $4, $5)`,
      [shipment.id, normalized.status, normalized.raw_status, normalized.location, normalized.carrier_timestamp]
    )
    res.status(201).json({ success: true, shipment })
  } catch (err) {
    console.error('createShipment error:', err.message)
    res.status(500).json({ error: 'Failed to add shipment' })
  }
}

const getShipments = async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM shipments ORDER BY created_at DESC`)
    res.json({ shipments: result.rows })
  } catch (err) {
    console.error('getShipments error:', err.message)
    res.status(500).json({ error: 'Failed to fetch shipments' })
  }
}

const getShipmentEvents = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM shipment_events WHERE shipment_id = $1 ORDER BY carrier_timestamp DESC`,
      [req.params.id]
    )
    res.json({ events: result.rows })
  } catch (err) {
    console.error('getShipmentEvents error:', err.message)
    res.status(500).json({ error: 'Failed to fetch events' })
  }
}

module.exports = { createShipment, getShipments, getShipmentEvents }