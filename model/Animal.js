const {Schema, model} = require('mongoose');

const animalSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 250
    },
    age: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true
    },
    corral: {
        type: Schema.Types.ObjectId,
        ref: 'Corral',
        required: true
    },
    type:{
        type: Schema.Types.ObjectId,
        ref: 'Type',
        required: true
    }
},
{
    timestamps:true
}
);

module.exports = model('Animal', animalSchema);