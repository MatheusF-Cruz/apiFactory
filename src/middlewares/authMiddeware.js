

class AuthMiddleware {
    constructor(req, res, next, jwt, authConfig,Users) {
        this.req = req
            this.res = res
            this.next = next
            this.jwt = jwt
            this.authConfig = authConfig
            this.users = Users
    }
    async main() {
        const authHeader = this.req.headers.authorization;

        if (!authHeader) {
            this.res.status(401).json({ error: 'Token was not provided.' })
        }

        //Chegara como: Bearer XXXX. Pegaremos a segunda string XXXX do array e o split removera os espaços.
        const [, token] = authHeader.split(' ')


        try {
            const decoded = this.jwt.verify(token, this.authConfig.secret);
            const user = await this.users.getUserByEmail(decoded.email)

            if(user.length !== 0)
            return this.next();
            else throw new Error('Invalid Token')
        } catch (error) {
            return this.res.status(401).json({ error: 'Invalid Token' })
        }
    }
}
export default AuthMiddleware