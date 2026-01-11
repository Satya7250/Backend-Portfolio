/**
 * Test script for API endpoints
 * Run this locally: node test-api.js
 * Or test against deployed: node test-api.js https://your-backend.vercel.app
 */

const BASE_URL = process.argv[2] || 'http://localhost:5000';

async function testEndpoint(method, path, body = null) {
  const url = `${BASE_URL}${path}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    console.log(`\n${method} ${url}`);
    if (body) {
      console.log('Body:', JSON.stringify(body, null, 2));
    }

    const response = await fetch(url, options);
    const data = await response.json().catch(() => ({ text: await response.text() }));

    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('Response:', JSON.stringify(data, null, 2));

    return { success: response.ok, status: response.status, data };
  } catch (error) {
    console.error('Error:', error.message);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('🧪 Testing API Endpoints');
  console.log('Base URL:', BASE_URL);
  console.log('='.repeat(50));

  // Test 1: Root route
  await testEndpoint('GET', '/');

  // Test 2: API test route
  await testEndpoint('GET', '/api/test');

  // Test 3: Users endpoint (POST)
  await testEndpoint('POST', '/api/users', {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message'
  });

  // Test 4: Users endpoint with invalid data
  await testEndpoint('POST', '/api/users', {
    name: '',
    email: 'invalid-email',
    message: ''
  });

  // Test 5: View endpoint
  await testEndpoint('POST', '/api/view');

  console.log('\n✅ Tests completed!');
}

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
  console.error('❌ This script requires Node.js 18+ or install node-fetch');
  console.log('Install: npm install node-fetch');
  process.exit(1);
}

runTests().catch(console.error);
