export class Success {
    message?: string
    response?: object
    success: boolean

    constructor(message: any = null, data: any = {}) {
        if (message && message.length > 0) {
            this.message = message
        }

        this.success = true

        if (Array.isArray(data)) {
            this.response = data
        } else if (data !== null && Object.entries(data).length > 0) {
            this.response = data
        }
    }
}
