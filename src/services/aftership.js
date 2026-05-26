const mockTracking = (trackingNumber, carrier) => ({
  tracking_number: trackingNumber,
  slug: carrier,
  tag: 'Delivered',
  subtag_message: 'Package in transit to destination',
  expected_delivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  checkpoints: [
    {
      checkpoint_time: new Date().toISOString(),
      city: 'Dubai',
      state: null,
      country_name: 'UAE',
      message: 'Package arrived at sorting facility'
    }
  ]
})

const addTracking = async (trackingNumber, carrier) => mockTracking(trackingNumber, carrier)
const getTracking = async (trackingNumber, carrier) => mockTracking(trackingNumber, carrier)
const getAllTrackings = async () => []

module.exports = { addTracking, getTracking, getAllTrackings }
