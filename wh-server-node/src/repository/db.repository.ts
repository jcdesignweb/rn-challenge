import typeormDatasource from '../config/typeorm'

export async function init() {
    return new Promise((resolve: any, reject) => {
        typeormDatasource
            .initialize()
            .then(() => {
                console.log('Data Source has been initialized!')

                resolve()
            })
            .catch((err) => {
                reject(err)
                //console.error('Error during Data Source initialization', err)
            })
    })
}
