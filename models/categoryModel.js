const mongoose = require('mongoose');

const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const { Schema } = mongoose;

const CategoryModel = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  updated: { type: Date, default: Date.now() },
  slug: { type: String, slug: 'title' },
  thumbnail: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('Category', CategoryModel);
