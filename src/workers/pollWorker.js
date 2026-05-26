
const cron = require('node-cron')
const db = require('../db')
const { getTracking } = require('../services/aftership')
const { normalizeTracking } = require('../services/normalizer')
const { sendAlert } = require('../services/alertService')

let ioInstance = null

const setIO = (io) => {
  ioInstance = io
}

const pollAllShipments = async () => {
  console.log('Polling shipments...', new Date().toISOString())
  try {
    const result = await db.query(
      `SELECT * FROM shipments WHERE status != 'delivered' AND status != 'expired'`
    )
    for (const shipment of result.rows) {
      try {
        const rawTracking = await getTracking(shipment.tracking_number, shipment.carrier)
        const normalized = normalizeTracking(rawTracking)

        if (normalized.status !== shipment.status) {
          await db.query(
            `UPDATE shipments SET status = $1, eta = $2, updated_at = NOW() WHERE id = $3`,
            [normalized.status, normalized.eta, shipment.id]
          )
          await db.query(
            `INSERT INTO shipment_events (shipment_id, status, raw_status, location, carrier_timestamp)
             VALUES ($1, $2, $3, $4, $5)`,
            [shipment.id, normalized.status, normalized.raw_status,
             normalized.location, normalized.carrier_timestamp]
          )

          console.log('Updated: ' + shipment.tracking_number + ' to ' + normalized.status)

          // Send alerts
          await sendAlert(shipment, normalized.status, normalized.location)

          // Notify dashboard via WebSocket
          if (ioInstance) {
            ioInstance.emit('shipment_updated', {
              id: shipment.id,
              tracking_number: shipment.tracking_number,
              status: normalized.status,
              location: normalized.location
            })
          }
        }
      } catch (err) {
        console.error('Failed to poll ' + shipment.tracking_number + ':', err.message)
      }
    }
    console.log('Polled ' + result.rows.length + ' shipments')
  } catch (err) {
    console.error('Poll worker error:', err.message)
  }
}

cron.schedule('*/30 * * * *', pollAllShipments)
pollAllShipments()

module.exports = { pollAllShipments, setIO }
