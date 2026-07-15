const express = require('express');
const router = express.Router();
const { getOffers, getOfferById } = require('../controllers/offerController');

router.get('/', getOffers);
router.get('/:id', getOfferById);

module.exports = router;
