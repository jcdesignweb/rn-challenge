export default interface Warehouse {
    id?: number
    code: string
    name: string
    address: string
    city: string
    state: string
    country: string
    zip: string
    latlong?: string
    list_file_name?: string
}