const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    paragraphs: { type: Number, required: true },
    preview: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Disabled'], default: 'Active' },
});

module.exports = mongoose.model('Article', articleSchema);
