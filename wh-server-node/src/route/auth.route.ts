import express from 'express'
import UserController from '../controller/auth.controller'
import validateAuth from '../middleware/auth.middleware'
import { UserRole } from '../entity/user.entity'

const router = express.Router()

/**
 * POST /v1/auth/login
 * @summary user login
 * @tags Auth
 * @return {} 200 - success response - application/json
 */
router.post(`/login`, UserController.login)

/**
 * POST /v1/auth/logout
 * @summary user logout
 * @tags Auth
 * @return {} 200 - success response - application/json
 */
router.post(`/logout`, validateAuth([UserRole.Manager, UserRole.Basic]), UserController.logout)

export default router
