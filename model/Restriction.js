const mongoose = require('mongoose');

const restrictionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 250
    },
    types:{
        type: Array,
        required: true
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model('Restriction', restrictionSchema);