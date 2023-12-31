const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    post: {type: String, required: true},
    date: {type: Date, default: Date.now},
    hideAuthor: {type: Boolean, default: true},
    hidePost: {type: Boolean, default: false}
});

module.exports = mongoose.model('Post', Post);