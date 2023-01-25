import User, { IUser } from '@/models/user.model'
import { useFetchWrapper } from '@/lib/wrapper/fetch.wrapper';
import { urlPaths } from '@/utils'

const fetchWrapper = useFetchWrapper();


function getSessionUser() {
    const _locUser = localStorage.getItem('user') || ''
    if (_locUser) {
        const localUser: any = JSON.parse(_locUser)

        const user: User = new User({ email: localUser['email'], role: localUser['role'], token: localUser['token'] })

        return user
    }

}

function removeSessionData() {
    localStorage.removeItem('user')
}


export default class AuthService {
    static getToken() {
        const user = getSessionUser()
        if (user) {
            return user.token
        }
    }

    /**
     * 
     * @returns { name, role}
     */
    static getUserData(): IUser | undefined {
        const user = getSessionUser()
        if (user) {
            return user
        }

    }

    static setSessionData(user: object) {
        localStorage.setItem('user', JSON.stringify(user))
    }


    static getEmail() {
        const user = getSessionUser()
        if (user) {
            return user.email
        }
    }

    static async login(email: string, password: string): Promise<boolean> {

        return fetchWrapper.post(`${urlPaths.SERVER_PATH}/v1/auth/login`, { email, password })

    }

    static async logout() {
        removeSessionData()
        window.location.replace('/')
    }
}