// import User from "../models/User.js"
// import { createPasswordHash } from "../services/auth.js"

class CrudUsers {
    constructor(Users,auth){
        this.users = Users
        this.auth = auth
    }
    async index(req, res) {
        try {
            const users = await this.users.getUsers();
            return res.json(users)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: "Internal server error." })
        }
    }
    async show(req, res) {
        try {
            const { id } = req.params;
            const user = await this.users.getUserById(id)
            
            if (!user) {
                return res.status(404).json();
            }

            return res.json(user)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: "Internal server error." })
        }
    }
    async create(req, res) {
        try {
            const { email, password } = req.body;

            const user = await this.users.getUserByEmail(email);

            if(user.length !== 0) {
                return res.status(422).json({ message: `User ${email} already exists.`})
            }

            //criptografa o password

            const encryptedPassword = await this.auth.createPasswordHash(password);



            const newUser = await this.users.create({ 
                email, 
                password: encryptedPassword 
            })

            return res.status(201).json(newUser)

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: "Internal server error." })
        }   
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const { email, password } = req.body;

            const user = await this.users.findById(id)

            if(!user) { 
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
            const user = await this.users.findById(id);

            if(!user) {
                return res.status(404).json();
            }

            await this.users.deleteOne();

            return res.status(200).json();
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error." });
        }
    }
}

export default  CrudUsers;