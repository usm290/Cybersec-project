# Cybersecurity Essentials - Backend API

Backend server for "The Essential Five" cybersecurity awareness course platform.

## 📋 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **User Profiles**: Customizable user profiles with expertise tracking
- **Quiz System**: Complete quiz submission and results tracking
- **Progress Tracking**: Module completion, time tracking, and certificate management
- **Analytics**: Detailed performance analytics and statistics
- **Admin Dashboard**: Comprehensive admin panel for user and content management
- **Security**: Password hashing, JWT authentication, CORS, helmet security headers

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone and navigate to the backend**
```bash
cd /home/abdulbaqi/gem/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create a `.env` file with your configuration (already provided with placeholders):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cybersec-essentials
JWT_SECRET=your-very-secure-secret-key-change-this
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

4. **Start the server**

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register new user | ❌ |
| POST | `/login` | Login user | ❌ |
| POST | `/verify-token` | Verify JWT token | ❌ |
| POST | `/logout` | Logout user | ✅ |

**Register Example**:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

**Login Example**:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

### Users (`/api/users`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/profile` | Get current user profile | ✅ |
| PUT | `/profile` | Update user profile | ✅ |
| PUT | `/password` | Change password | ✅ |
| GET | `/progress` | Get learning progress | ✅ |
| GET | `/quiz-results` | Get quiz history | ✅ |
| GET | `/dashboard` | Get dashboard overview | ✅ |
| DELETE | `/account` | Delete user account | ✅ |

**Get Profile**:
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer <token>"
```

### Quizzes (`/api/quizzes`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/submit` | Submit quiz answers | ✅ |
| GET | `/results/:moduleId` | Get module quiz results | ✅ |
| GET | `/history` | Get all quiz history | ✅ |
| GET | `/analytics` | Get performance analytics | ✅ |

**Submit Quiz**:
```bash
curl -X POST http://localhost:5000/api/quizzes/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "moduleId": "module1",
    "moduleName": "The Essential Five",
    "answers": [
      {
        "questionId": 1,
        "question": "What is...",
        "selectedAnswer": "A",
        "correctAnswer": "A",
        "isCorrect": true
      }
    ],
    "timeSpent": 1200
  }'
```

### Progress (`/api/progress`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get user progress | ✅ |
| PUT | `/update` | Update current module | ✅ |
| PUT | `/badge` | Add badge | ✅ |
| PUT | `/certificate` | Award certificate | ✅ |
| GET | `/statistics` | Get user statistics | ✅ |

### Courses (`/api/courses`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/` | Get all course modules | ❌ |
| GET | `/:moduleId` | Get module details | ❌ |
| GET | `/:moduleId/lessons` | Get module lessons | ❌ |

### Admin (`/api/admin`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/users` | List all users | ✅ Admin |
| GET | `/users/:userId` | Get user details | ✅ Admin |
| PUT | `/users/:userId` | Update user | ✅ Admin |
| DELETE | `/users/:userId` | Delete user | ✅ Admin |
| GET | `/statistics` | Get platform statistics | ✅ Admin |
| GET | `/analytics` | Get analytics report | ✅ Admin |
| POST | `/user-activity` | Get user activity report | ✅ Admin |

## 📊 Database Models

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
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
  userId: ObjectId,
  moduleId: String,
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
  timeSpent: Number (seconds),
  difficulty: 'easy' | 'medium' | 'hard',
  passed: Boolean,
  completedAt: Date
}
```

### Progress Schema
```javascript
{
  userId: ObjectId (unique),
  modulesCompleted: [{
    moduleId: String,
    moduleName: String,
    completedAt: Date,
    score: Number,
    timeSpent: Number
  }],
  currentModule: String,
  totalTimeSpent: Number,
  completionPercentage: Number (0-100),
  averageScore: Number (0-100),
  streakDays: Number,
  lastActivityDate: Date,
  certificateEarned: Boolean,
  certificateDate: Date,
  badges: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication:

1. **Register**: Create new user account
2. **Login**: Get JWT token
3. **Protected Routes**: Include token in Authorization header
   ```
   Authorization: Bearer <token>
   ```

Tokens expire after 7 days (configurable via `JWT_EXPIRE` in .env)

## 🛡️ Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **CORS**: Cross-origin request handling
- **Helmet**: Security headers middleware
- **Input Validation**: Express-validator for request validation
- **Rate Limiting Ready**: Structure supports rate limiting implementation

## 🧪 Testing the API

### Using cURL

**1. Register a user**:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test123456"
  }'
```

**2. Login**:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123456"
  }'
```

**3. Get User Profile** (use token from login):
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer <your_token_here>"
```

### Using Postman

1. Import the endpoints into Postman
2. Set up environment variables for `base_url` and `token`
3. Test each endpoint systematically

## 📁 Project Structure

```
backend/
├── server.js              # Main server file
├── package.json          # Dependencies
├── .env                  # Environment variables
├── models/              # Database schemas
│   ├── User.js
│   ├── QuizResult.js
│   └── Progress.js
├── routes/              # API route handlers
│   ├── auth.js
│   ├── users.js
│   ├── quizzes.js
│   ├── progress.js
│   ├── courses.js
│   └── admin.js
└── middleware/          # Custom middleware
    └── auth.js
```

## 🔧 Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/cybersec-essentials

# JWT
JWT_SECRET=your-very-secure-secret-key
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3000

# Optional: Email (for future notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=AdminPassword123
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MongoDB URI in .env
- For MongoDB Atlas, whitelist your IP

### Port Already in Use
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Token Validation Error
- Ensure token is in correct format: `Authorization: Bearer <token>`
- Check if token has expired
- Verify JWT_SECRET matches between token generation and validation

## 📈 Next Steps

1. **Connect Frontend**: Update frontend JavaScript to call these API endpoints
2. **Add Email Notifications**: Implement nodemailer for welcome emails, password reset
3. **Rate Limiting**: Add express-rate-limit to prevent abuse
4. **Logging**: Implement Winston or Pino for better logging
5. **Testing**: Add Jest/Mocha tests for API endpoints
6. **Deployment**: Deploy to Heroku, AWS, or DigitalOcean

## 📝 License

MIT

## 👨‍💻 Author

Abdulbaqi Usman

## 📞 Support

For issues or questions, please reach out through the course platform.
