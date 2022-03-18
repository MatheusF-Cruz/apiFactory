import Knex from 'knex'

export default Knex({
    client:'mysql2',
    connection:{
        host: '127.0.0.1',
        user: 'root',
        password: '1234',
        database:'projeto'
    }
})