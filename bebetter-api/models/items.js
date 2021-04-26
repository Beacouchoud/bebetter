const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = new Schema({
    owner: {
        type: String,
        trim: true,
        unique: true
    },
    title: {
        type: String,
        trim: true
    },
    subtitle: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    records: {
        type: Array
    },
    private: {
        type: Boolean
    },
    graph: {
        type: Number
    },
    units: {
        type: String
    }
});

module.exports = mongoose.model('items', itemSchema);