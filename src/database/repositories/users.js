class Users{
    constructor(databaseConnection){
        this.databaseConnection = databaseConnection
    }

    get tableName(){
        return 'users'
    }

    async getUsers(){
        return await this.databaseConnection(this.tableName)
    }
    async getUserByEmail(email){
        return await this.databaseConnection(this.tableName).where({email:email})
    }
    async getUserById(id){
        return await this.databaseConnection(this.tableName).where({id:id})
    }
    async create(user){
        return await this.databaseConnection(this.tableName).insert(user)
    }
}
export default Users