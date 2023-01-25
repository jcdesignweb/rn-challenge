import { PORT, HOSTNAME } from './config'
import { init } from './repository/db.repository'
import app from './app'

init()
    .then(() => {
        app.listen(PORT, HOSTNAME, () => {
            console.log(`Server running at http://${HOSTNAME}:${PORT}`)
        })
    })
    .catch((e) => {
        console.error('Error during Data Source initialization', e)
    })
