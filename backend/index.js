const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { Pool } = require('pg')

const PORT = process.env.APP_PORT || 8080

// PostgreSQL pool setup
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

// Test DB connection
pool.connect()
  .then(client => {
    return client
      .query('SELECT NOW()')
      .then(res => {
        console.log('Connected to DB at:', res.rows[0].now)
        client.release()
      })
      .catch(err => {
        client.release()
        console.error('Database connection error:', err.stack)
      })
  })

const app = express()
app.use(cors())

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query('SELECT * from users')
    return res.status(200).json({ message: "Success", data: result.rows || [] })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})
