class AuthController{
    constructor(Jwt,req,res,Users){
        this.jwt = Jwt
        this.req = req
        this.res = res
        this.users = Users
    }

    async main() {
        const authHeader = this.req.headers.authorization
        const [, token] = authHeader.split(' ')

        try {
            const decoded = this.jwt.verify(token); 

            const id = decoded.id;
            const user = await this.users.getUserById(id)

            return this.res.json(user[0].email)
        } catch (error) {
            return this.res.status(401).json({error: 'Invalid Token'})
        }
    }
}

export default AuthController;