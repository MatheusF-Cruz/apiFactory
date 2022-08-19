class AuthController{
    constructor(Jwt,req,res,Users){
        this.jwt = Jwt
        this.req = req
        this.res = res
        this.users = Users
    }

    async main() {
        // const authHeader = this.req.headers.authorization
        try {
            const authHeader = this.getToken(this.req.headers.authorization)

            const [, token] = authHeader.split(' ')

            const decoded = this.jwt.verify(token); aaaa

            const id = decoded.id;
            const user = await this.users.getUserById(id)

            return this.res.json(user[0].email)
        } catch (error) {
            return this.res.status(error.status).json({error: error.message})
        }
    }

    getToken(auth) {
        try {
            const authHeader = auth
            if(!authHeader) throw new Error('Missing Token')  
            return authHeader
        } catch (error) {
            const err = new Error(error.message)
            err.status = 400
            throw err         
        }
    }
}

export default AuthController;