const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true }, // e.g. "Fresh & Spicy Delicious Chicken"
    image: { type: String, required: true },
    discountPercent: { type: Number, default: 0 }, // e.g. 50 for "Save 50%"
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Offer', offerSchema);
