export interface IUser {
    email: string
    role: string
    token: string
}

export default class User implements IUser{
    email: string
    role: string
    token: string

    constructor({email, role, token}: IUser) {
        this.email = email
        this.role = role
        this.token = token
    }
    
}