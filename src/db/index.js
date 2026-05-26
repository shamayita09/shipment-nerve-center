const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

pool.connect((err, client, release) => {
  if (err) {
    console.error('Database connection failed:', err.message)
  } else {
    console.log('PostgreSQL connected')
    release()
  }
})

const query = (text, params) => pool.query(text, params)

module.exports = { query, pool }
