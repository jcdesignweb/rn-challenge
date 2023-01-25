import { NextFunction, Request, Response } from 'express'
import AuthService from '../service/auth.service'
import { UserRole } from '../entity/user.entity'

const authValidator = async (req: Request, permittedRoles: Array<UserRole>) => {
    const { authorization } = req.headers
    if (authorization === undefined) throw 'Authorization header is missing'

    await AuthService.checkUserPermissions(authorization, permittedRoles)

    return true
}

export default function validateAuth(...permittedRoles: any) {
    return async (request: any, response: any, next: any) => {
        try {
            if (await authValidator(request, permittedRoles)) {
                next()
            }
        } catch (e) {
            response.status(403).send({ message: String(e), success: false })
        }
    }
}
