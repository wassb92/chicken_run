const mongoose = require('mongoose');
require('dotenv');

const PostSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    birthday: Date,
    weight: {
        type: Number,
        required: true
    },
    steps: {
        type: Number,
        default: 0
    },
    isRunning: {
        type: Boolean,
        default: false
    }
}, {collection: process.env.COLLECTION_NAME});

module.exports = mongoose.model(process.env.COLLECTION_NAME, PostSchema);