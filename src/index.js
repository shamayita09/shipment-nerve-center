const express = require('express')
const cors = require('cors')
require('dotenv').config()

require('./db')

const app = express()

app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() })
})

app.use('/api/shipments', require('./routes/shipments'))

require('./workers/pollWorker')

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})