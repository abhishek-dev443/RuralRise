const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const {
  getStats,
  getEntrepreneurs,
  getProducts,
  getVerifications,
  updateVerificationStatus
} = require('../controllers/adminController');

// All admin routes require authentication and ADMIN role
router.use(protect);
router.use(authorize('ADMIN'));

router.get('/stats', getStats);
router.get('/entrepreneurs', getEntrepreneurs);
router.get('/products', getProducts);
router.get('/verifications', getVerifications);
router.put('/verifications/:id', updateVerificationStatus);

module.exports = router;
