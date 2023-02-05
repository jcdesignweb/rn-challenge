import Warehouse from "src/entity/warehouse.entity";
import { WarehouseResponseDto } from "./get.dto";

/**
* Search Location
* @typedef {object} SearchLocation
* @property {number} lat - Search Latitude
* @property {number} lng - Seach Longitude
*/
export class SearchLocation {
    public readonly lat: number;
    public readonly lng: number;

    constructor(lat: number, lng: number) {
        this.lat = lat
        this.lng = lng
    }
}

/**
 * Markers found
 * @typedef {object} MarkerNear
 * @property {WarehouseEntity} warehouse - Warehouse
 * @property {number} distance
 */
export class MarkerNear {
    public readonly warehouse: WarehouseResponseDto;
    public readonly distance: number;

    constructor(warehouse: Warehouse, distance: number) {
        this.warehouse = new WarehouseResponseDto(warehouse) 
        this.distance = distance
    }
}

/**
* NearestResponse
* @typedef {object} WarehouseNearest
* @property {SearchLocation} searchLocation - Search location
* @property {Array<MarkerNear>} markers - Warehouses Entity
*/

/**
* Nearest Warehouse
* @typedef {object} WarehouseNearestResponse
* @property {boolean} success - Warehouse code
* @property {WarehouseNearest} response - Warehouses
*/


export class NearestResponseDto {
    public readonly searchLocation: SearchLocation;
    public readonly markers: Array<MarkerNear>;

    constructor(searchLocation: SearchLocation,  markers: Array<MarkerNear>) {
        this.searchLocation = searchLocation
        this.markers = markers
    }
}
