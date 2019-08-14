const { model, Schema } = require('mongoose');

const CarrosSchema = new Schema({
    modelo:{
        type: String, 
        required: true
    },
    valor: {
         type: String,
         required: true
    },
    descricao: {
        type: String, 
        required: true
    },
    nome: {
        type: String, 
        required: true
    },
    fotos: [{
        type: String,
        require: true
    }],
    likes: [{
        type: Schema.Types.ObjectId, 
        ref: 'Usuario',
    }],
    dislikes: [{
        type: Schema.Types.ObjectId, 
        ref: 'Usuario',
    }]
},
{
    timestamps: true,
});


module.exports = model('Carros', CarrosSchema);