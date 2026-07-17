const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    name: { type: String, required: true }, // snapshot at order time
    price: { type: Number, required: true }, // snapshot at order time
    quantity: { type: Number, required: true, min: 1 },
    addons: [{ type: String }], // e.g. ["Cheese", "Extra Sauce"]
    specialInstruction: { type: String, default: '' },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [orderItemSchema], required: true },
    deliveryAddress: { type: String, required: true },
    paymentMethod: { type: String, default: 'Cash' },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Placed', 'Preparing', 'On the way', 'Delivered'],
      default: 'Placed',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
