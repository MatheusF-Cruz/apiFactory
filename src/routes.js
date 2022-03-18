import { Router } from "express"

import bcrypt from "bcryptjs";
import { usersDB } from "./database/repositories/index.js";
import Auth from "./services/auth.js";
import Jwt from "./services/jwt.js";
import jwt from 'jsonwebtoken'

const auth = new Auth(bcrypt)
const jsonwebtoken = new Jwt(jwt)

const routes = new Router();

routes.post('/sessions', async (req,res)=>{
    await getBusinessModule('SessionsController',req,res)
})
routes.post('/check', async (req,res)=>{
    await getBusinessModule('AuthController',req,res)
})
// routes.get('/hello', HelloController.index)


// routes.get('/users', auth, UsersController.index)
// routes.get('/users/:id', auth, UsersController.show)
// routes.post('/users', auth, UsersController.create)
// routes.put('/users/:id', auth, UsersController.update)
// routes.delete('/users/:id', auth, UsersController.destroy)

// routes.get('/carros', getCars.index)
// routes.get('/carros/:id', getCar.index)

// routes.post('/insertcarros', auth,carrosController.createcar)

// routes.get('/marca/:id', getMarca.index)

// routes.delete('/deletecarros/:id',auth,carrosController.deletecar)

async function getBusinessModule(module,req,res){
    let Module = await import(`./business/${module}.js`)
    Module =  Module.default
    switch(module){
        case 'SessionsController':
            return new Module (usersDB,req,res,auth,jsonwebtoken).main()
        case 'AuthController':
            return new Module(jsonwebtoken,req,res,usersDB).main()
    }
    
}

export default routes;