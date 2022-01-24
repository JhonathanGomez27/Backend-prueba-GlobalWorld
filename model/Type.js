const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 250
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model('Type', typeSchema);