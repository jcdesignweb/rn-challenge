// Error object used in error handling middleware function
export default class AppError extends Error {
    statusCode: number
    success: boolean

    constructor(statusCode: number, message: string) {
        super(message)

        Object.setPrototypeOf(this, new.target.prototype)
        this.name = Error.name
        this.statusCode = statusCode
        this.success = false
        Error.captureStackTrace(this)
    }
}
