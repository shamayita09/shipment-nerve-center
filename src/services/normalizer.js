const STATUS_MAP = {
  'Pending': 'pending',
  'InfoReceived': 'info_received',
  'InTransit': 'in_transit',
  'OutForDelivery': 'out_for_delivery',
  'AttemptFail': 'attempt_failed',
  'Delivered': 'delivered',
  'Exception': 'exception',
  'Expired': 'expired'
}

const normalizeTracking = (rawTracking) => {
  const latest = rawTracking.checkpoints?.[0] || {}
  return {
    status: STATUS_MAP[rawTracking.tag] || 'unknown',
    raw_status: rawTracking.subtag_message || rawTracking.tag,
    location: [latest.city, latest.state, latest.country_name].filter(Boolean).join(', ') || 'Unknown',
    carrier_timestamp: latest.checkpoint_time ? new Date(latest.checkpoint_time) : new Date(),
    eta: rawTracking.expected_delivery ? new Date(rawTracking.expected_delivery) : null
  }
}

module.exports = { normalizeTracking }
