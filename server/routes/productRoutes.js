const express = require('express');
const router = express.Router();
const { 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  getPublicProducts, 
  getProductById 
} = require('../controllers/productController');
const { protect, authorize } = require('../middlewares/auth');

// Public routes
router.get('/', getPublicProducts);
router.get('/:id', getProductById);

// Protected routes (Only Sellers)
router.post('/', protect, authorize('SELLER'), createProduct);
router.put('/:id', protect, authorize('SELLER'), updateProduct);
router.delete('/:id', protect, authorize('SELLER'), deleteProduct);

module.exports = router;
