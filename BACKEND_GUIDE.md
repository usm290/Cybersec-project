# 🚀 Complete Backend Development Guide

## Overview

Your Cybersecurity Essentials backend is now **fully built and ready for development!** This guide walks you through everything you need to know.

## ✅ What's Been Created

### Core Files (15 total)

**🔧 Configuration Files**
- `server.js` - Main Express application entry point
- `package.json` - NPM dependencies and scripts
- `.env` - Current environment configuration
- `.env.example` - Template for .env configuration

**📚 Documentation**
- `README.md` - Full API documentation with cURL examples
- `ARCHITECTURE.md` - System design and architecture overview

**📦 Database Models (3)**
- `models/User.js` - User authentication and profiles
- `models/QuizResult.js` - Quiz submission data
- `models/Progress.js` - Learning progress tracking

**🔗 API Routes (6)**
- `routes/auth.js` - Authentication endpoints (4 endpoints)
- `routes/users.js` - User management (7 endpoints)
- `routes/quizzes.js` - Quiz operations (4 endpoints)
- `routes/progress.js` - Progress tracking (5 endpoints)
- `routes/courses.js` - Course content (3 endpoints)
- `routes/admin.js` - Admin management (7 endpoints)

**🔐 Middleware (1)**
- `middleware/auth.js` - JWT authentication and role checking

**📋 Utility Scripts**
- `setup.sh` - Quick setup script
- `api-test.sh` - API testing script with examples

**Total: 31 API Endpoints** across 6 functional modules

## 🎯 Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
cd /home/abdulbaqi/gem/backend
npm install
```

### Step 2: Configure Environment
```bash
# Copy example .env file
cp .env.example .env

# Edit .env with your settings
nano .env
```

**For local development, keep the defaults:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cybersec-essentials
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

### Step 3: Setup MongoDB

**Option A: Using MongoDB Locally**
```bash
# macOS with Homebrew
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

**Option B: Using MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/db`
4. Update `MONGODB_URI` in `.env`

### Step 4: Start the Server
```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected
🚀 Server running on http://localhost:5000
📊 Health check: http://localhost:5000/api/health
```

### Step 5: Test the API
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# You should get:
# {"status":"OK","message":"Cybersecurity Essentials Backend is running","timestamp":"2024-01-15T..."}
```

## 📊 Project Structure

```
backend/
│
├── server.js                    # Express app setup & middleware
├── package.json                 # Dependencies
├── .env                         # Configuration (your secrets)
├── .env.example                 # Configuration template
│
├── models/                      # Database Schemas
│   ├── User.js                 # Fields: name, email, password, role, etc.
│   ├── QuizResult.js           # Fields: userId, moduleId, score, answers
│   └── Progress.js             # Fields: userId, modulesCompleted, percentage
│
├── routes/                      # API Endpoints
│   ├── auth.js                 # POST /register, /login, /verify-token, /logout
│   ├── users.js                # GET/PUT /profile, /progress, /quiz-results, /dashboard
│   ├── quizzes.js              # POST /submit, GET /history, /results, /analytics
│   ├── progress.js             # GET/PUT progress tracking and badges
│   ├── courses.js              # GET course modules and lessons
│   └── admin.js                # GET/PUT/DELETE user management & analytics
│
├── middleware/                  # Custom Middleware
│   └── auth.js                 # protect(), admin(), optionalAuth()
│
├── README.md                    # API documentation
├── ARCHITECTURE.md              # System design overview
├── setup.sh                     # Setup helper script
└── api-test.sh                  # Testing script with cURL examples
```

## 🔌 API Overview (31 Endpoints)

### 1. Authentication (4 endpoints)
```
POST   /api/auth/register        - Create new account
POST   /api/auth/login           - Login and get JWT token
POST   /api/auth/verify-token    - Verify token validity
POST   /api/auth/logout          - Logout
```

### 2. Users (7 endpoints)
```
GET    /api/users/profile        - Get user info
PUT    /api/users/profile        - Update profile
PUT    /api/users/password       - Change password
GET    /api/users/progress       - Get learning progress
GET    /api/users/quiz-results   - Get quiz history
GET    /api/users/dashboard      - Get dashboard overview
DELETE /api/users/account        - Delete account
```

### 3. Quizzes (4 endpoints)
```
POST   /api/quizzes/submit       - Submit quiz answers
GET    /api/quizzes/results/:id  - Get module results
GET    /api/quizzes/history      - Get all quiz history
GET    /api/quizzes/analytics    - Get performance analytics
```

### 4. Progress (5 endpoints)
```
GET    /api/progress/            - Get progress record
PUT    /api/progress/update      - Update module progress
PUT    /api/progress/badge       - Award badge
PUT    /api/progress/certificate - Award certificate
GET    /api/progress/statistics  - Get user statistics
```

### 5. Courses (3 endpoints)
```
GET    /api/courses/             - List all modules
GET    /api/courses/:moduleId    - Get module details
GET    /api/courses/:id/lessons  - Get module lessons
```

### 6. Admin (7 endpoints)
```
GET    /api/admin/users          - List all users
GET    /api/admin/users/:userId  - Get user details
PUT    /api/admin/users/:userId  - Update user
DELETE /api/admin/users/:userId  - Delete user
GET    /api/admin/statistics     - Get platform stats
GET    /api/admin/analytics      - Get detailed analytics
POST   /api/admin/user-activity  - Get user activity report
```

## 🧪 Testing the API

### Using cURL (Command Line)

**Register a user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

**Get profile (using token from login response):**
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman or Thunder Client

1. Import endpoints from `README.md`
2. Create environment with variable: `token` = JWT from login
3. Use `{{token}}` in Authorization header
4. Test each endpoint systematically

### Using the Auto Test Script

```bash
bash api-test.sh
```

This will:
- ✅ Check server health
- ✅ Register a test user
- ✅ Login and get token
- ✅ Test all major endpoints
- ✅ Display responses

## 📱 Frontend Integration

Your frontend (`/home/abdulbaqi/gem/`) needs to be updated to use this backend:

### 1. Update API Base URL in `script.js`
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### 2. Replace Hardcoded Data with API Calls

**Example: Login**
```javascript
async function login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (data.success) {
        localStorage.setItem('authToken', data.token);
        return data.user;
    }
}
```

**Example: Submit Quiz**
```javascript
async function submitQuiz(moduleId, answers) {
    const token = localStorage.getItem('authToken');
    const response = await fetch(`${API_BASE_URL}/quizzes/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            moduleId,
            answers,
            timeSpent: 1200
        })
    });
    return await response.json();
}
```

## 🔐 Authentication Flow

1. **User Registers**: POST `/api/auth/register`
   - Returns: JWT token + user data
   - Store token in localStorage

2. **User Logs In**: POST `/api/auth/login`
   - Returns: JWT token + user data
   - Store token in localStorage

3. **Protected Requests**: Include token
   ```
   Authorization: Bearer <token>
   ```

4. **Server Validates**: Middleware checks token
   - Valid: Request proceeds
   - Invalid/Expired: 401 response

## 📊 Database Schema

### User Schema
```javascript
{
  name: String,
  email: String,           // unique, indexed
  password: String,        // hashed with bcrypt
  role: 'user' | 'admin',
  profilePicture: String,
  bio: String,
  expertise: [String],
  isVerified: Boolean,
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### QuizResult Schema
```javascript
{
  userId: ObjectId,        // ref to User
  moduleId: String,        // indexed
  moduleName: String,
  answers: [{
    questionId: Number,
    question: String,
    selectedAnswer: String,
    correctAnswer: String,
    isCorrect: Boolean
  }],
  totalQuestions: Number,
  correctAnswers: Number,
  score: Number (0-100),
  timeSpent: Number,       // seconds
  difficulty: 'easy' | 'medium' | 'hard',
  passed: Boolean,
  completedAt: Date        // indexed
}
```

### Progress Schema
```javascript
{
  userId: ObjectId,        // unique ref to User
  modulesCompleted: [{
    moduleId: String,
    moduleName: String,
    completedAt: Date,
    score: Number,
    timeSpent: Number
  }],
  currentModule: String,
  totalTimeSpent: Number,  // seconds
  completionPercentage: Number,
  averageScore: Number,
  streakDays: Number,
  lastActivityDate: Date,
  certificateEarned: Boolean,
  certificateDate: Date,
  badges: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## 🛠️ Development Tips

### Run in Development Mode
```bash
npm run dev
```
- Uses nodemon for auto-restart on file changes
- Better for development

### Run in Production Mode
```bash
npm start
```
- Just runs the server once
- Better for deployment

### Debug Mode
```bash
DEBUG=* npm run dev
```
- Shows detailed logs

### Check MongoDB Connection
```bash
# Open MongoDB shell
mongosh

# List databases
show dbs

# Use the database
use cybersec-essentials

# List collections
show collections

# View sample data
db.users.findOne()
```

## 📈 Next Steps

### Immediate
1. ✅ Install dependencies: `npm install`
2. ✅ Configure `.env` file
3. ✅ Start MongoDB
4. ✅ Run server: `npm run dev`
5. ✅ Test endpoints: `bash api-test.sh`

### Short Term
1. Connect frontend to backend API
2. Implement user registration/login in frontend
3. Update quiz submission to use API
4. Add progress tracking UI updates

### Medium Term
1. Add email notifications (password reset, welcome emails)
2. Implement rate limiting to prevent abuse
3. Add request logging and monitoring
4. Write unit tests for API endpoints

### Long Term
1. Setup CI/CD pipeline (GitHub Actions)
2. Deploy to production (Heroku, AWS, DigitalOcean)
3. Setup CDN for static assets
4. Implement caching strategy
5. Add API versioning

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Ensure MongoDB is running: `brew services start mongodb-community`
- Check `MONGODB_URI` in `.env`

### Port 5000 Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Kill process using port 5000
lsof -ti:5000 | xargs kill -9

# Or use a different port
PORT=5001 npm run dev
```

### Token Expired
```
Error: jwt malformed / jwt expired
```
**Solution:**
- Login again to get new token
- Update `JWT_EXPIRE` in `.env` if needed

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Check `CORS_ORIGIN` in `.env` matches frontend URL
- Default: `http://localhost:3000`

## 📚 Documentation

- **Full API Docs**: See `README.md` in backend folder
- **Architecture Details**: See `ARCHITECTURE.md`
- **Example Requests**: See examples in this file and README.md

## 🎓 Learning Resources

### MongoDB
- Docs: https://docs.mongodb.com/
- Tutorial: https://docs.mongodb.com/manual/introduction/

### Express.js
- Docs: https://expressjs.com/
- Guide: https://expressjs.com/en/starter/installing.html

### JWT Authentication
- Docs: https://jwt.io/
- Guide: https://tools.ietf.org/html/rfc7519

### RESTful APIs
- Guide: https://restfulapi.net/
- Best Practices: https://restfulapi.net/best-practices/

## 🚀 You're Ready!

Your backend is complete and ready for development. You have:

✅ 31 API endpoints
✅ 3 database models
✅ JWT authentication
✅ Admin dashboard backend
✅ Quiz tracking system
✅ Progress tracking
✅ Complete documentation

**Next:** Connect your frontend to these APIs and start building!

Questions? Check README.md and ARCHITECTURE.md for details.

Happy coding! 🎉

---

**Created by**: Abdulbaqi Usman  
**Updated**: 2024  
**Status**: Ready for Development
