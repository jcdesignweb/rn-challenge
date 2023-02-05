/**
 * A Login type
 * @typedef {object} Login
 * @property {string} email.required - user's email
 * @property {string} password.required - user password
*/
export interface LoginDto {
    email: string
    password: string
}
