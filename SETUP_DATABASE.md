# 🗄️ MongoDB Setup Guide

## Issue
The backend is running on http://localhost:5000, but MongoDB is not running. This is why you're getting a connection error when trying to login.

## Solution: 3 Ways to Set Up MongoDB

### Option 1: Using Docker (Easiest) ⭐ RECOMMENDED

If you have Docker installed:

```bash
# Start MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# You should see a container ID displayed
# Now your backend can connect to MongoDB on localhost:27017
```

To stop MongoDB later:
```bash
docker stop mongodb
docker rm mongodb
```

---

### Option 2: Install MongoDB Locally

#### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod  # Auto-start on boot

# Check status
sudo systemctl status mongod
```

#### macOS:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Check status
brew services list
```

---

### Option 3: Use MongoDB Atlas (Cloud) 

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string (looks like: `mongodb+srv://user:password@cluster.mongodb.net/dbname`)
5. Update your `.env` file:

```properties
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cybersec-essentials
```

---

## 🔄 Current Status

### Backend Server: ✅ Running
- **URL**: http://localhost:5000
- **Status**: Started successfully
- **Port**: 5000

### MongoDB Database: ❌ Not Connected
- **Expected Connection**: mongodb://localhost:27017/cybersec-essentials
- **Status**: Connection Failed (MongoDB not running)

---

## ✨ Next Steps

### 1. Start MongoDB
Choose one of the 3 options above and start MongoDB.

### 2. Restart Backend (If Using Docker)
Once MongoDB is running, the backend will automatically reconnect. If it doesn't:

```bash
# Restart the backend (press Ctrl+C in terminal, then run:)
cd /home/abdulbaqi/gem/backend
npx nodemon server.js
```

### 3. Test the Connection
```bash
# Check if backend is working
curl http://localhost:5000/api/health

# Should respond with:
# {"status":"OK","message":"Cybersecurity Essentials Backend is running","timestamp":"2025-12-04T..."}
```

### 4. Test Admin Login
Once MongoDB is connected:
- Open http://localhost:3000/admin-login.html
- Use demo credentials:
  - Email: `admin@example.com`
  - Password: `AdminPassword123`

---

## 🐛 Troubleshooting

### "Connection refused" Error?
- MongoDB is not running. Use Option 1, 2, or 3 above.

### "Connection timeout" Error?
- MongoDB may be starting. Wait a few seconds and try again.

### Backend shows "MongoDB Connected"?
- Great! Your connection is working.

### Still having issues?
1. Check MongoDB is running: `ps aux | grep mongod`
2. Check MongoDB port: `lsof -i :27017`
3. Check backend logs in the terminal running the backend

---

## 📊 What Happens When MongoDB Connects?

Once connected, the admin dashboard will:
- ✅ Store user data
- ✅ Track quiz attempts
- ✅ Save progress
- ✅ Display statistics
- ✅ Manage admin users

---

## 🚀 Quick Start Summary

```bash
# Terminal 1: Start MongoDB (Option 1)
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Terminal 2: Backend is already running at http://localhost:5000

# Terminal 3 (Optional): Test the backend
curl http://localhost:5000/api/health

# Browser: Open admin dashboard
# http://localhost:3000/admin-login.html
# Email: admin@example.com
# Password: AdminPassword123
```

---

## 📝 MongoDB Commands

### Using MongoDB Shell (if installed)

```bash
# Connect to MongoDB
mongosh

# List databases
show databases

# Use cybersec database
use cybersec-essentials

# See collections
show collections

# View users
db.users.find().pretty()
```

---

## ⚙️ Configuration Files

### Backend Configuration
- **File**: `/home/abdulbaqi/gem/backend/.env`
- **Database URI**: `mongodb://localhost:27017/cybersec-essentials`
- **Backend Port**: `5000`
- **Frontend URL**: `http://localhost:3000`

### Update .env if needed:
```properties
MONGODB_URI=mongodb://localhost:27017/cybersec-essentials
```

---

Enjoy! Once MongoDB is running, your admin dashboard will be fully functional. 🎉
