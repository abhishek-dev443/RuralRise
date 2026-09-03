const express = require('express');
const router = express.Router();
const { upsertStorefront, getPublicStorefronts, getStorefrontBySlug, getMe } = require('../controllers/entrepreneurController');
const { protect, authorize } = require('../middlewares/auth');

// Protected routes (Only Sellers)
router.get('/me', protect, authorize('SELLER'), getMe);
router.post('/storefront', protect, authorize('SELLER'), upsertStorefront);

// Public routes
router.get('/', getPublicStorefronts);
router.get('/:slug', getStorefrontBySlug);

module.exports = router;
