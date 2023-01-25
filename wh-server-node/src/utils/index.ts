export type Location = {
    lat: any
    lng: any
}

export function calculateDistance(loc1: Location, loc2: Location) {
    const rad = function (x: number) {
        return (x * Math.PI) / 180
    }

    const R = 6378137
    const dLat = rad(loc2.lat - loc1.lat)
    const dLong = rad(loc2.lng - loc1.lng)
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(loc1.lat)) *
            Math.cos(rad(loc2.lat)) *
            Math.sin(dLong / 2) *
            Math.sin(dLong / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c
    return Math.round(d) // returns the distance in meter
}
