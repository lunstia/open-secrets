const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: {type: String, minLength: 1, required: true},
    password: {type: String, required: true},
    admin: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', User);