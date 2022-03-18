import databaseConnection from './connection.js'

import Users from './users.js'
const usersDB = new Users(databaseConnection);


export {
    usersDB
}