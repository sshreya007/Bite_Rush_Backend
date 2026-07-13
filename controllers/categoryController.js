const Category = require('../models/Category');
const MenuItem = require('../models/MenuItem');

// @route  GET /api/categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/categories/:id/items
// Returns menu items belonging to this category, across all
// restaurants (e.g. tapping "Healthy Salads" shows every salad
// dish, from any restaurant, with its price).
const getCategoryItems = async (req, res) => {
  try {
    const items = await MenuItem.find({ category: req.params.id })
      .populate('restaurant', 'name')
      .sort({ name: 1 });

    return res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getCategories, getCategoryItems };
