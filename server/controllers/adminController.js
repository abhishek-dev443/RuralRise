const prisma = require('../prisma/db');

// @desc    Get platform statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getStats = async (req, res, next) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalEntrepreneurs = await prisma.entrepreneurProfile.count();
    const totalProducts = await prisma.product.count();
    const totalOrders = await prisma.order.count();
    const pendingVerifications = await prisma.entrepreneurProfile.count({
      where: { verificationStatus: 'PENDING' }
    });

    res.json({
      totalUsers,
      totalEntrepreneurs,
      totalProducts,
      totalOrders,
      pendingVerifications
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all entrepreneurs
// @route   GET /api/admin/entrepreneurs
// @access  Private/Admin
const getEntrepreneurs = async (req, res, next) => {
  try {
    const entrepreneurs = await prisma.entrepreneurProfile.findMany({
      include: {
        user: { select: { email: true, name: true, createdAt: true } },
        _count: { select: { products: true } }
      },
      orderBy: { user: { createdAt: 'desc' } }
    });
    res.json(entrepreneurs);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products
// @route   GET /api/admin/products
// @access  Private/Admin
const getProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        entrepreneur: { select: { storeName: true, ownerName: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Get verification requests
// @route   GET /api/admin/verifications
// @access  Private/Admin
const getVerifications = async (req, res, next) => {
  try {
    const requests = await prisma.entrepreneurProfile.findMany({
      where: { verificationStatus: 'PENDING' },
      include: { user: { select: { email: true, name: true } } },
      orderBy: { user: { createdAt: 'desc' } }
    });
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

// @desc    Update verification status
// @route   PUT /api/admin/verifications/:id
// @access  Private/Admin
const updateVerificationStatus = async (req, res, next) => {
  try {
    const { status, badgeLevel } = req.body;
    const { id } = req.params;

    if (!['APPROVED', 'REJECTED', 'PENDING'].includes(status)) {
      res.status(400);
      throw new Error('Invalid status');
    }

    const updatedProfile = await prisma.entrepreneurProfile.update({
      where: { id },
      data: {
        verificationStatus: status,
        badgeLevel: status === 'APPROVED' ? (badgeLevel || 'VERIFIED') : null
      }
    });

    res.json(updatedProfile);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
  getEntrepreneurs,
  getProducts,
  getVerifications,
  updateVerificationStatus
};
