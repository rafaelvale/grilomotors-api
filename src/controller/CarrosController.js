const Carros = require('../models/Carros');
const Usuarios = require('../models/Usuarios');

module.exports = { 
    async index(req, res) {
        const { user } = req.headers;

        const loggeduser = await Usuarios.findById(user);
        
        console.log(loggeduser._id);
        const response = await Carros.find({
            $and: [
              {likes : { $nin: loggeduser._id } },

              {dislikes: { $nin: loggeduser._id } },
            ],
       
        })
        return res.json(response);
    },

    async store(req, res){
        const { modelo, valor, descricao, nome } = req.body;


        const response = await Carros.create({
                modelo,
                valor, 
                descricao, 
                nome
            });

            return res.json(response);
    }
}