import axios from 'axios'
import { GOOGLE_API_KEY } from '../config'

const GOOGLE_BASE_URL = 'https://maps.googleapis.com/maps/api'

export const geodecodeAddressCoors = async (address: string): Promise<string> => {
    const result: any = await axios.get(
        `${GOOGLE_BASE_URL}/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`
    )
    const geometry: any = result.data.results[0].geometry.location

    const latlong = `${geometry.lat}, ${geometry.lng}`
    return latlong
}

export const googleDirections = async (origin: string, destination: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${GOOGLE_BASE_URL}&origin=${origin}&destination=${destination}`)
            .then((response) => {
                const values: any = response.data.routes[0].legs[0]
                resolve(values)
            })
            .catch((error) => {
                console.error('Error getting google results', error)

                reject(error)
            })
    })
}
