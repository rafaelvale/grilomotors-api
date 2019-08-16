const { model, Schema } = require('mongoose');


const UsuarioSchema = new Schema({

    nomeCompleto: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: false
    },
}, {
    timestamps: true
});

module.exports = model('Usuario', UsuarioSchema);