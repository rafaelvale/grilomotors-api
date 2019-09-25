const Carros = require('../models/Carros');

module.exports = { 

    async index(req, res){

        const { carroID } = req.params;

        const arquivo = await Carros.findById(carroID);

        console.log(arquivo.fotos);
        
        return res.json(arquivo.fotos)

    },

    async store(req, res){

        
        const { carroID } = req.params;
        const { filename: fotos} = req.file;

        console.log(carroID);

        const [name] = fotos.split('.');

        const filename = `${name}.jpg`;

        const targetcar = await Carros.findById(carroID);

        console.log(targetcar);

        if(!targetcar){
            return res.status(400).json({error: 'Carro não existe'});
        }


        targetcar.fotos.push(filename);
    
        await targetcar.save();
    
        return res.json(targetcar);
    },
}
