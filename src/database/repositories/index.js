import databaseConnection from './connection.js'

import Users from './users.js'
const usersDB = new Users(databaseConnection);

import Cars from './cars.js';
const carsDB = new Cars(databaseConnection);

import Brands from './brands.js';
const brandsDB = new Brands(databaseConnection);
export {
    usersDB,
    carsDB,
    brandsDB
}