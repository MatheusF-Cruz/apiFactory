
import authConfig from "../config/auth.js"
class Jwt {
    constructor(Jwt, User) {
        this.jwt = Jwt
    }

    sign(id) {
        return this.jwt.sign({ id: id }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
        })
    }
     verify(token) {
        return this.jwt.verify(token, authConfig.secret);
    }
}

export default Jwt;