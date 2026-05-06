# MongoDB Setup - Easiest Way (5 Minutes)

## 🚀 EASIEST OPTION: MongoDB Atlas (Cloud)

### Step 1: Create Free Account
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"** button
3. Sign up with Google OR email/password
4. Verify your email (check inbox)

### Step 2: Create a Cluster (Database Server)
1. After login, click **"Create"** button
2. Choose **"M0 FREE"** tier (it's free forever)
3. Select your cloud provider: **AWS**
4. Select region: Choose closest to you (or just use default)
5. Click **"Create"** button
6. Wait 2-5 minutes for cluster to be ready

### Step 3: Get Your Connection String
1. Click **"CONNECT"** button on your cluster
2. Click **"Connect with application"**
3. Choose: **Node.js** version **4.1 or later**
4. Copy the connection string (looks like below):

```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

### Step 4: Replace username & password

In the connection string above, replace:
- `username` with any username (e.g., `admin`)
- `password` with a secure password (e.g., `MyPassword123!`)

**Click "Create Database User"** in Atlas to actually create it:
1. Username: `admin`
2. Password: Copy a secure password
3. Click **"Create Database User"**

Now your full connection string looks like:
```
mongodb+srv://admin:MyPassword123!@cluster0.abc123.mongodb.net/smart-expense-tracker?retryWrites=true&w=majority
```

### Step 5: Update Your `.env` File

Open: `SmartExpenseTracker/backend/.env`

Replace the MONGODB_URI line:

```
MONGODB_URI=mongodb+srv://admin:MyPassword123!@cluster0.abc123.mongodb.net/smart-expense-tracker?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
```

**⚠️ IMPORTANT:** Replace:
- `admin` with your username
- `MyPassword123!` with your password
- `cluster0.abc123` with your actual cluster name (from the connection string)

### Step 6: Allow Network Access

1. In MongoDB Atlas, go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Select **"Allow access from anywhere"** (easiest for local testing)
4. Click **"Confirm"**

### Step 7: Test Connection

Now run your backend:
```powershell
cd SmartExpenseTracker/backend
npm run dev
```

✅ You should see: **"MongoDB connected"**

---

## If That Doesn't Work - Quick Debug

### Check 1: Verify Connection String Format
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority
```
- Should have `+srv` after `mongodb`
- Should have username and password
- Password should be URL-encoded (special chars like `!` become `%21`)

### Check 2: Verify Credentials in Atlas
1. Go to MongoDB Atlas
2. Click **"Database Access"** (left sidebar)
3. You should see your `admin` user listed
4. Password should match what's in `.env`

### Check 3: Verify IP Whitelist
1. Go to MongoDB Atlas
2. Click **"Network Access"** (left sidebar)
3. You should see `0.0.0.0/0` or your IP address
4. If not, click "Add IP Address" again

---

## What If I Make a Mistake?

### If you entered the wrong password:
1. Go to MongoDB Atlas → Database Access
2. Click the 3-dots menu next to `admin`
3. Click "Edit Password"
4. Enter new password
5. Update `.env` file with new password
6. Restart backend

### If you entered the wrong username:
1. Go to MongoDB Atlas → Database Access
2. Delete the user (click 3-dots menu)
3. Click "Add New Database User"
4. Create new user
5. Update `.env` with new credentials
6. Restart backend

---

## Complete `.env` Template

Copy-paste this and fill in YOUR credentials:

```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/smart-expense-tracker?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
```

Replace:
- `YOUR_USERNAME` = username you created (e.g., `admin`)
- `YOUR_PASSWORD` = password for that user
- `YOUR_CLUSTER` = cluster name from Atlas (e.g., `cluster0.abc123def`)

---

## Done! 🎉

Now you can:
1. Start backend: `npm run dev` (from backend folder)
2. Start frontend: `npm run dev` (from frontend folder)
3. Go to http://localhost:3000
4. Register & Login should work!

---

## Still Stuck?

**Error: "Authentication failed"**
→ Check if username/password in `.env` matches what you created in Atlas

**Error: "MongoDB connection timeout"**
→ Need to whitelist your IP (Network Access → Add IP Address)

**Error: "Invalid connection string"**
→ Make sure you copied the full string including `?retryWrites=true...`

**Screenshot Help:**
- [MongoDB Atlas Setup Guide](https://docs.mongodb.com/guides/cloud/free-tier-setup/)
- [Connection String Guide](https://docs.mongodb.com/guides/cloud/connectionstring/)
