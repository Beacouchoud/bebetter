const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const friendSchema = new Schema({
    owner: {
        type: String,
        trim: true,
        unique: true
    },
    friends: {
        type: Array
    },
    friendshipRequest: {
        type: Array
    }
});

module.exports = mongoose.model('friends', friendSchema);