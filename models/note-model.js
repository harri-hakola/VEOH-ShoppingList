const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const note_schema = new Schema({
    text: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    image_url: {
        type: String,
        required: true
    }

});
const note_model = new mongoose.model('note', note_schema);

module.exports = note_model;