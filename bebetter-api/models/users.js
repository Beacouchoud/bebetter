const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('users', userSchema);


