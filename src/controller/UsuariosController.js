const axios = require('axios');

const Usuarios = require('../models/Usuarios');

module.exports = {
    async index (req, res){

        const usuarios = await Usuarios.find();


        return res.json(usuarios);
    },

    async store(req, res){
        const { nomeCompleto} = req.body;
        
        const userExists = await Usuarios.findOne({ nomeCompleto});

        if(userExists){
            return res.json(userExists);
        }

        const response = await Usuarios.create({
            nomeCompleto
        });
        return res.json(response);

    }
}