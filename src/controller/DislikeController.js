const Carros = require('../models/Carros');
const Usuarios = require('../models/Usuarios');
module.exports = { 
    async store(req, res){

        
        const { carroID } = req.body;
        const { userID } = req.params;

        const loggedUser = await Usuarios.findById(userID);
        const targetcar = await Carros.findById(carroID);

        if(!targetcar){
            return res.status(400).json({error: 'Carro não existe'});
        }
        targetcar.dislikes.push(loggedUser._id);
    
        await targetcar.save();
    
        return res.json(targetcar);
    },
}