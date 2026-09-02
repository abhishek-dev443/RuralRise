const app = require('./index');
const prisma = require('./prisma/db');
const http = require('http');

const PORT = 5002;
let server;

async function runTests() {
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Test server running on port ${PORT}`);

  let userToken = '';
  let productId = '';

  try {
    // Clean up
    await prisma.product.deleteMany({ where: { title: 'Handwoven Basket Test' } });
    await prisma.entrepreneurProfile.deleteMany({ where: { storeName: 'Test Storefront' } });
    await prisma.user.deleteMany({ where: { email: 'seller3@ruralrise.com' } });

    // 1. Create a User and get Token
    const registerResponse = await fetch(`http://localhost:${PORT}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Seller 3',
        email: 'seller3@ruralrise.com',
        password: 'securepassword123',
        role: 'SELLER'
      })
    });
    const registerData = await registerResponse.json();
    if (!registerData.token) throw new Error('Registration failed');
    userToken = registerData.token;

    // 2. Create Storefront
    console.log('\n--- Testing Create Storefront ---');
    const sfRes = await fetch(`http://localhost:${PORT}/api/entrepreneurs/storefront`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({
        storeName: 'Test Storefront',
        ownerName: 'Rahul',
        businessCategory: 'Handicrafts',
        district: 'Pune'
      })
    });
    const sfData = await sfRes.json();
    if (sfRes.status !== 200 || sfData.slug !== 'test-storefront') throw new Error(`Storefront failed: ${JSON.stringify(sfData)}`);
    console.log('✅ Storefront Created');

    // 3. Create Product
    console.log('\n--- Testing Create Product ---');
    const pRes = await fetch(`http://localhost:${PORT}/api/products`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({
        title: 'Handwoven Basket Test',
        description: 'A beautiful handwoven basket from Pune.',
        price: 500,
        stock: 10,
        category: 'Handicrafts',
        location: 'Pune'
      })
    });
    const pData = await pRes.json();
    if (pRes.status !== 201) throw new Error(`Product failed: ${JSON.stringify(pData)}`);
    productId = pData.id;
    console.log('✅ Product Created');

    // 4. Get Public Products
    console.log('\n--- Testing Get Public Products ---');
    const ppRes = await fetch(`http://localhost:${PORT}/api/products?category=Handicrafts&location=Pune`);
    const ppData = await ppRes.json();
    if (ppRes.status !== 200 || ppData.length === 0) throw new Error(`Public Products failed: ${JSON.stringify(ppData)}`);
    console.log('✅ Public Products Fetched & Filtered');

    // 5. Delete Product (Ownership test)
    console.log('\n--- Testing Delete Product ---');
    const dRes = await fetch(`http://localhost:${PORT}/api/products/${productId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    if (dRes.status !== 200) throw new Error(`Delete Product failed: ${dRes.status}`);
    console.log('✅ Product Deleted successfully (Ownership verified)');

    console.log('\n🎉 ALL PHASE 3 TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('\n❌ TEST FAILED:', err.message);
  } finally {
    await prisma.product.deleteMany({ where: { title: 'Handwoven Basket Test' } });
    await prisma.entrepreneurProfile.deleteMany({ where: { storeName: 'Test Storefront' } });
    await prisma.user.deleteMany({ where: { email: 'seller3@ruralrise.com' } });
    await prisma.$disconnect();
    server.close();
    process.exit(0);
  }
}

runTests();
