const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
  createOrder,
  getMyOrders,
  getSellerOrders,
  updateOrderStatus
} = require('../controllers/orderController');

router.use(protect);

router.post('/', createOrder);
router.get('/myorders', getMyOrders);
router.get('/seller', getSellerOrders);
router.put('/:id/status', updateOrderStatus);

module.exports = router;
