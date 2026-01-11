# Vercel Serverless Views Path Fix

## Problem
Vercel was throwing errors:
```
Error: Failed to lookup view "index" in views directory "./views"
```

This happened because:
1. Relative paths (`./views`) don't work correctly in Vercel's serverless environment
2. The file structure is different in serverless functions vs local development

## Solution

### 1. Fixed Views Path
Changed from relative to absolute path:
```javascript
// Before (doesn't work in serverless)
app.set("views", "./views");

// After (works in serverless)
const path = require("path");
app.set("views", path.join(__dirname, "views"));
```

### 2. Changed Root Route
Changed from EJS rendering to JSON response (better for API backend):
```javascript
// Before
app.get("/", (req, res) => {
  res.render("index");
});

// After
app.get("/", (req, res) => {
  res.json({
    message: "Backend Portfolio API",
    status: "operational",
    endpoints: {
      users: "POST /api/users",
      views: "POST /api/view",
      admin: "GET /admin"
    }
  });
});
```

## Why This Works

1. **Absolute Path**: `path.join(__dirname, "views")` resolves correctly in serverless environments
2. **JSON Response**: Root route now returns JSON instead of HTML, which is more appropriate for an API backend
3. **Admin Route**: Still works because views path is set globally, so `res.render("admin")` will find the file

## Testing

After deploying to Vercel:
- ✅ Root route (`/`) should return JSON with API status
- ✅ Admin route (`/admin`) should render the admin panel correctly
- ✅ API routes (`/api/users`, `/api/view`) should work as before

## Files Changed

- `Backend-Portfolio/index.js` - Fixed views path and root route
