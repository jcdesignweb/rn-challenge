import { JWT_SECRET } from '../config'

import jwt from 'jsonwebtoken'
import User, { UserRole } from '../entity/user.entity'
import { NoAccess } from '../response/no_access'

export interface TokenData {
    username: string
    role: string
}

export default class AuthService {
    static verify(authorization: string): TokenData {
        try {
            const decoded = <TokenData>jwt.verify(authorization, String(JWT_SECRET))

            return decoded
        } catch (e: any) {
            console.error(e)
            throw new Error(e.message)
        }
    }

    static async generateToken(email: string, role: string) {
        const token = await jwt.sign(
            {
                username: email,
                role: role
            },
            String(JWT_SECRET),
            {
                expiresIn: '1y'
            }
        )

        return token
    }

    static async checkUserPermissions(token: string, permittedRoles: UserRole[]) {
        console.log("Token", token)
        const _token = token.split('Bearer ')
        
        if(!_token[1]) {
            console.error("Token wrong format")
            throw new NoAccess()
        }

        const tokenContent = String(_token[1])
        const user: User | null = await User.findOne({
            where: {
                token: tokenContent
            }
        })

        this.verify(tokenContent)

        if (user) {
            if (!permittedRoles[0].includes(user.role)) throw 'User does not have the privileges'
        } else {
            throw new NoAccess()
        }
    }
}
