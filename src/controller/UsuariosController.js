const axios = require('axios');

const Usuarios = require('../models/Usuarios');

module.exports = {
    async index (req, res){

        const usuarios = await Usuarios.find();


        return res.json(usuarios);
    },

    async store(req, res){
        const { nomeCompleto, email } = req.body;
        
        const userExists = await Usuarios.findOne({ nomeCompleto, email});

        if(userExists){
            return res.json(userExists);
        }

        const response = await Usuarios.create({
            nomeCompleto,
            email
        });
        return res.json(response);

    }
}