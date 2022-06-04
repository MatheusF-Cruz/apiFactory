// import User from "../models/User.js"
// import { createPasswordHash } from "../services/auth.js"
import assert from 'assert';

class CrudCars {
    constructor(Cars, Brands) {
        this.cars = Cars,
            this.brands = Brands
    }
    async index(req, res) {
        try {
            const cars = await this.cars.getCars();
            return res.json(cars)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: "Internal server error." })
        }
    }
    async create(req, res) {
        // try {
        //     const { email, password } = req.body;

        //     const user = await this.cars.getUserByEmail(email);

        //     if(user.length !== 0) {
        //         return res.status(422).json({ message: `User ${email} already exists.`})
        //     }

        //     //criptografa o password

        //     const encryptedPassword = await this.auth.createPasswordHash(password);



        //     const newUser = await this.cars.create({ 
        //         email, 
        //         password: encryptedPassword 
        //     })

        //     return res.status(201).json(newUser)

        // } catch (error) {
        //     console.log(error)
        //     return res.status(500).json({ error: "Internal server error." })
        // }   

        try {
            //atribuindo as variaveis do corpo da requisição
            this.verifyBody(req.body)

            let { marca, modelo, versao, combustivel, km, cor, valor, ano } = req.body


            //buscando na database se existe a marca enviada pelo cliente
            km = `${km}Km`
            valor = `R$${valor}`


            let marcadb = await this.brands.getBrandByName(marca.toUpperCase())
            //se nao existir marca insira na database
            if (marcadb.length === 0) {
                await this.brands.create({
                    nome: marca.toUpperCase()
                })
            }

            marcadb = await this.brands.getBrandByName(marca.toUpperCase())

            await this.cars.create({
                marca_id: marcadb[0].id,
                modelo,
                versao,
                combustivel,
                km,
                cor,
                valor,
                ano,
            })
            return res.status(201).json({ message: 'Veiculo cadastrado com Sucesso' })
        } catch (error) {
            if(error.message === 'Parametros Invalidos'){
                return res.status(400).json({ message:error.message})
            }  
            console.log(error)
            return res.status(500).json({ message: 'erro nao previsto' })
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const { email, password } = req.body;

            const user = await this.cars.findById(id)

            if (!user) {
                return res.status(404).json();
            }

            const encryptedPassword = await this.auth.createPasswordHash(password);

            await user.updateOne({
                email,
                password: encryptedPassword
            })

            return res.status(200).json();

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: "Internal server error." })
        }
    }
    async destroy(req, res) {
        try {
            const { id } = req.params;
            const user = await this.cars.findById(id);

            if (!user) {
                return res.status(404).json();
            }

            await this.cars.deleteOne();

            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }
    verifyBody(body) {
        try {
            let { marca, modelo, versao, combustivel, km, cor, valor, ano } = body

            assert(marca)
            assert(modelo)
            assert(versao)
            assert(combustivel)
            assert(km)
            assert(cor)
            assert(valor)
            assert(ano)
        }catch(error){
            throw new Error(`Parametros Invalidos`)
        }
        
    }
}

export default CrudCars;