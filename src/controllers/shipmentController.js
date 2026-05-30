
const db = require('../db')
const { addTracking } = require('../services/aftership')
const { normalizeTracking } = require('../services/normalizer')
const axios = require('axios')

const getPrediction = async (shipment) => {
  try {
    const res = await axios.post('http://localhost:5001/predict', {
      origin: shipment.origin ? shipment.origin.split(',')[0].trim() : 'Shanghai',
      destination: shipment.destination ? shipment.destination.split(',')[0].trim() : 'Mumbai',
      carrier: shipment.carrier,
      port_congestion: 0.4,
      weather_severity: 0.2,
      base_transit_days: 14
    })
    return res.data
  } catch (err) {
    return null
  }
}

const createShipment = async (req, res) => {
  const { tracking_number, carrier, description, origin, destination } = req.body
  if (!tracking_number || !carrier) {
    return res.status(400).json({ error: 'tracking_number and carrier are required' })
  }
  try {
    const rawTracking = await addTracking(tracking_number, carrier)
    const normalized = normalizeTracking(rawTracking)
    const prediction = await getPrediction({ origin, destination, carrier })
    const predicted_delay_days = prediction ? prediction.predicted_delay_days : 0
    const result = await db.query(
      `INSERT INTO shipments (tracking_number, carrier, description, origin, destination, status, eta, predicted_delay_days)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [tracking_number, carrier, description, origin, destination,
       normalized.status, normalized.eta, predicted_delay_days]
    )
    const shipment = result.rows[0]
    await db.query(
      `INSERT INTO shipment_events (shipment_id, status, raw_status, location, carrier_timestamp)
       VALUES ($1, $2, $3, $4, $5)`,
      [shipment.id, normalized.status, normalized.raw_status,
       normalized.location, normalized.carrier_timestamp]
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
    res.status(500).json({ error: 'Failed to fetch events' })
  }
}

const updateShipment = async (req, res) => {
  const { description, origin, destination, carrier, status } = req.body
  try {
    const result = await db.query(
      `UPDATE shipments
       SET description = COALESCE($1, description),
           origin = COALESCE($2, origin),
           destination = COALESCE($3, destination),
           carrier = COALESCE($4, carrier),
           status = COALESCE($5, status),
           updated_at = NOW()
       WHERE id = $6 RETURNING *`,
      [description, origin, destination, carrier, status, req.params.id]
    )
    if (result.rows.length === 0) return res.status(404).json({ error: 'Shipment not found' })
    res.json({ success: true, shipment: result.rows[0] })
  } catch (err) {
    console.error('updateShipment error:', err.message)
    res.status(500).json({ error: 'Failed to update shipment' })
  }
}

const deleteShipment = async (req, res) => {
  try {
    const result = await db.query(
      `DELETE FROM shipments WHERE id = $1 RETURNING *`,
      [req.params.id]
    )
    if (result.rows.length === 0) return res.status(404).json({ error: 'Shipment not found' })
    res.json({ success: true, message: 'Shipment deleted' })
  } catch (err) {
    console.error('deleteShipment error:', err.message)
    res.status(500).json({ error: 'Failed to delete shipment' })
  }
}

module.exports = { createShipment, getShipments, getShipmentEvents, updateShipment, deleteShipment }
