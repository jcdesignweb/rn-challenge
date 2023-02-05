import express from 'express'
import { upload } from '../config/multer'
import { UserRole } from '../entity/user.entity'
import WarehouseController from '../controller/warehouse.controller'

import validateAuth from '../middleware/auth.middleware'

const router = express.Router()

/**
 * GET /v1/warehouse
 * @security BearerAuth
 * @summary it returns all warehouses
 * @tags Warehouse
 * @return {WarehouseResponseFull} 200 - success response - application/json
 */
router.get(`/`, validateAuth([UserRole.Manager, UserRole.Basic]), WarehouseController.getAll)

/**
 * POST /v1/warehouse
 * @security BearerAuth
 * @summary it creates a new warehouse
 * @param {WarehouseRequest} request.body.required - name body description
 * @tags Warehouse
 * @return {} 200 - success response - application/json
 */
router.post(`/`, validateAuth([UserRole.Manager, UserRole.Basic]), WarehouseController.create)

/**
 * DELETE /v1/warehouse
 * @security BearerAuth
 * @param {string} code.query.required - warehouse code
 * @summary deletes a warehouse
 * @tags Warehouse
 * @return {} 200 - success response - application/json
 */
router.delete(`/`, validateAuth([UserRole.Manager, UserRole.Basic]), WarehouseController.delete)

/**
 * PATCH /v1/warehouse/file
 * @security BearerAuth
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
 * GET /v1/warehouse/{code}/file/download
 * @security BearerAuth
 * @param {string} code.path - warehouse code
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
 * GET /v1/warehouse/nearest
 * @security BearerAuth
 * @param {string} address.query.required - address to find
 * @param {string} max.query - max size
 * @summary it creates a new warehouse
 * @tags Warehouse
 * @return {WarehouseNearestResponse} 200 - success response - application/json
 * @return {} 500 - success response - application/json
 */
router.get(`/nearest`, validateAuth([UserRole.Manager]), WarehouseController.nearest)

export default router
