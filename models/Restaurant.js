const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true }, // card thumbnail
    banner: { type: String }, // wide banner image for restaurant details page
    description: { type: String, default: '' },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    cuisine: { type: String, default: '' }, // e.g. "Japanese", "Fast Food"
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Restaurant', restaurantSchema);
