import app from '../app'
import request from 'supertest'

import WarehouseService from '../service/warehouse.service'
import Warehouse from '../entity/warehouse.entity';

const FILE_UPLOAD = __dirname + '/../../data/public/dummy.pdf'


jest.mock('../middleware/auth.middleware', () =>
    jest.fn().mockImplementation(
        () =>
            function (req: any, res: any, next: any) {
                return next()
            }
    )
)

describe('Warehouse Controller tests', () => {
    test('GetAll - green path', async () => {

        jest.spyOn(WarehouseService, 'getAll').mockReturnValue(
            new Promise((resolve) => {
                resolve([])
            })
        )

        const result = await request(app).get('/v1/warehouse').send()

        expect(result.statusCode).toEqual(200)
        
    })
    
    
    test('Create one - green path', async () => {
        const payload = {
            name: "Warehouse Bell ville",
            address: "Avellaneda 107",
            code: "A128",
            city: "Bell ville",
            country: "Argentina",
            state: "Cordoba",
            zip: 2550
        }

        jest.spyOn(WarehouseService, 'createOne').mockReturnValue(
            new Promise((resolve) => {
                resolve()
            })
        )

        const result = await request(app).post('/v1/warehouse').send(payload)

        expect(result.statusCode).toEqual(201)
        expect(result.body.message).toEqual('warehouse created correctly')
    })

    test('Create one - red path', async () => {
        const payload = {
            address: "Avellaneda 107",
            code: "A128",
            city: "Bell ville",
            country: "Argentina",
            state: "Cordoba",
            zip: 2550
        }

        jest.spyOn(WarehouseService, 'createOne').mockReturnValue(
            new Promise((resolve) => {
                resolve()
            })
        )

        const result = await request(app).post('/v1/warehouse').send(payload)

        expect(result.statusCode).toEqual(400)
    })

    test('Delete - green path', async () => {
        jest.spyOn(WarehouseService, 'delete').mockReturnValue(
            new Promise((resolve) => {
                resolve(true)
            })
        )

        const result = await request(app).delete('/v1/warehouse?code=A111').send()

        expect(result.statusCode).toEqual(200)
    })

    test('Delete - red path', async () => {
        jest.spyOn(WarehouseService, 'delete').mockReturnValue(
            new Promise((resolve) => {
                resolve(false)
            })
        )

        const result = await request(app).delete('/v1/warehouse?code=A111').send()

        expect(result.statusCode).toEqual(400)
    })

    test('uploadFile - green path', async () => {
        jest.spyOn(WarehouseService, 'uploadFile').mockReturnValue(
            new Promise((resolve) => {
                resolve(true)
            })
        )

        const result = await request(app)
            .patch('/v1/warehouse/file')
            .field('code', 'A-111') //adds a field 'name' and sets its value to 'Logo'
            .attach('file', FILE_UPLOAD) // attaches the file to the form
            .then(function (response) {
                // response from the server

                expect(response.status).toEqual(200)
            })

    })

    test('uploadFile - red path - code params is missing', async () => {
        jest.spyOn(WarehouseService, 'uploadFile').mockReturnValue(
            new Promise((resolve) => {
                resolve(true)
            })
        )

        const result = await request(app)
            .patch('/v1/warehouse/file')

            .send({ file: '' })

        expect(result.statusCode).toEqual(400)
    })


    function binaryParser(res: any, callback: any) {
        res.setEncoding('binary');
        res.data = '';
        res.on('data', function (chunk: any) {
            res.data += chunk;
        });
        res.on('end', function () {
            callback(null, new Buffer(res.data, 'binary'));
        });
    }

    test('downloadFile - green path', async () => {
        const warehouse: Warehouse = new Warehouse()
        warehouse.list_file_name = 'dummy.pdf'

        jest.spyOn(WarehouseService, 'getByCode').mockReturnValue(
            new Promise((resolve) => {
                resolve(warehouse)
            })
        )

        const result = await request(app).get('/v1/warehouse/A111/file/download').buffer()
        .parse(binaryParser)
        .send()

        expect(result.statusCode).toEqual(200)

    })


    test('Get Nearest - green path', async () => {

        jest.spyOn(WarehouseService, 'getNearestMe').mockReturnValue(
            new Promise((resolve) => {
                
                resolve({
                    searchLocation: { lat: 0, lng: 0 },
                    markers: []
                })
            })
        )

        const result = await request(app).get('/v1/warehouse/nearest?address=someaddress').send()

        expect(result.statusCode).toEqual(200)
        
    })

    test('Get Nearest - red path', async () => {

        jest.spyOn(WarehouseService, 'getNearestMe').mockReturnValue(
            new Promise((resolve) => {
                resolve({
                    searchLocation: { lat: 0, lng: 0 },
                    markers: []
                })
            })
        )

        const result = await request(app).get('/v1/warehouse/nearest').send()

        expect(result.statusCode).toEqual(400)
        
    })


})