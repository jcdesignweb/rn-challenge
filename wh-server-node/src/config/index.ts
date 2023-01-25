import * as dotenv from 'dotenv'

dotenv.config({ path: `.env` })

export const MY_SQL_DB_CONNECTION_LIMIT = process.env.MY_SQL_DB_CONNECTION_LIMIT
    ? parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT)
    : 4

export const {
    NODE_ENV,
    HOSTNAME,
    PORT,
    MYSQL_DATABASE_HOST,
    MYSQL_DATABASE_NAME,
    MYSQL_DATABASE_USER,
    MYSQL_DATABASE_PASSWORD,
    JWT_SECRET,
    GOOGLE_API_KEY
} = process.env
