const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');

// @route  GET /api/restaurants
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ name: 1 });
    return res.status(200).json({ restaurants });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/restaurants/:id
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    return res.status(200).json({ restaurant });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/restaurants/:id/menu
const getRestaurantMenu = async (req, res) => {
  try {
    const items = await MenuItem.find({ restaurant: req.params.id })
      .populate('category', 'name')
      .sort({ name: 1 });

    return res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getRestaurants, getRestaurantById, getRestaurantMenu };
