const prisma = require('../prisma/db');
const { storefrontSchema } = require('../utils/validation');

// @desc    Create or update storefront
// @route   POST /api/entrepreneurs/storefront
// @access  Private (SELLER)
const upsertStorefront = async (req, res, next) => {
  try {
    const parseResult = storefrontSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.errors[0].message });
    }

    const data = parseResult.data;
    
    // Generate slug from storeName
    const slug = data.storeName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const profile = await prisma.entrepreneurProfile.upsert({
      where: { userId: req.user.id },
      update: {
        ...data,
        slug 
      },
      create: {
        ...data,
        slug,
        userId: req.user.id
      }
    });

    res.status(200).json(profile);
  } catch (error) {
    if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
      return res.status(400).json({ error: 'A storefront with a similar name already exists. Please choose a slightly different name.' });
    }
    next(error);
  }
};

// @desc    Get all public storefronts
// @route   GET /api/entrepreneurs
// @access  Public
const getPublicStorefronts = async (req, res, next) => {
  try {
    const { district, category } = req.query;
    let whereClause = {};
    if (district) whereClause.district = district;
    if (category) whereClause.businessCategory = category;

    const storefronts = await prisma.entrepreneurProfile.findMany({
      where: whereClause,
      include: {
        user: { select: { name: true, email: true } }
      }
    });
    res.status(200).json(storefronts);
  } catch (error) {
    next(error);
  }
};

// @desc    Get storefront by slug
// @route   GET /api/entrepreneurs/:slug
// @access  Public
const getStorefrontBySlug = async (req, res, next) => {
  try {
    const profile = await prisma.entrepreneurProfile.findUnique({
      where: { slug: req.params.slug },
      include: {
        products: {
          where: { status: 'ACTIVE' }
        }
      }
    });

    if (!profile) {
      res.status(404);
      throw new Error('Storefront not found');
    }

    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upsertStorefront,
  getPublicStorefronts,
  getStorefrontBySlug
};
