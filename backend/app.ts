import express from 'express'
const cors = require('cors')
import dragonRouter from './routes/dragon.route'
const app = express()
app.use(express.json())
app.use(cors());
app.use('/dragons', dragonRouter)
export default app