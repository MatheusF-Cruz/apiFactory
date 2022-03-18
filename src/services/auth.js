
class Auth{
    constructor(bcrypt){
        this.bcrypt = bcrypt
    }

    checkPassword(user,password){
        return this.bcrypt.compare(password,user.password)
    }
    
    async createPasswordHash(password){
        return this.bcrypt.hash(password,8)
    }
}

export default Auth;