import { DataSource } from 'typeorm'
import entities from '../entity/index'

import {
    MYSQL_DATABASE_HOST,
    MYSQL_DATABASE_NAME,
    MYSQL_DATABASE_USER,
    MYSQL_DATABASE_PASSWORD,
    NODE_ENV
} from '../config'

const { Warehouse, User } = entities

const dataSource = new DataSource({
    type: 'mysql',
    host: MYSQL_DATABASE_HOST,
    port: 3306,
    username: MYSQL_DATABASE_USER,
    password: MYSQL_DATABASE_PASSWORD,
    database: MYSQL_DATABASE_NAME,
    entities: [Warehouse, User],
    logging: false,
    synchronize: false,
    migrations: ['./db/migrate/**/*{.ts,.js}'],
    migrationsTableName: 'migration'
})

export default dataSource
