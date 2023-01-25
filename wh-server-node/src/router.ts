import express from 'express'
import WarehouseRouter from './route/warehouse.route'
import AuthRouter from './route/auth.route'

const API_V1 = '/v1'

const router = express.Router()

router.use(`${API_V1}/warehouse`, WarehouseRouter)
router.use(`${API_V1}/auth`, AuthRouter)

export default router
