import AppError from '../exceptions/app.error'

export class Fail extends AppError {
    constructor(message: string) {
        super(400, message)
    }
}
