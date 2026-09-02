const express = require('express');
const router = express.Router();
const { upsertStorefront, getPublicStorefronts, getStorefrontBySlug } = require('../controllers/entrepreneurController');
const { protect, authorize } = require('../middlewares/auth');

// Public routes
router.get('/', getPublicStorefronts);
router.get('/:slug', getStorefrontBySlug);

// Protected routes (Only Sellers)
router.post('/storefront', protect, authorize('SELLER'), upsertStorefront);

module.exports = router;
