const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const quizRoutes = require('./routes/quizzes');
const progressRoutes = require('./routes/progress');
const adminRoutes = require('./routes/admin');
const courseRoutes = require('./routes/courses');

// Initialize Express
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Logging
app.use(express.json({ limit: '10mb' })); // Body parser
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Database Connection
const jwt = require('jsonwebtoken');

let dbConnected = false;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cybersec-essentials', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    dbConnected = true;
    console.log('✅ MongoDB Connected');
})
.catch(err => {
    dbConnected = false;
    console.error('❌ MongoDB Connection Error:', err.message);
    console.error('⚠️ Starting server in degraded mode (DB unavailable). Some routes may be mocked for local testing.');
    // don't exit; allow the server to start so the UI can connect and the health-check works
});

// Routes
// When the DB is unavailable we mount a small fallback router that provides
// minimal mocked endpoints (auth login + admin statistics + users) so the
// admin UI can connect and be tested without a running MongoDB instance.
const fallbackRouter = express.Router();

fallbackRouter.post('/auth/login', (req, res, next) => {
    if (dbConnected) return next();
    const { email, password } = req.body || {};
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET || 'dev_jwt_secret', { expiresIn: process.env.JWT_EXPIRE || '7d' });
        return res.json({ success: true, token });
    }
    return res.status(401).json({ success: false, message: 'Invalid credentials (mock)' });
});

fallbackRouter.get('/admin/statistics', (req, res, next) => {
    if (dbConnected) return next();
    return res.json({
        totalUsers: 12,
        activeUsers: 4,
        totalQuizzes: 5,
        avgScore: 82.3,
        certificatesEarned: 3,
        platformCompletion: 41,
        moduleStats: [
            { module: 'Phishing', completed: 8 },
            { module: 'Passwords', completed: 6 },
            { module: 'Device Security', completed: 4 }
        ],
        recentUsers: [
            { name: 'Demo Admin', email: process.env.ADMIN_EMAIL || 'admin@example.com', joined: new Date().toISOString() }
        ]
    });
});

fallbackRouter.get('/admin/users', (req, res, next) => {
    if (dbConnected) return next();
    return res.json([
        { _id: 'mock-1', name: 'Demo Admin', email: process.env.ADMIN_EMAIL || 'admin@example.com', role: 'admin', status: 'active', createdAt: new Date().toISOString() }
    ]);
});

app.use('/api', fallbackRouter);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK',
        message: 'Cybersecurity Essentials Backend is running',
        timestamp: new Date().toISOString()
    });
});

// 404 Handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        success: false,
        message: 'Route not found'
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { error: err })
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
