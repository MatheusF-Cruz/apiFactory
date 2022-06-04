import dotenv from 'dotenv'


dotenv.config({
    path: `./${process.env.NODE_ENV}.env`
});

module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: '3306',
            database: process.env.DB_DATABASE
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: `${__dirname}/src/database/migrations`
        },
        seeds: {
            directory: `${__dirname}/src/database/seeds`
        }
    }
};

