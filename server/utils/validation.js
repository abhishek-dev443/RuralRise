const { z } = require('zod');

// Existing Auth schemas
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['CUSTOMER', 'SELLER', 'ADMIN']).optional(),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Phase 3 Schemas
const storefrontSchema = z.object({
  storeName: z.string().min(2, 'Store name is required'),
  ownerName: z.string().min(2, 'Owner name is required'),
  description: z.string().optional(),
  businessCategory: z.string().min(2, 'Business category is required'),
  yearsInBusiness: z.number().int().nonnegative().optional(),
  contactInfo: z.string().optional(),
  socialLinks: z.any().optional(),
  village: z.string().optional(),
  district: z.string().min(2, 'District is required'),
  state: z.string().optional(),
  profileImage: z.string().url().optional(),
  coverImage: z.string().url().optional(),
});

const productSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().min(10, 'Description needs to be detailed'),
  price: z.number().positive('Price must be greater than 0'),
  stock: z.number().int().nonnegative('Stock cannot be negative'),
  category: z.string().min(2, 'Category is required'),
  imageUrls: z.array(z.string().url()).optional(),
  location: z.string().min(2, 'Location is required'),
  qualityInfo: z.string().optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  storefrontSchema,
  productSchema
};
