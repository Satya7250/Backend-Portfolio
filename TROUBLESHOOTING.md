# API Troubleshooting Guide

## `/api/users` Not Working

### Common Issues & Solutions

#### 1. **MongoDB Connection Failed**
**Symptoms**: 500 error with "Database connection failed"
**Solution**:
- Check `MONGO_URI` environment variable in Vercel
- Verify MongoDB Atlas connection string is correct
- Ensure MongoDB Atlas IP whitelist includes Vercel IPs (or use 0.0.0.0/0 for all)
- Check MongoDB Atlas cluster is running

#### 2. **Missing Required Fields**
**Symptoms**: 400 error with "Missing required fields"
**Solution**:
- Ensure request body includes: `name`, `email`, `message`
- Check Content-Type header is `application/json`
- Verify request body is properly formatted JSON

#### 3. **Validation Errors**
**Symptoms**: 400 error with validation details
**Solution**:
- Check email format is valid
- Ensure message is not empty
- Verify name is provided

#### 4. **Duplicate Email**
**Symptoms**: 400 error with "Email already exists"
**Solution**:
- Use a different email address
- Or check existing users in database

#### 5. **CORS Issues**
**Symptoms**: Request blocked by browser
**Solution**:
- CORS is already enabled in the backend
- Check frontend is using correct API URL
- Verify `VITE_API_URL` environment variable

### Testing the Endpoint

#### Using cURL:
```bash
curl -X POST https://your-backend.vercel.app/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

#### Using Browser Console:
```javascript
fetch('https://your-backend.vercel.app/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    message: 'Test message'
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error('Error:', err));
```

### Check Vercel Logs

1. Go to Vercel Dashboard
2. Navigate to your project → Logs
3. Look for errors related to:
   - MongoDB connection
   - Request parsing
   - Validation errors

### Expected Response

**Success (201)**:
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message",
    "createdAt": "..."
  }
}
```

**Error (400/500)**:
```json
{
  "error": "Error description",
  "message": "Detailed error message"
}
```
