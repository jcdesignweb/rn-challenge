import AppError from '../exceptions/app.error'

export class NoAccess extends AppError {
    constructor(message = 'Not access found') {
        super(401, message)
    }
}
