import app from '../app'
import request from 'supertest'

import UserService from '../service/user.service'
import { NoAccess } from '../response'
import { UserRole } from '../entity/user.entity'

jest.mock('../middleware/auth.middleware', () =>
    jest.fn().mockImplementation(
        () =>
            function (req: any, res: any, next: any) {
                return next()
            }
    )
)

describe('Auth Controller tests', () => {
    test('Login - green path', async () => {
        const payload = {
            email: 'juan@test.com',
            password: '132465798'
        }

        jest.spyOn(UserService, 'login').mockReturnValue(
            new Promise((resolve) => {
                resolve({
                    token: 'the_result_jwt_access_token',
                    email: payload.email,
                    role: UserRole.Manager
                })
            })
        )

        const result = await request(app).post('/v1/auth/login').send(payload)

        expect(result.statusCode).toEqual(200)
        expect(result.body.response.token).toEqual('the_result_jwt_access_token')
    })

    test('Login - Wrong Email - red path', async () => {
        const payload = {
            email: 'juantest.com',
            password: '123456789'
        }

        jest.spyOn(UserService, 'login').mockReturnValue(
            new Promise((resolve) => {
                resolve({
                    token: 'the_result_jwt_access_token',
                    email: payload.email,
                    role: UserRole.Basic
                })
            })
        )

        const result = await request(app).post('/v1/auth/login').send(payload)

        expect(result.statusCode).toEqual(400)
        expect(result.body.success).toEqual(false)
    })

    test('Login - invalid user - red path', async () => {
        const payload = {
            email: 'juan@test.com',
            password: 'badPassword'
        }

        jest.spyOn(UserService, 'login').mockImplementation(() => {
            throw new NoAccess('invalid User, check credentials please')
        })
        const result = await request(app).post('/v1/auth/login').send(payload)

        expect(result.statusCode).toEqual(401)
        expect(result.body.success).toEqual(false)
    })

    test('Logout - green path', async () => {
        const payload = {}

        jest.spyOn(UserService, 'logout').mockReturnValue(
            new Promise((resolve, reject) => {
                resolve(true)
            })
        )
        
        const result = await request(app).post('/v1/auth/logout').set({ "authorization": 'dadawdadad' }).send(payload)

        expect(result.statusCode).toEqual(200)

    })
})
