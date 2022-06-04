class Cars{
    constructor(databaseConnection){
        this.databaseConnection = databaseConnection
    }

    get tableName(){
        return 'cars'
    }

    async getCars(){
        return await this.databaseConnection(this.tableName)
    }
    async getUserByEmail(email){
        return await this.databaseConnection(this.tableName).where({email:email})
    }
    async getUserById(id){
        return await this.databaseConnection(this.tableName).where({id:id})
    }
    async create(car){
        return await this.databaseConnection(this.tableName).insert(car)
    }
}
export default Cars