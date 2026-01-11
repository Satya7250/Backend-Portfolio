# Fixing 404 Error for /api/users

## Problem
Getting 404 Not Found when trying to access `/api/users` endpoint.

## Possible Causes

### 1. **Route Not Matching**
- Check if the route is defined correctly
- Verify route order in Express

### 2. **Vercel Routing Configuration**
- Ensure `vercel.json` is correctly configured
- Check if `api/index.js` is exporting correctly

### 3. **Request Method Mismatch**
- `/api/users` requires POST method
- GET requests will return 404

## Solutions Applied

### 1. Updated vercel.json
- Changed route destination to `/api/index.js` (with leading slash)

### 2. Added Test Route
- Added `/api/test` route to verify routing is working

### 3. Verified Route Order
- More specific routes (`/api/users`) come before general routes (`/api`)

## Testing Steps

1. **Test Root Route** (should work):
   ```
   GET https://your-backend.vercel.app/
   ```

2. **Test API Test Route**:
   ```
   GET https://your-backend.vercel.app/api/test
   ```

3. **Test Users Endpoint** (POST required):
   ```bash
   POST https://your-backend.vercel.app/api/users
   Content-Type: application/json
   
   {
     "name": "Test",
     "email": "test@example.com",
     "message": "Hello"
   }
   ```

## Common Mistakes

1. **Using GET instead of POST**
   - `/api/users` only accepts POST requests
   - Use POST method with JSON body

2. **Wrong URL**
   - Make sure you're using the correct Vercel URL
   - Check for typos in the endpoint path

3. **Missing Content-Type Header**
   - Must include: `Content-Type: application/json`

## After Redeploy

After pushing these changes and redeploying:
1. Test `/api/test` first to verify routing works
2. Then test `/api/users` with POST request
3. Check Vercel logs for any errors
