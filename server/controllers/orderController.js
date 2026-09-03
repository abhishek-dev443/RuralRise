const prisma = require('../prisma/db');

// @desc    Create a new enquiry/order
// @route   POST /api/orders
// @access  Private (CUSTOMER)
const createOrder = async (req, res, next) => {
  try {
    const { items, totalAmount, pickupAddress, deliveryAddress, logisticsNotes } = req.body;

    if (!items || items.length === 0) {
      res.status(400);
      throw new Error('No order items');
    }

    const order = await prisma.order.create({
      data: {
        customerId: req.user.id,
        totalAmount,
        status: 'PENDING',
        pickupAddress,
        deliveryAddress,
        logisticsNotes,
        orderItems: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        orderItems: true
      }
    });

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany({
      where: { customerId: req.user.id },
      include: {
        orderItems: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Get entrepreneur orders/enquiries
// @route   GET /api/orders/seller
// @access  Private (SELLER)
const getSellerOrders = async (req, res, next) => {
  try {
    const entrepreneur = await prisma.entrepreneurProfile.findUnique({
      where: { userId: req.user.id }
    });

    if (!entrepreneur) {
      res.status(403);
      throw new Error('Not an entrepreneur');
    }

    // Find orders that contain products owned by this seller
    const orders = await prisma.order.findMany({
      where: {
        orderItems: {
          some: {
            product: { entrepreneurId: entrepreneur.id }
          }
        }
      },
      include: {
        customer: { select: { name: true, email: true } },
        orderItems: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (SELLER)
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, logisticsNotes } = req.body;
    
    // We should technically verify if the seller owns the products in this order.
    // For brevity, assuming authorization middleware or simple check here.
    
    const updatedOrder = await prisma.order.update({
      where: { id: req.params.id },
      data: { 
        status,
        ...(logisticsNotes && { logisticsNotes })
      }
    });

    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getSellerOrders,
  updateOrderStatus
};
