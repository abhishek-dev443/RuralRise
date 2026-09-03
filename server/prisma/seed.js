const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
  };

  const demoPassword = await hashPassword('password123');

  // --- DEMO ACCOUNTS ---
  // 1. Admin
  await prisma.user.upsert({
    where: { email: 'admin@ruralrise.com' },
    update: {},
    create: {
      email: 'admin@ruralrise.com',
      name: 'System Admin',
      passwordHash: demoPassword,
      role: 'ADMIN',
    },
  });

  // 2. Customer
  await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      name: 'Demo Customer',
      passwordHash: demoPassword,
      role: 'CUSTOMER',
    },
  });

  // --- ENTREPRENEUR 1: Handicrafts (Kolhapur) ---
  const user1 = await prisma.user.upsert({
    where: { email: 'ramesh.crafts@example.com' },
    update: {},
    create: {
      email: 'ramesh.crafts@example.com',
      name: 'Ramesh Patil',
      passwordHash: demoPassword,
      role: 'SELLER',
    },
  });

  const profile1 = await prisma.entrepreneurProfile.upsert({
    where: { slug: 'ramesh-kolhapuri-crafts' },
    update: {},
    create: {
      userId: user1.id,
      slug: 'ramesh-kolhapuri-crafts',
      storeName: 'Ramesh Kolhapuri Crafts',
      ownerName: 'Ramesh Patil',
      profileImage: 'https://placehold.co/400x400/10B981/FFF?text=RK',
      coverImage: 'https://placehold.co/1200x400/065F46/FFF?text=Authentic+Kolhapuri+Crafts',
      description: 'We are a 3rd generation family of artisans from Kolhapur. We specialize in authentic handcrafted leather goods and traditional crafts, preserving the rich heritage of Maharashtra.',
      businessCategory: 'Handicrafts',
      yearsInBusiness: 15,
      contactInfo: '+91 98765 43210',
      village: 'Shiroli',
      district: 'Kolhapur',
      state: 'Maharashtra',
      verificationStatus: 'APPROVED',
      badgeLevel: 'PREMIUM',
    },
  });

  // Check if products exist for this profile
  const products1 = await prisma.product.findMany({ where: { entrepreneurId: profile1.id } });
  if (products1.length === 0) {
    await prisma.product.createMany({
      data: [
        {
          entrepreneurId: profile1.id,
          title: 'Premium Handcrafted Leather Chappal',
          description: 'Authentic Kolhapuri chappals made from genuine, naturally tanned leather. Features traditional braided patterns and extreme durability.',
          price: 1200.00,
          stock: 50,
          category: 'Handicrafts',
          location: 'Kolhapur',
          status: 'ACTIVE',
          qualityInfo: 'Hand-stitched using 100% genuine leather. No synthetic materials used.',
          imageUrls: ['https://placehold.co/600x600/e5e7eb/6b7280?text=Leather+Chappal'],
        },
        {
          entrepreneurId: profile1.id,
          title: 'Traditional Leather Wallet',
          description: 'A compact and durable leather wallet hand-tooled by master artisans. Features multiple card slots and a coin pouch.',
          price: 850.00,
          stock: 30,
          category: 'Handicrafts',
          location: 'Kolhapur',
          status: 'ACTIVE',
          qualityInfo: 'Made with premium quality vegetable-tanned leather.',
          imageUrls: ['https://placehold.co/600x600/e5e7eb/6b7280?text=Leather+Wallet'],
        }
      ]
    });
    console.log('Created products for Ramesh');
  }

  // --- ENTREPRENEUR 2: Organic/Food Products (Nashik) ---
  const user2 = await prisma.user.upsert({
    where: { email: 'sunita.organics@example.com' },
    update: {},
    create: {
      email: 'sunita.organics@example.com',
      name: 'Sunita Deshmukh',
      passwordHash: demoPassword,
      role: 'SELLER',
    },
  });

  const profile2 = await prisma.entrepreneurProfile.upsert({
    where: { slug: 'sunitas-organic-farms' },
    update: {},
    create: {
      userId: user2.id,
      slug: 'sunitas-organic-farms',
      storeName: "Sunita's Organic Farms",
      ownerName: 'Sunita Deshmukh',
      profileImage: 'https://placehold.co/400x400/F59E0B/FFF?text=SO',
      coverImage: 'https://placehold.co/1200x400/B45309/FFF?text=Fresh+Organic+Produce',
      description: 'Run by a collective of women farmers in Nashik. We grow spices, raisins, and organic pulses using completely natural farming methods.',
      businessCategory: 'Organic/Food Products',
      yearsInBusiness: 6,
      contactInfo: '+91 91234 56789',
      village: 'Niphad',
      district: 'Nashik',
      state: 'Maharashtra',
      verificationStatus: 'APPROVED',
      badgeLevel: 'VERIFIED',
    },
  });

  const products2 = await prisma.product.findMany({ where: { entrepreneurId: profile2.id } });
  if (products2.length === 0) {
    await prisma.product.createMany({
      data: [
        {
          entrepreneurId: profile2.id,
          title: 'Sun-Dried Nashik Raisins (1kg)',
          description: 'Premium quality golden raisins, naturally sun-dried without any chemical treatments. Sweet, plump, and perfect for baking or snacking.',
          price: 450.00,
          stock: 100,
          category: 'Organic/Food Products',
          location: 'Nashik',
          status: 'ACTIVE',
          qualityInfo: 'FSSAI compliant. Zero artificial preservatives.',
          imageUrls: ['https://placehold.co/600x600/e5e7eb/6b7280?text=Nashik+Raisins'],
        },
        {
          entrepreneurId: profile2.id,
          title: 'Organic Turmeric Powder (500g)',
          description: 'High-curcumin turmeric powder ground from organically grown turmeric roots. Brings rich color and authentic flavor to your daily cooking.',
          price: 220.00,
          stock: 75,
          category: 'Organic/Food Products',
          location: 'Nashik',
          status: 'ACTIVE',
          qualityInfo: 'Lab tested for curcumin content. No artificial colors added.',
          imageUrls: ['https://placehold.co/600x600/e5e7eb/6b7280?text=Turmeric+Powder'],
        }
      ]
    });
    console.log('Created products for Sunita');
  }

  // --- ENTREPRENEUR 3: Handloom/Textiles (Nagpur) ---
  const user3 = await prisma.user.upsert({
    where: { email: 'vidarbha.weaves@example.com' },
    update: {},
    create: {
      email: 'vidarbha.weaves@example.com',
      name: 'Ashok Rao',
      passwordHash: demoPassword,
      role: 'SELLER',
    },
  });

  const profile3 = await prisma.entrepreneurProfile.upsert({
    where: { slug: 'vidarbha-cotton-weaves' },
    update: {},
    create: {
      userId: user3.id,
      slug: 'vidarbha-cotton-weaves',
      storeName: 'Vidarbha Cotton Weaves',
      ownerName: 'Ashok Rao',
      profileImage: 'https://placehold.co/400x400/3B82F6/FFF?text=VW',
      coverImage: 'https://placehold.co/1200x400/1D4ED8/FFF?text=Authentic+Handloom',
      description: 'Bringing the finest hand-woven cotton textiles directly from the looms of Vidarbha. We specialize in comfortable, breathable ethnic wear made by rural weavers.',
      businessCategory: 'Handloom/Textiles',
      yearsInBusiness: 20,
      contactInfo: '+91 88888 77777',
      village: 'Umred',
      district: 'Nagpur',
      state: 'Maharashtra',
      verificationStatus: 'APPROVED',
      badgeLevel: 'PREMIUM',
    },
  });

  const products3 = await prisma.product.findMany({ where: { entrepreneurId: profile3.id } });
  if (products3.length === 0) {
    await prisma.product.createMany({
      data: [
        {
          entrepreneurId: profile3.id,
          title: 'Handwoven Cotton Saree',
          description: 'A beautiful, lightweight pure cotton saree featuring traditional Vidarbha border patterns. Perfect for summer and daily wear.',
          price: 1800.00,
          stock: 15,
          category: 'Handloom/Textiles',
          location: 'Nagpur',
          status: 'ACTIVE',
          qualityInfo: '100% Pure Cotton. Handloom woven.',
          imageUrls: ['https://placehold.co/600x600/e5e7eb/6b7280?text=Cotton+Saree'],
        },
        {
          entrepreneurId: profile3.id,
          title: 'Cotton Kurta Fabric (2.5 Meters)',
          description: 'Unstitched pure cotton fabric suitable for men\'s kurtas or women\'s suits. Highly breathable and gentle on the skin.',
          price: 500.00,
          stock: 40,
          category: 'Handloom/Textiles',
          location: 'Nagpur',
          status: 'ACTIVE',
          qualityInfo: 'Color-fast guarantee. Pre-washed material.',
          imageUrls: ['https://placehold.co/600x600/e5e7eb/6b7280?text=Kurta+Fabric'],
        },
        {
          entrepreneurId: profile3.id,
          title: 'Handloom Towel Set (Pack of 3)',
          description: 'Highly absorbent traditional cotton towels (Pancha). Durable and quick-drying.',
          price: 350.00,
          stock: 100,
          category: 'Handloom/Textiles',
          location: 'Nagpur',
          status: 'ACTIVE',
          qualityInfo: 'Handwoven for extra softness.',
          imageUrls: ['https://placehold.co/600x600/e5e7eb/6b7280?text=Towel+Set'],
        }
      ]
    });
    console.log('Created products for Ashok');
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
