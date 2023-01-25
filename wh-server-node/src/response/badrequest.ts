import AppError from '../exceptions/app.error'

export class BadRequest extends AppError {
    constructor(message: string) {
        super(400, message)
    }
}
