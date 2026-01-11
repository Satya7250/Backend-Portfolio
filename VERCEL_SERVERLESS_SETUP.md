# Vercel Serverless MongoDB Setup Guide

## Overview
This guide explains the serverless MongoDB connection setup for Vercel deployment. The backend has been restructured to work reliably in Vercel's serverless environment where functions are stateless and may be cold-started.

## Problems Fixed

### 1. Backend MongoDB Connection Issues
- **Problem**: Backend was connecting to MongoDB incorrectly and stopping after idle periods
- **Solution**: Implemented connection caching pattern suitable for serverless environments

### 2. Frontend Mongoose Usage
- **Status**: ✅ Frontend is clean - no mongoose imports found
- **Verification**: Frontend correctly uses `fetch` API through `src/services/api.js` to call backend endpoints

## Key Changes Made

### 1. `connect.js` - Serverless Connection Caching
- Implemented connection caching using `global.mongoose` to persist connections across function invocations
- Added proper connection options for serverless:
  - `bufferCommands: false` - Disables mongoose buffering
  - `maxPoolSize: 10` - Maintains connection pool
  - `serverSelectionTimeoutMS: 5000` - Connection timeout
  - `socketTimeoutMS: 45000` - Socket inactivity timeout
- Connection is cached and reused when available, preventing multiple connection attempts

### 2. `index.js` - Connection Middleware
- Added middleware to ensure MongoDB connection on **every request**
- This is critical for serverless because:
  - Functions may be cold-started (no existing connection)
  - Connections may have timed out during idle periods
  - Each request needs to verify/establish connection before processing

### 3. `api/index.js` - Vercel Serverless Function Entry Point
- Created new file: `Backend-Portfolio/api/index.js`
- This is the entry point for Vercel serverless functions
- Exports the Express app as a serverless function

### 4. `vercel.json` - Updated Configuration
- Changed from simple rewrites to proper serverless function configuration
- Uses `@vercel/node` builder for Node.js serverless functions
- Routes all requests to `api/index.js`

## File Structure

```
Backend-Portfolio/
├── api/
│   └── index.js          # NEW: Vercel serverless function entry point
├── connect.js            # UPDATED: Serverless connection caching
├── index.js              # UPDATED: Added connection middleware
├── vercel.json           # UPDATED: Proper serverless configuration
├── controllers/
├── models/
├── routes/
└── ...
```

## How It Works

### Connection Flow in Serverless Environment

1. **First Request (Cold Start)**:
   ```
   Request → api/index.js → Express App → Connection Middleware
   → connectToMongoDb() → No cached connection → Create new connection
   → Cache connection in global.mongoose → Process request
   ```

2. **Subsequent Requests (Warm Function)**:
   ```
   Request → api/index.js → Express App → Connection Middleware
   → connectToMongoDb() → Cached connection exists → Reuse connection
   → Process request
   ```

3. **After Idle Period (Connection May Timeout)**:
   ```
   Request → api/index.js → Express App → Connection Middleware
   → connectToMongoDb() → Cached connection exists but may be stale
   → Check connection state → Reconnect if needed → Process request
   ```

### Why This Works

- **Global Caching**: `global.mongoose` persists across function invocations in the same container
- **Connection Reuse**: Avoids creating new connections for every request
- **Automatic Recovery**: If connection is lost, it's recreated on the next request
- **Middleware Pattern**: Ensures connection is checked/established before any route handler runs

## Deployment Steps

### 1. Environment Variables
Ensure these are set in Vercel:
- `MONGO_URI` - Your MongoDB connection string (MongoDB Atlas recommended)

### 2. Deploy Backend to Vercel

```bash
cd Backend-Portfolio
vercel deploy
```

Or connect your GitHub repository to Vercel for automatic deployments.

### 3. Update Frontend Environment Variable
In your frontend project (`Portfolio-Project`), ensure `.env` or Vercel environment variables include:
```
VITE_API_URL=https://your-backend.vercel.app/api
```

### 4. Verify Deployment
- Test API endpoints: `https://your-backend.vercel.app/api/users`
- Check Vercel function logs for connection messages
- Monitor for any connection errors

## Testing Locally

### Backend
```bash
cd Backend-Portfolio
npm install
npm start
```

The server will run on `http://localhost:5000` and will:
- Connect to MongoDB on startup (for local dev)
- Still use connection middleware for consistency

### Frontend
```bash
cd Portfolio-Project
npm install
npm run dev
```

Ensure `.env.local` has:
```
VITE_API_URL=http://localhost:5000/api
```

## Troubleshooting

### Connection Timeouts
- **Symptom**: Requests fail with connection errors after idle periods
- **Solution**: The middleware automatically reconnects, but you may need to adjust timeout values in `connect.js`

### Cold Start Delays
- **Symptom**: First request after deployment is slow
- **Solution**: This is normal for serverless. Consider using Vercel's Edge Functions or keeping functions warm with scheduled pings

### Multiple Connection Errors
- **Symptom**: MongoDB Atlas shows too many connections
- **Solution**: The caching pattern prevents this, but ensure `maxPoolSize` is appropriate for your MongoDB tier

## Best Practices

1. **Always use the connection middleware** - Don't bypass it in routes
2. **Handle connection errors gracefully** - The middleware returns 500 on connection failure
3. **Monitor connection pool** - Check MongoDB Atlas dashboard for connection usage
4. **Use MongoDB Atlas** - Recommended for serverless deployments (better connection handling)
5. **Set appropriate timeouts** - Balance between reliability and performance

## Frontend Verification

✅ **Frontend is clean** - No mongoose imports found
- Frontend uses `src/services/api.js` for all API calls
- All database operations go through backend API endpoints
- No direct database connections from frontend

## Additional Notes

- The connection middleware runs on **every request** to ensure reliability
- In production, this adds minimal overhead due to connection caching
- For high-traffic applications, consider connection pooling strategies
- MongoDB Atlas free tier supports up to 500 connections
