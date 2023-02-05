import { Request, NextFunction, Response } from 'express'
import { Success, BadRequest } from '../response';
import { LoginDto } from '../dto/user/login.dto';
import UserService from '../service/user.service';
import validator from 'email-validator'

export default class AuthController {
    static async login(req: Request, res: Response, next: NextFunction) {

        try {
            const loginRequest: LoginDto = req.body

            console.info('POST /v1/user/login', '\n Request: \n', loginRequest)

            if (!loginRequest.email || !validator.validate(loginRequest.email)) throw new BadRequest('Property email is missing or is invalid')
            if (!loginRequest.password) throw new BadRequest('Property password is missing or is invalid')

            const { token, email, role } = await UserService.login(loginRequest)

            if (token !== null) {
                return res.json(new Success(null, { token, email, role }))
            }

        } catch (e) {
            next(e)
        }
    }

    static async logout(req: Request, res: Response, next: NextFunction) {

        try {
            const { authorization } = req.headers

            console.info('POST /v1/user/logout')

            if (authorization) {
                const isLogOut = await UserService.logout(authorization)  
                if (isLogOut !== null) {
                    return res.json(new Success(null))
                }
            }

        } catch (e) {
            next(e)
        }
    }
}