// import User from "../models/User.js"
// import { createPasswordHash } from "../services/auth.js"

class UserController {
    constructor(req,res,Crud, method) {
        this.req = req
        this.res = res
        this.Crud = Crud
        this.method = method
    }
    async main() {
        try {
            switch (this.method) {
                case 'get':
                    return this.Crud.index(this.req,this.res)
                case 'getbyId':
                    return this.Crud.show(this.req,this.res)
                case 'create':
                    return this.Crud.create(this.req,this.res)
                case 'update':
                    return this.Crud.update(this.req,this.res)
                case 'delete':
                    return this.Crud.destroy(this.req,this,res)
            }
        } catch (error) {
            console.log(error)
        }
    }
    // async create(req, res) {
    //     try {
    //         const { email, password } = req.body;

    //         const user = await User.findOne({ email });

    //         if(user) {
    //             return res.status(422).json({ message: `User ${email} already exists.`})
    //         }

    //         //criptografa o password

    //         const encryptedPassword = await createPasswordHash(password);



    //         const newUser = await User.create({ 
    //             email, 
    //             password: encryptedPassword 
    //         })

    //         return res.status(201).json(newUser)

    //     } catch (error) {
    //         console.log(error)
    //         return res.status(500).json({ error: "Internal server error." })
    //     }   
    // }
    // async update(req, res) {
    //     try {
    //         const { id } = req.params;
    //         const { email, password } = req.body;

    //         const user = await User.findById(id)

    //         if(!user) { 
    //             return res.status(404).json();
    //         }

    //         const encryptedPassword = await createPasswordHash(password);

    //         await user.updateOne({ 
    //             email, 
    //             password: encryptedPassword  
    //         })

    //         return res.status(200).json();

    //     } catch (error) {
    //         console.log(error)
    //         return res.status(500).json({ error: "Internal server error." })
    //     }
    // }
    // async destroy(req, res) {
    //     try {
    //         const { id } = req.params;
    //         const user = await User.findById(id);

    //         if(!user) {
    //             return res.status(404).json();
    //         }

    //         await user.deleteOne();

    //         return res.status(200).json();
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).json({ error: "Internal server error." });
    //     }
    // }
}

export default UserController;