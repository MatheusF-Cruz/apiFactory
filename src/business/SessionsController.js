// import jwt from "jsonwebtoken"

// import User from "../models/User.js"
// import { checkPassword } from "../services/auth.js"

// import authConfig from "../config/auth.js"

class SessionController {
    constructor(Users,req,res,Auth,Jwt){
        this.users= Users
        this.req = req
        this.res = res
        this.auth = Auth
        this.jwt = Jwt
    }
    
    async main() {

    try {
        const [email,password] = this.getCredentials(this.req.body)

        const user = await this.users.getUserByEmail(email)


        if(!user) {
            return this.res.status(401).json({ error: "User / password invalid." })
        }

        const passwordChecked = await this.auth.checkPassword(user[0],password)

        if(!passwordChecked) {
            return this.res.status(401).json({ error: "User / password invalid." })
        }

        const { id } = user[0];

        return this.res.json({
            user: {
                id:id,
                email:email
            },
            token: this.jwt.sign(id)
         }
        )
        
    } catch (error) {
        return this.res.status(error.status).json({ error: error.message })
    }
        
    }

    getCredentials(body){
        try {
            const { email, password } = body;

            if(!email || !password){
                throw new Error('Missing Credentials')
            }
            return [email,password]
        } catch (error) {
            const err = new Error(error.message)
            err.status = 400
            throw err
        }
       
        
    }

    
}

export default SessionController;