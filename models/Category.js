const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true }, // URL
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
