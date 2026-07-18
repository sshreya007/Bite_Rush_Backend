const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');

// @route  GET /api/search?q=burger
const search = async (req, res) => {
  try {
    const query = (req.query.q || '').trim();
    if (!query) {
      return res.status(200).json({ items: [], restaurants: [] });
    }

    const regex = new RegExp(query, 'i'); // case-insensitive partial match

    const [items, restaurants] = await Promise.all([
      MenuItem.find({ name: regex }).populate('restaurant', 'name').populate('category', 'name'),
      Restaurant.find({ name: regex }),
    ]);

    return res.status(200).json({ items, restaurants });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { search };
