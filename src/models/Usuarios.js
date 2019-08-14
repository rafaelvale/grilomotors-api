const { model, Schema } = require('mongoose');


const UsuarioSchema = new Schema({

    nomeCompleto: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
}, {
    timestamps: true
});

module.exports = model('Usuario', UsuarioSchema);