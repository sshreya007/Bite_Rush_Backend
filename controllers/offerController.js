const Offer = require('../models/Offer');

// @route  GET /api/offers
const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find().populate('restaurant', 'name').sort({ createdAt: -1 });
    return res.status(200).json({ offers });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @route  GET /api/offers/:id
const getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id).populate('restaurant', 'name');
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    return res.status(200).json({ offer });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getOffers, getOfferById };
