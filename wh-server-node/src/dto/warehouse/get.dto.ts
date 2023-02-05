import Warehouse from "src/entity/warehouse.entity"

/**
 * A Warehouse Response type
 * @typedef {object} WarehouseEntity
 * @property {boolean} success - Warehouse code
 * @property {string} code - Warehouse code
 * @property {string} name - Warehouse name
 * @property {string} city - Warehouse city name
 * @property {string} address - Warehouse's address name
 * @property {string} state - Warehouse's state name
 * @property {string} country - Warehouse city name  
 * @property {string} zip - Warehouse city name  
 * @property {string} latlon - Warehouse location
 * @property {string} filename - Warehouse list file
*/

/**
 * A Warehouse type Complete
 * @typedef {object} WarehouseResponseFull
 * @property {boolean} success - Warehouse code
 * @property {Array<WarehouseEntity>} response - Warehouses
*/


export class WarehouseResponseDto {
    public readonly code: string;
    public readonly name: string;
    public readonly city: string;
    public readonly address: string;
    public readonly state: string;
    public readonly country: string;
    public readonly zip: string;
    public readonly latlon: string;
    public readonly filename: string;

    constructor(data: Warehouse) {
        this.code = data.code
        this.name = data.name
        this.address = data.address
        this.city = data.city
        this.state = data.state
        this.country = data.country
        this.zip = data.zip
        this.latlon = data.latlong
        this.filename = data.list_file_name
    }
}

export const WarehousesResponseDto = (datas: Warehouse[]): Array<WarehouseResponseDto> => {
    return datas.map((warehouse: Warehouse) => new WarehouseResponseDto(warehouse))
}