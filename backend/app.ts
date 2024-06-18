import express from 'express'
const app = express()
app.use(express.json())

// Add a simple route
app.get('/', (req, res) => {
  res.send('Hello, world!')
})

export default app