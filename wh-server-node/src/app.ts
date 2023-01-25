import express, { Response, NextFunction } from 'express'

import { options } from './config/swagger'
import router from './router'

import { NODE_ENV } from './config'
import AppError from './exceptions/app.error'
import cors from 'cors'

const expressJSDocSwagger = require('express-jsdoc-swagger')

const INTERNAL_SERVER_ERROR_CODE = 500

const app: any = express()

const CORS_ORIGIN_ENABLE_URL = 'http://localhost:5173'

app.use(
    cors({
        origin: CORS_ORIGIN_ENABLE_URL
    })
)

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

expressJSDocSwagger(app)(options)

app.use('/', router)

// Error handling Middleware function reads the error message
// and sends back a response in JSON format
const errorResponder = (
    error: AppError,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    response.header('Content-Type', 'application/json')

    console.error(error)

    const status = error.statusCode || INTERNAL_SERVER_ERROR_CODE
    if (status === INTERNAL_SERVER_ERROR_CODE) {
        return response.status(status).send({
            error: error.message,
            success: error.success,
            message: 'Internal Server Error'
        })
    }
    response.status(status).send({ error: error.message, success: error.success })
}

// Attach the second Error handling Middleware
// function defined above (which sends back the response)
app.use(errorResponder)

export default app
