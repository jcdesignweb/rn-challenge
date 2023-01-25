import express from 'express'
import { upload } from '../config/multer'
import { UserRole } from '../entity/user.entity'
import WarehouseController from '../controller/warehouse.controller'

import validateAuth from '../middleware/auth.middleware'

const router = express.Router()

/**
 * GET /v1/warehouse
 * @summary it returns all warehouses
 * @tags Warehouse
 * @return {} 200 - success response - application/json
 */
router.get(`/`, validateAuth([UserRole.Manager, UserRole.Basic]), WarehouseController.getAll)

/**
 * POST /v1/warehouse
 * @summary it creates a new warehouse
 * @tags Warehouse
 * @return {} 200 - success response - application/json
 */
router.post(`/`, validateAuth([UserRole.Manager, UserRole.Basic]), WarehouseController.create)

/**
 * DELETE /v1/warehouse
 * @summary deletes a warehouse
 * @tags Warehouse
 * @return {} 200 - success response - application/json
 */
router.delete(`/`, validateAuth([UserRole.Manager, UserRole.Basic]), WarehouseController.delete)

/**
 * PATCH /v1/warehouse/file
 * @summary it uploads a file
 * @tags Warehouse
 * @return {} 200 - success response - application/json
 */
router.patch(
    `/file`,
    upload.single('file'),
    validateAuth([UserRole.Manager, UserRole.Basic]),
    WarehouseController.uploadFile
)

/**
 * GET /v1/warehouse/:code/file/download
 * @summary it downloads a list product file
 * @tags Warehouse
 * @return {} 200 - success response - application/json
 */
router.get(
    `/:code/file/download`,
    validateAuth([UserRole.Manager, UserRole.Basic]),
    WarehouseController.downloadFile
)

/**
 * POST /v1/warehouse/nearest
 * @summary it creates a new warehouse
 * @tags Warehouse
 * @return {} 200 - success response - application/json
 */
router.get(`/nearest`, validateAuth([UserRole.Manager]), WarehouseController.nearest)

export default router
