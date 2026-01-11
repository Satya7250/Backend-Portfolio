# Vercel Deployment Checklist

## ⚠️ Important: After Making Changes

1. **Commit and Push Changes**
   ```bash
   git add .
   git commit -m "Fix views path for Vercel serverless"
   git push
   ```

2. **Redeploy on Vercel**
   - Vercel should auto-deploy if connected to Git
   - OR manually trigger deployment in Vercel dashboard
   - OR run: `vercel --prod`

3. **Wait for Deployment**
   - Check Vercel dashboard for deployment status
   - Wait for build to complete

4. **Clear Cache (if needed)**
   - Old deployments might be cached
   - Try a new deployment or clear Vercel cache

## ✅ What Was Fixed

1. **Root Route** - Changed from `res.render("index")` to `res.json(...)`
   - No longer tries to render EJS view
   - Returns JSON API status instead

2. **Views Path** - Fixed to use `path.join(__dirname, "views")`
   - Works in both local and Vercel serverless
   - Admin route can still render views correctly

## 🔍 Verify Fix

After deployment, check:
- ✅ Root route (`/`) should return JSON, not error
- ✅ Admin route (`/admin`) should work (if views are needed)
- ✅ API routes (`/api/users`, `/api/view`) should work

## 🐛 If Still Getting Errors

1. **Check Deployment Logs**
   - Make sure latest code is deployed
   - Check build logs for errors

2. **Verify File Structure**
   - `views/` directory should be in root
   - `api/index.js` should exist
   - `index.js` should have the fixes

3. **Force Redeploy**
   - Delete and redeploy if needed
   - Or push an empty commit to trigger rebuild
