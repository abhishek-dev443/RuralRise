const prisma = require('../prisma/db');
const { productSchema } = require('../utils/validation');

// @desc    Create a product
// @route   POST /api/products
// @access  Private (SELLER)
const createProduct = async (req, res, next) => {
  try {
    const parseResult = productSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.errors[0].message });
    }

    const entrepreneur = await prisma.entrepreneurProfile.findUnique({
      where: { userId: req.user.id }
    });

    if (!entrepreneur) {
      res.status(403);
      throw new Error('You must create a storefront before adding products');
    }

    const product = await prisma.product.create({
      data: {
        ...parseResult.data,
        entrepreneurId: entrepreneur.id
      }
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (SELLER)
const updateProduct = async (req, res, next) => {
  try {
    const parseResult = productSchema.partial().safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.errors[0].message });
    }

    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { entrepreneur: true }
    });

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    if (product.entrepreneur.userId !== req.user.id && req.user.role !== 'ADMIN') {
      res.status(403);
      throw new Error('Not authorized to update this product');
    }

    const updatedProduct = await prisma.product.update({
      where: { id: req.params.id },
      data: parseResult.data
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (SELLER)
const deleteProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { entrepreneur: true }
    });

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    if (product.entrepreneur.userId !== req.user.id && req.user.role !== 'ADMIN') {
      res.status(403);
      throw new Error('Not authorized to delete this product');
    }

    await prisma.product.delete({
      where: { id: req.params.id }
    });

    res.status(200).json({ message: 'Product removed successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all public products
// @route   GET /api/products
// @access  Public
const getPublicProducts = async (req, res, next) => {
  try {
    const { search, category, location, minPrice, maxPrice } = req.query;
    
    let whereClause = { status: 'ACTIVE' };
    
    if (search) {
      whereClause.title = { contains: search, mode: 'insensitive' };
    }
    if (category) {
      whereClause.category = category;
    }
    if (location) {
      whereClause.location = location;
    }
    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price.gte = parseFloat(minPrice);
      if (maxPrice) whereClause.price.lte = parseFloat(maxPrice);
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        entrepreneur: {
          select: { storeName: true, slug: true, verificationStatus: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: {
        entrepreneur: {
          select: { storeName: true, slug: true, verificationStatus: true, ownerName: true, district: true, contactInfo: true }
        }
      }
    });

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getPublicProducts,
  getProductById
};
