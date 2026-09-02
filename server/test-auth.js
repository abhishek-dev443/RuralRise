const app = require('./index');
const prisma = require('./prisma/db');
const http = require('http');

const PORT = 5001;
let server;

async function runTests() {
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`Test server running on port ${PORT}`);

  try {
    // 1. Clean up potential previous test runs
    await prisma.user.deleteMany({ where: { email: 'test_entrepreneur@ruralrise.com' } });

    // 2. Test Registration
    console.log('\n--- Testing Registration ---');
    const registerResponse = await fetch(`http://localhost:${PORT}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Entrepreneur',
        email: 'test_entrepreneur@ruralrise.com',
        password: 'securepassword123',
        role: 'SELLER'
      })
    });
    
    const registerData = await registerResponse.json();
    console.log('Register Response Status:', registerResponse.status);
    if (registerResponse.status !== 201 || !registerData.token) {
      throw new Error(`Registration failed: ${JSON.stringify(registerData)}`);
    }
    console.log('✅ Registration Successful. Token received.');

    // 3. Test Login
    console.log('\n--- Testing Login ---');
    const loginResponse = await fetch(`http://localhost:${PORT}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test_entrepreneur@ruralrise.com',
        password: 'securepassword123'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('Login Response Status:', loginResponse.status);
    if (loginResponse.status !== 200 || !loginData.token) {
      throw new Error(`Login failed: ${JSON.stringify(loginData)}`);
    }
    console.log('✅ Login Successful. Token received.');

    // 4. Test Protected Route (/me)
    console.log('\n--- Testing Protected /me Route ---');
    const meResponse = await fetch(`http://localhost:${PORT}/api/auth/me`, {
      headers: { 
        'Authorization': `Bearer ${loginData.token}` 
      }
    });
    
    const meData = await meResponse.json();
    console.log('/me Response Status:', meResponse.status);
    if (meResponse.status !== 200 || meData.email !== 'test_entrepreneur@ruralrise.com') {
      throw new Error(`Protected route failed: ${JSON.stringify(meData)}`);
    }
    console.log('✅ Protected Route Access Successful.');
    console.log('User Role:', meData.role);

    console.log('\n🎉 ALL AUTHENTICATION TESTS PASSED SUCCESSFULLY!');

  } catch (err) {
    console.error('\n❌ TEST FAILED:', err.message);
  } finally {
    // Clean up DB
    await prisma.user.deleteMany({ where: { email: 'test_entrepreneur@ruralrise.com' } });
    await prisma.$disconnect();
    server.close();
    process.exit(0);
  }
}

runTests();
