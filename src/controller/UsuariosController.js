const axios = require('axios');

const Usuarios = require('../models/Usuarios');

module.exports = {
    async index (req, res){
        const { email, password} = req.body;

        const usuarios = await Usuarios.findOne(email, password);

        return res.json(usuarios);
    },

    async store(req, res){
        const { name, email, password} = req.body;
        
        const userExists = await Usuarios.findOne({ email, password });

        if(userExists){
            return res.json(userExists);
        }

        const response = await Usuarios.create({
            name, 
            email, 
            password
        });

        return res.json(response);

    }
}