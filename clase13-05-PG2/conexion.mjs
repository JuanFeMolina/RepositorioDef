import {Pool} from 'pg'

const pool = new Pool({
    host: 'localhost',
    database: 'tienda',
    user: 'root',
    password: 'pass',
    puerto: 5432
})

export default pool 