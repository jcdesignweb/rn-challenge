
/**
 * A Warehouse Request type
 * @typedef {object} WarehouseRequest
 * @property {string} code.required - Warehouse code
 * @property {string} name.required - name
 * @property {string} city.required - Warehouse city name
 * @property {string} address.required - Warehouse's address name
 * @property {string} state.required - Warehouse's state name
 * @property {string} country.required - Warehouse city name  
 * @property {string} zip.required - Warehouse city name  
*/
export interface CreateWarehouseDto {
    code: string
    name: string
    city: string
    address: string
    state: string
    country: string
    zip: string
}



