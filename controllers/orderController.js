const Order = require('../models/Order');

// @route  POST /api/orders   (protected)
const createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    if (!deliveryAddress) {
      return res.status(400).json({ message: 'Delivery address is required' });
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      items,
      deliveryAddress,
      paymentMethod: paymentMethod || 'Cash',
      totalAmount,
    });

    return res.status(201).json({ order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/orders   (protected) — this user's order history
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/orders/:id   (protected) — for delivery tracking status
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json({ order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getMyOrders, getOrderById };
