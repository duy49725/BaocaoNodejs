const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
    id: { type: String, required: true },
    label: { type: String, required: true }
});

module.exports = mongoose.model('Publisher', publisherSchema);