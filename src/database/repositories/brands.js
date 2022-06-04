class Brands{
    constructor(databaseConnection){
        this.databaseConnection = databaseConnection
    }

    get tableName(){
        return 'brands'
    }

    async getBrands(){
        return await this.databaseConnection(this.tableName)
    }
    async getBrandByName(name){
        return await this.databaseConnection(this.tableName).where({nome:name})
    }
    async getUserById(id){
        return await this.databaseConnection(this.tableName).where({id:id})
    }
    async create(brand){
        return await this.databaseConnection(this.tableName).insert(brand)
    }
}
export default Brands