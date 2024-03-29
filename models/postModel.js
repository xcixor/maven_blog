const mongoose = require('mongoose');

const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const { Schema } = mongoose;

const PostModel = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  epigraph: { type: String, required: true },
  publish_date: { type: Date },
  updated: { type: Date, default: Date.now() },
  slug: { type: String, slug: 'title' },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  thumbnail: { data: Buffer, contentType: String },
  featured: { type: Boolean, default: false },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  tags: [String],
  status: { type: String, enum: ['Draft', 'Published', 'Archive'], default: 'Draft' }
});

module.exports = mongoose.model('Post', PostModel);
