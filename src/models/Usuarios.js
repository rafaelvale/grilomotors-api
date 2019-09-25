const { model, Schema } = require('mongoose');


const UsuarioSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = model('Usuario', UsuarioSchema);