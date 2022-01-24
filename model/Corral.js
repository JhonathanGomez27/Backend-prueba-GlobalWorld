const {Schema, model} = require('mongoose');

const corralSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 250
    },
    capacity:{
        type: Number,
        required: true
    },
    restrictions: {
        type: Schema.Types.ObjectId,
        ref: 'Restriccion',
        required: true
    },
    animals: {
        type: Array,
        required: false,
    }
},
{
    timestamps:true
}
);

module.exports = model('Corral', corralSchema);