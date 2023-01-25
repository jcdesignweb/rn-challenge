import { useFetchWrapper } from '@/lib/wrapper/fetch.wrapper';
import Warehouse from '@/models/warehouse.model';
import { urlPaths } from '@/utils'
import AuthService from './auth.service';

const fetchWrapper = useFetchWrapper();

export default class WarehouseService {

    static async getAll() {
        
        return fetchWrapper.get(`${urlPaths.SERVER_PATH}/v1/warehouse`)

    }

    static async create(warehouse: Warehouse) {

        const {code, name, city, address, state, country, zip} = warehouse

        return fetchWrapper.post(`${urlPaths.SERVER_PATH}/v1/warehouse`, { code, name, city, address, state, country, zip })

    }

    static async delete(code: string) {

        return fetchWrapper.delete(`${urlPaths.SERVER_PATH}/v1/warehouse?code=${code}`)
        
    }

    static async uploadFile(warehouse: Warehouse, file: any) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('code', warehouse.code)

        return fetchWrapper.patch(`${urlPaths.SERVER_PATH}/v1/warehouse/file`, formData, true)
    }

    static async downloadFile(warehouse: Warehouse) {
        const access_token = AuthService.getToken()
        if (access_token) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': access_token },
            };
    
            return fetch(`${urlPaths.SERVER_PATH}/v1/warehouse/${warehouse.code}/file/download`, requestOptions).then(response => response.blob())
        }
    }


    static async findNearest(address: string) {
        return fetchWrapper.get(`${urlPaths.SERVER_PATH}/v1/warehouse/nearest?address=${address}`)
    }


}