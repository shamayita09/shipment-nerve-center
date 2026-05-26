
const { Resend } = require('resend')
require('dotenv').config()

const resend = new Resend(process.env.RESEND_API_KEY)

// Which status changes are worth alerting about
const ALERT_WORTHY = [
  'delivered',
  'attempt_failed', 
  'exception',
  'out_for_delivery',
  'available_for_pickup'
]

const STATUS_LABELS = {
  in_transit: 'In Transit',
  delivered: 'Delivered',
  out_for_delivery: 'Out for Delivery',
  attempt_failed: 'Delivery Attempt Failed',
  exception: 'Exception / Issue',
  available_for_pickup: 'Available for Pickup',
  pending: 'Pending',
  info_received: 'Info Received'
}

const STATUS_EMOJI = {
  delivered: '✅',
  out_for_delivery: '🚚',
  attempt_failed: '⚠️',
  exception: '🚨',
  available_for_pickup: '📦',
  in_transit: '✈️',
  pending: '🕐'
}

const shouldAlert = (newStatus) => {
  return ALERT_WORTHY.includes(newStatus)
}

const sendEmailAlert = async (shipment, newStatus, location) => {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your_resend_key_here') {
    console.log('Email alert skipped - no API key configured')
    return
  }

  const emoji = STATUS_EMOJI[newStatus] || '📦'
  const label = STATUS_LABELS[newStatus] || newStatus
  const eta = shipment.eta ? new Date(shipment.eta).toLocaleDateString() : 'Unknown'

  try {
    await resend.emails.send({
      from: 'Shipment Tracker <onboarding@resend.dev>',
      to: process.env.ALERT_EMAIL,
      subject: emoji + ' ' + shipment.tracking_number + ' — ' + label,
      html: '<div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 2rem;">' +
        '<h2 style="margin: 0 0 1rem;">' + emoji + ' Shipment Update</h2>' +
        '<table style="width: 100%; border-collapse: collapse;">' +
        '<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Tracking #</td><td style="padding: 8px 0; font-weight: 500;">' + shipment.tracking_number + '</td></tr>' +
        '<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Carrier</td><td style="padding: 8px 0;">' + shipment.carrier.toUpperCase() + '</td></tr>' +
        '<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Status</td><td style="padding: 8px 0; font-weight: 500; color: #2563eb;">' + label + '</td></tr>' +
        '<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Location</td><td style="padding: 8px 0;">' + location + '</td></tr>' +
        '<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Route</td><td style="padding: 8px 0;">' + (shipment.origin || '-') + ' → ' + (shipment.destination || '-') + '</td></tr>' +
        '<tr><td style="padding: 8px 0; color: #6b7280; font-size: 14px;">ETA</td><td style="padding: 8px 0;">' + eta + '</td></tr>' +
        '</table>' +
        '<p style="margin: 1.5rem 0 0; font-size: 12px; color: #9ca3af;">Shipment Nerve Center — automated alert</p>' +
        '</div>'
    })
    console.log('Email alert sent for ' + shipment.tracking_number)
  } catch (err) {
    console.error('Email alert failed:', err.message)
  }
}

const sendWhatsAppAlert = async (shipment, newStatus, location) => {
  if (!process.env.TWILIO_ACCOUNT_SID || process.env.TWILIO_ACCOUNT_SID === 'your_twilio_sid') {
    console.log('WhatsApp alert skipped - no Twilio configured')
    return
  }

  try {
    const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    const emoji = STATUS_EMOJI[newStatus] || '📦'
    const label = STATUS_LABELS[newStatus] || newStatus

    await twilio.messages.create({
      from: 'whatsapp:' + process.env.TWILIO_WHATSAPP_FROM,
      to: 'whatsapp:' + process.env.ALERT_PHONE,
      body: emoji + ' *Shipment Update*\n' +
        'Tracking: ' + shipment.tracking_number + '\n' +
        'Status: ' + label + '\n' +
        'Location: ' + location + '\n' +
        'Route: ' + (shipment.origin || '-') + ' to ' + (shipment.destination || '-')
    })
    console.log('WhatsApp alert sent for ' + shipment.tracking_number)
  } catch (err) {
    console.error('WhatsApp alert failed:', err.message)
  }
}

const sendAlert = async (shipment, newStatus, location) => {
  if (!shouldAlert(newStatus)) return

  await Promise.all([
    sendEmailAlert(shipment, newStatus, location),
    sendWhatsAppAlert(shipment, newStatus, location)
  ])
}

module.exports = { sendAlert, shouldAlert }
