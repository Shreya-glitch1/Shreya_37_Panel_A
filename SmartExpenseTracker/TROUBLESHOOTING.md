# Smart Expense Tracker - Troubleshooting & Setup Guide

## Issues Found & Fixed

### 1. **MongoDB Connection Error** ❌
**Problem:** `MongooseServerSelectionError: connect ECONNREFUSED ::1:27017`
- MongoDB service is not running on your machine
- This prevents ALL authentication (login/register) from working

**Solution:**
You need to run MongoDB locally. Choose one option:

#### Option A: Using MongoDB Atlas (Cloud - Recommended for testing)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a free cluster
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/smart-expense-tracker`)
5. Update `.env` file:
```
MONGODB_URI=mongodb+srv://yourUsername:yourPassword@cluster.mongodb.net/smart-expense-tracker
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
```

#### Option B: Using Local MongoDB (Windows)
1. Download MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Install it (choose "Install MongoDB as a Service" during setup)
3. MongoDB will auto-start as a Windows service
4. Use the default `.env` configuration with `mongodb://localhost:27017/smart-expense-tracker`

#### Option C: Using MongoDB Docker (Quick)
```powershell
# Install Docker Desktop, then run:
docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password mongo

# Update .env:
MONGODB_URI=mongodb://admin:password@localhost:27017/smart-expense-tracker
```

---

### 2. **Routes Not Imported** ❌ ✅ FIXED
**Problem:** The routes were commented out in `server.js`
- Login/Register endpoints weren't available
- Frontend couldn't communicate with API

**Fixed:** Uncommented and enabled all route imports in `server.js`

---

### 3. **Missing `.env` File** ❌ ✅ FIXED
**Problem:** No `.env` file in backend directory
- Uses default `localhost:27017` (which wasn't running)
- JWT_SECRET not configured

**Fixed:** Created `.env` file with proper configuration

---

### 4. **Deprecated MongoDB Method** ❌ ✅ FIXED
**Problem:** Used `findByIdAndRemove()` (deprecated)
- Would cause warnings in newer Mongoose versions

**Fixed:** Changed to `findByIdAndDelete()`

---

### 5. **Frontend/Backend CORS Issues** ⚠️
**Status:** Should work but verify CORS is properly configured
- Frontend runs on `http://localhost:3000`
- Backend runs on `http://localhost:5000`
- CORS is enabled in server.js

---

### 6. **npm Security Vulnerabilities** ⚠️
**Status:** 3 high severity vulnerabilities
**Fix:**
```powershell
# In backend directory:
npm audit fix --force

# In frontend directory:
npm install
```

---

## Quick Start Flow

### Terminal 1 - Backend
```powershell
cd SmartExpenseTracker/backend
npm install
npm audit fix --force
npm run dev
```
✅ Should show: "Server is running on port 5000" and "MongoDB connected"

### Terminal 2 - Frontend
```powershell
cd SmartExpenseTracker/frontend
npm install
npm run dev
```
✅ Should show: "Local: http://localhost:3000"

### Browser
- Go to `http://localhost:3000`
- Should see Login page (not error page)

---

## Testing Authentication

### Register a New User:
1. Click "Register here" link
2. Fill in:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "password123"
3. Click Register
4. Should redirect to Dashboard

### Login:
1. Enter email: "test@example.com"
2. Enter password: "password123"
3. Click Login
4. Should show Dashboard with "Welcome, Test User"

---

## Why Login/Register Was Failing

```
Frontend → axios call → Backend API
   ↓
/api/users/login (no route imported → fails)
   ↓
MongoDB query (not connected → fails)
   ↓
Frontend receives error → Shows "Login failed"
```

Now that routes are imported AND MongoDB is set up, it should work!

---

## Verification Checklist

- [ ] MongoDB running (check with `mongo` command or check service)
- [ ] `.env` file exists with correct MONGODB_URI
- [ ] Backend shows "MongoDB connected" in console
- [ ] Backend shows "Server is running on port 5000"
- [ ] Frontend shows "Local: http://localhost:3000"
- [ ] Can access http://localhost:3000 in browser
- [ ] Can register a new user
- [ ] Can login with registered credentials
- [ ] Dashboard shows "Total Spent" and recent expenses

---

## Common Issues & Fixes

### "Cannot GET /api/users/login"
→ Routes not imported (FIXED ✅)

### "MongoDB connection error"
→ MongoDB not running (See Option A, B, or C above)

### "Network error" on login
→ Backend not running OR CORS issue
→ Check backend console for errors

### "Token is not valid"
→ JWT_SECRET mismatch between login and other requests
→ Restart both frontend and backend after changing .env

---

## Need More Help?

Check these files for the implementation:
- Backend routes: `backend/src/routes/`
- Controllers: `backend/src/controllers/`
- Models: `backend/src/models/`
- Frontend pages: `frontend/src/pages/`
