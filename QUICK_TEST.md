# Quick API Test Guide

## Test Your API Endpoints

### Option 1: Using Browser Console

Open browser console (F12) and run:

```javascript
// Test 1: Root route
fetch('https://your-backend.vercel.app/')
  .then(r => r.json())
  .then(console.log);

// Test 2: API test route
fetch('https://your-backend.vercel.app/api/test')
  .then(r => r.json())
  .then(console.log);

// Test 3: Users endpoint (POST)
fetch('https://your-backend.vercel.app/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    message: 'Test message'
  })
})
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

### Option 2: Using cURL

```bash
# Test root
curl https://your-backend.vercel.app/

# Test API route
curl https://your-backend.vercel.app/api/test

# Test users endpoint
curl -X POST https://your-backend.vercel.app/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

### Option 3: Using the Test Script

```bash
cd Backend-Portfolio
node test-api.js https://your-backend.vercel.app
```

## Expected Results

### ✅ Root Route (`/`)
```json
{
  "message": "Backend Portfolio API",
  "status": "operational",
  "endpoints": {...}
}
```

### ✅ Test Route (`/api/test`)
```json
{
  "message": "API routing is working!"
}
```

### ✅ Users Route (`POST /api/users`)
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {...}
}
```

## If You Get 404

1. **Check the URL** - Make sure it's your correct Vercel URL
2. **Check the method** - `/api/users` requires POST, not GET
3. **Check Vercel logs** - Look for the request in logs
4. **Verify deployment** - Make sure latest code is deployed

## Common Issues

- **404 on GET /api/users** - This is normal! It only accepts POST
- **404 on all routes** - Check vercel.json and deployment
- **CORS errors** - Should be fixed, but check CORS settings
