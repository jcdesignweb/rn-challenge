interface UrlPathsConfig {
    SERVER_PATH: string,
    MAP_KEY: string
}

const urlPaths: UrlPathsConfig = {
    SERVER_PATH: import.meta.env.VITE_SERVER_PATH || 'http://localhost:3000',
    MAP_KEY: import.meta.env.MAP_KEY || 'AIzaSyAsUkfG3zHn5tbyYI70J2vmdN_z2CFquxs'
}



export {
    urlPaths
}
