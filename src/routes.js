import { Router } from "express"

import bcrypt from "bcryptjs";
import { usersDB,carsDB,brandsDB } from "./database/repositories/index.js";
import Auth from "./services/auth.js";
import Jwt from "./services/jwt.js";
import jwt from 'jsonwebtoken'


import authConfig from "./config/auth.js"

import AuthMiddleware from "./middlewares/authMiddeware.js";
import CrudUsers from "./business/UsersControllers/CrudUsers.js";
import CrudCars from "./business/CarsControllers/CrudCars.js";

const auth = new Auth(bcrypt)
const jsonwebtoken = new Jwt(jwt)
const userCrud = new CrudUsers()
const carCrud = new CrudCars()

const routes = new Router();


routes.post('/sessions', async (req, res) => {
    await getBusinessModule('SessionsController', req, res)
})
routes.post('/check', async (req, res) => {
    await getBusinessModule('AuthController', req, res)
})
routes.get('/hello', async (req, res) => {
    await getBusinessModule('HelloController', req, res)
})


routes.get('/users',async (req,res,next) =>{
    await buildAuthMiddleware(req, res, next)
}, async (req, res) => {
  
    await getBusinessModule('UserController', req, res, 'get')
})


// routes.get('/users/:id', auth, UsersController.show)

routes.get('/users/:id',async (req,res,next) =>{
    await buildAuthMiddleware(req, res, next)
}, async (req, res) => {
    await getBusinessModule('UserController', req, res, 'getbyId')
})


routes.post('/users',async (req,res,next) =>{
    await buildAuthMiddleware(req, res, next)
}, async (req, res) => {
    await getBusinessModule('UserController', req, res, 'create')
})

routes.put('/users',async (req,res,next) =>{
    await buildAuthMiddleware(req, res, next)
}, async (req, res) => {
    await getBusinessModule('UserController', req, res, 'update')
})

routes.delete('/users',async (req,res,next) =>{
    await buildAuthMiddleware(req, res, next)
}, async (req, res) => {
    await getBusinessModule('UserController', req, res, 'delete')
})

routes.get('/cars', async (req, res) => {
    await getBusinessModule('CarsController', req, res, 'get')
})

routes.post('/cars',async (req,res,next) =>{
    await buildAuthMiddleware(req, res, next)
}, async (req, res) => {
    await getBusinessModule('CarsController', req, res, 'create')
})

// routes.put('/users/:id', auth, UsersController.update)
// routes.delete('/users/:id', auth, UsersController.destroy)

// routes.get('/carros', getCars.index)
// routes.get('/carros/:id', getCar.index)

// routes.post('/insertcarros', auth,carrosController.createcar)

// routes.get('/marca/:id', getMarca.index)

// routes.delete('/deletecarros/:id',auth,carrosController.deletecar)

async function getBusinessModule(module, req, res, method = '') {
    let Module = await import(`./business/${module}.js`)
    Module = Module.default
    switch (module) {
        case 'SessionsController':
            return new Module(usersDB, req, res, auth, jsonwebtoken).main()
        case 'AuthController':
            return new Module(jsonwebtoken, req, res, usersDB).main()
        case 'UserController':
            return new Module(req,res,buildUserCrud(),method).main()
        case 'CarsController':
            return new Module(req,res,buildCarCrud(),method).main()
    }

}

function buildUserCrud() {
    return new CrudUsers(usersDB,auth)
}

function buildCarCrud() {
    return new CrudCars(carsDB,brandsDB)
}
function buildAuthMiddleware(req, res, next) {
    return new AuthMiddleware(req, res, next, jwt, authConfig,usersDB).main()
}

export default routes;