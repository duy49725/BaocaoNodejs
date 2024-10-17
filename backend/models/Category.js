const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id: { type: String, required: true },
    label: { type: String, required: true }
});

module.exports = mongoose.model('Category', categorySchema);