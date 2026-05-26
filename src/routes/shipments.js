const express = require('express')
const router = express.Router()
const { createShipment, getShipments, getShipmentEvents } = require('../controllers/shipmentController')
router.post('/', createShipment)
router.get('/', getShipments)
router.get('/:id/events', getShipmentEvents)
module.exports = router