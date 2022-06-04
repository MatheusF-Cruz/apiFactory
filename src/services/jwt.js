
import authConfig from "../config/auth.js"
class Jwt {
    constructor(Jwt, User) {
        this.jwt = Jwt
    }

    sign(email) {
        return this.jwt.sign({ email: email }, authConfig.secret, {
            expiresIn: authConfig.expiresIn,
        })
    }
     verify(token) {
        return this.jwt.verify(token, authConfig.secret);
    }
}

export default Jwt;