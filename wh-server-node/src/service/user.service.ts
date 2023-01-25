import { LoginRequest } from '../request/user/login.request'
import { BadRequest, NoAccess } from '../response'
import { Md5 } from 'md5-typescript'

import User from '../entity/user.entity'
import AuthService from './auth.service'

const encriptPassword = (password: string) => {
    return Md5.init(password)
}

export default class UserService {
    static async login(login: LoginRequest) {
        const { email, password } = login

        const user: User | null = await User.findOne({
            where: {
                email,
                password: encriptPassword(password)
            }
        })

        if (!user) throw new NoAccess('invalid User, check credentials please')

        const token = await AuthService.generateToken(user.email, user.role)
        user.token = token
        user.save()

        return { token, email: user.email, role: user.role }
    }

    static async logout(authrorization: string): Promise<boolean> {
        const user: User | null = await User.findOne({
            where: {
                token: authrorization,
                deleted: false
            }
        })

        if (!user) throw new BadRequest('user does not exists')

        user.token = ''
        user.save()

        return true
    }
}
