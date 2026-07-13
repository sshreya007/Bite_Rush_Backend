const express = require('express');
const router = express.Router();
const { getCategories, getCategoryItems } = require('../controllers/categoryController');

router.get('/', getCategories);
router.get('/:id/items', getCategoryItems);

module.exports = router;
