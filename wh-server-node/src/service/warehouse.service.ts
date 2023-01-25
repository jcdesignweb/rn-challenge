import Warehouse from '../entity/warehouse.entity'
import { CreateWarehouseRequest } from '../request/warehouse/create.request'
import { geodecodeAddressCoors } from '../repository/google.repository'
import { BadRequest } from '../response/badrequest'
import { calculateDistance } from '../utils'

const getWarehouseCoors = async (warehouse: Warehouse) => {
    const longAddress = `${warehouse.address},${warehouse.city},${warehouse.state}, ${warehouse.country}, ${warehouse.zip}`
    geodecodeAddressCoors(longAddress)
        .then((coors) => {
            warehouse.latlong = coors
            warehouse.save()
        })
        .catch((e) => {
            throw e
        })
}

const findByCode = async (code: string) => {
    const warehouse = await Warehouse.findOne({
        where: {
            code: code,
            deleted: false
        }
    })

    return warehouse
}

export default class WarehouseService {
    /**
     * returns all available warehouses
     * @returns Array
     */
    static async getAll() {
        const warehouses = await Warehouse.find({
            where: {
                deleted: false
            }
        })

        return warehouses
    }

    static async delete(code: string): Promise<boolean> {
        const filter = { code }
        const result = await Warehouse.update(filter, {
            deleted: true
        })

        if (!result) {
            throw new BadRequest('Invalid Warehouse code, already exists')
        }

        return result.affected === 1
    }

    /**
     *
     * @param data it creates a new one if not exists
     */
    static async createOne(data: CreateWarehouseRequest) {
        const exists = await findByCode(data.code)

        if (exists) {
            throw new BadRequest('Invalid Warehouse code, already exists')
        }

        const warehouse = new Warehouse()

        warehouse.address = data.address
        warehouse.code = data.code
        warehouse.city = data.city
        warehouse.country = data.country
        warehouse.state = data.state
        warehouse.name = data.name
        warehouse.zip = data.zip

        await warehouse.save()

        getWarehouseCoors(warehouse)
    }

    static async getByCode(code: string) {
        const warehouse = await Warehouse.findOne({
            where: {
                code,
                deleted: false
            }
        })

        return warehouse
    }

    /**
     * store the filename in warehouse entity
     * @param code
     * @param original_name
     */
    static async uploadFile(code: string, original_name: string): Promise<boolean> {
        const warehouse: Warehouse | null = await this.getByCode(code)

        if (!warehouse) {
            throw new BadRequest('Invalid Warehouse code, already exists')
        }

        warehouse.list_file_name = original_name
        warehouse.save()

        return false
    }

    static async getNearestMe(address: string, max: number) {
        const geoLocation = await geodecodeAddressCoors(address)
        const address_coors = geoLocation.split(', ')

        const allWarehouses = await this.getAll()

        const warehousesCalcs = []

        for (const warehouse of allWarehouses) {
            const warehouseCoors = warehouse.latlong.split(', ')
            const distance = calculateDistance(
                { lat: Number(address_coors[0]), lng: Number(address_coors[1]) },
                { lat: Number(warehouseCoors[0]), lng: Number(warehouseCoors[1]) }
            )

            warehousesCalcs.push({ warehouse, distance })
        }

        const warehousesCalcsSort = warehousesCalcs.sort((w1: any, w2: any) =>
            w1.distance < w2.distance ? -1 : w1.distance > w2.distance ? 1 : 0
        )

        return {
            searchLocation: { lat: Number(address_coors[0]), lng: Number(address_coors[1]) },
            markers: warehousesCalcsSort.slice(0, max)
        }
    }
}
