import { Request, NextFunction, Response } from 'express'
import WarehouseService from '../service/warehouse.service'
import { CreateWarehouseDto } from '../dto/warehouse/create.dto'
import { Success, BadRequest, Fail } from '../response'
import Warehouse from '../entity/warehouse.entity'
import { WarehousesResponseDto } from 'src/dto/warehouse/get.dto'


// CreateWarehousesResponseDto
export default class WarehouseController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        console.info('GET /v1/warehouse')
        try {
            const warehouses = await WarehouseService.getAll()
            return res.json(new Success(null,  WarehousesResponseDto(warehouses)))
        } catch (e) {
            next(e)
        }
    }
    
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            console.info('POST /v1/warehouse', '\n Request Body: \n', req.body)

            const createRequest: CreateWarehouseDto = req.body

            if (!createRequest.name) throw new BadRequest('Property name is missing or is invalid')
            if (!createRequest.address)
                throw new BadRequest('Property address is missing or is invalid')
            if (!createRequest.code) throw new BadRequest('Property code is missing or is invalid')
            if (!createRequest.city) throw new BadRequest('Property city is missing or is invalid')
            if (!createRequest.country)
                throw new BadRequest('Property country is missing or is invalid')
            if (!createRequest.state)
                throw new BadRequest('Property state is missing or is invalid')
            if (!createRequest.zip) throw new BadRequest('Property zip is missing or is invalid')

            await WarehouseService.createOne(createRequest)

            return res.status(201).json(new Success('warehouse created correctly'))
        } catch (e) {
            next(e)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            console.info('DELETE /v1/warehouse', '\n Request Params: \n', req.query)

            const { code } = req.query

            if (!code) throw new BadRequest('Property code is missing or is invalid')

            const isDelete = await WarehouseService.delete(String(code))
            if (isDelete) {
                return res.json(new Success('warehouse deleted correctly'))
            }

            throw new Fail('delete failed, check the code')
        } catch (e) {
            next(e)
        }
    }

    static async uploadFile(req: Request, res: Response, next: NextFunction) {
        try {
            console.info('POST /v1/warehouse/file', '\n Request Body: \n', req.body)

            const code = req.body.code
            const file = req.file

            if (!code) throw new BadRequest('Property code is missing or is invalid')
            if (!file) throw new BadRequest('Property file is missing or is invalid')

            WarehouseService.uploadFile(code, file.filename)

            return res.json(new Success('file uploaded correctly'))
        } catch (e) {
            next(e)
        }
    }

    static async downloadFile(req: Request, res: Response, next: NextFunction) {
        try {
            console.info(
                'GET /v1/warehouse/:code/file/download',
                '\n Request Params: \n',
                req.params
            )

            const { code } = req.params

            if (!code) throw new BadRequest('Property code is missing or is invalid')

            const warehouse: Warehouse | null = await WarehouseService.getByCode(String(code))
            
            if (!warehouse) {
                throw new Fail('Warehouse code invalid.')
            }

            res.download(`uploads/${warehouse?.list_file_name}`, function (err) {
                if (err) {
                    console.log(err)
                }
            })
        } catch (e) {
            next(e)
        }
    }

    static async nearest(req: Request, res: Response, next: NextFunction) {
        try {
            const { address } = req.query
            const max = Number(req.query.max) || 3

            if (!address) throw new BadRequest('Property address is missing or is invalid')

            console.info('GET /v1/warehouse/nearest', '\n Request params: \n', address)

            if (address) {
                const response = await WarehouseService.getNearestMe(String(address), max)

                return res.json(new Success(null, response))
            } else {
                throw new BadRequest('Property address is missing or is invalid')
            }
        } catch (e) {
            next(e)
        }
    }
}
