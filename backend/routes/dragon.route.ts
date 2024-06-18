import express from 'express'
import { allDragons, fight } from '../controllers/dragon.controller'

const router = express.Router()

router.post('/fight', fight)
router.get('/', allDragons)


export default router