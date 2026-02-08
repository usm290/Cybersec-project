const express = require('express');
const User = require('../models/User');
const QuizResult = require('../models/QuizResult');
const Progress = require('../models/Progress');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// Protect all admin routes
router.use(protect);
router.use(admin);

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const role = req.query.role; // Filter by role if provided

        let query = {};
        if (role) query.role = role;

        const users = await User.find(query)
            .select('-password')
            .limit(limit)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await User.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            count: users.length,
            page,
            pages: Math.ceil(total / limit),
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
});

// @route   GET /api/admin/users/:userId
// @desc    Get specific user details
// @access  Private/Admin
router.get('/users/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const progress = await Progress.findOne({ userId: req.params.userId });
        const quizResults = await QuizResult.find({ userId: req.params.userId });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            user: user.toJSON(),
            progress,
            quizResultsCount: quizResults.length,
            averageScore: quizResults.length > 0
                ? Math.round(quizResults.reduce((sum, r) => sum + r.score, 0) / quizResults.length)
                : 0
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user details',
            error: error.message
        });
    }
});

// @route   PUT /api/admin/users/:userId
// @desc    Update user information
// @access  Private/Admin
router.put('/users/:userId', async (req, res) => {
    try {
        const { name, email, role, isActive } = req.body;
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (role) user.role = role;
        if (isActive !== undefined) user.isActive = isActive;

        user.updatedAt = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user: user.toJSON()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
});

// @route   DELETE /api/admin/users/:userId
// @desc    Delete user account
// @access  Private/Admin
router.delete('/users/:userId', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Delete related data
        await Progress.deleteOne({ userId: req.params.userId });
        await QuizResult.deleteMany({ userId: req.params.userId });

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
});

// @route   GET /api/admin/statistics
// @desc    Get platform statistics
// @access  Private/Admin
router.get('/statistics', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ isActive: true });
        const adminUsers = await User.countDocuments({ role: 'admin' });
        const totalQuizAttempts = await QuizResult.countDocuments();
        const certificateEarned = await Progress.countDocuments({ certificateEarned: true });

        // Get average score across platform
        const quizResults = await QuizResult.find();
        const averageScore = quizResults.length > 0
            ? Math.round(quizResults.reduce((sum, r) => sum + r.score, 0) / quizResults.length)
            : 0;

        // Module completion stats
        const progressRecords = await Progress.find();
        let moduleCompletionStats = {};
        progressRecords.forEach(progress => {
            progress.modulesCompleted.forEach(module => {
                if (!moduleCompletionStats[module.moduleId]) {
                    moduleCompletionStats[module.moduleId] = 0;
                }
                moduleCompletionStats[module.moduleId]++;
            });
        });

        res.status(200).json({
            success: true,
            statistics: {
                totalUsers,
                activeUsers,
                adminUsers,
                inactiveUsers: totalUsers - activeUsers,
                totalQuizAttempts,
                certificateEarned,
                averageScore,
                platformAverageCompletion: Math.round(
                    progressRecords.reduce((sum, p) => sum + p.completionPercentage, 0) / 
                    (progressRecords.length || 1)
                ),
                moduleCompletionStats
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics',
            error: error.message
        });
    }
});

// @route   GET /api/admin/analytics
// @desc    Get detailed analytics
// @access  Private/Admin
router.get('/analytics', async (req, res) => {
    try {
        const period = req.query.period || 'month'; // day, week, month, year
        const now = new Date();
        let startDate;

        switch (period) {
            case 'day':
                startDate = new Date(now.setDate(now.getDate() - 1));
                break;
            case 'week':
                startDate = new Date(now.setDate(now.getDate() - 7));
                break;
            case 'month':
                startDate = new Date(now.setMonth(now.getMonth() - 1));
                break;
            case 'year':
                startDate = new Date(now.setFullYear(now.getFullYear() - 1));
                break;
            default:
                startDate = new Date(now.setMonth(now.getMonth() - 1));
        }

        // New users in period
        const newUsers = await User.countDocuments({
            createdAt: { $gte: startDate }
        });

        // Quiz attempts in period
        const quizAttempts = await QuizResult.find({
            completedAt: { $gte: startDate }
        });

        // Certificates earned in period
        const certificatesEarned = await Progress.countDocuments({
            certificateDate: { $gte: startDate }
        });

        // Most popular module
        let moduleStats = {};
        quizAttempts.forEach(attempt => {
            if (!moduleStats[attempt.moduleId]) {
                moduleStats[attempt.moduleId] = {
                    moduleId: attempt.moduleId,
                    moduleName: attempt.moduleName,
                    attempts: 0,
                    averageScore: 0,
                    passRate: 0
                };
            }
            moduleStats[attempt.moduleId].attempts++;
        });

        // Calculate stats for each module
        Object.keys(moduleStats).forEach(moduleId => {
            const moduleAttempts = quizAttempts.filter(q => q.moduleId === moduleId);
            const scores = moduleAttempts.map(q => q.score);
            const passedCount = moduleAttempts.filter(q => q.passed).length;

            moduleStats[moduleId].averageScore = Math.round(
                scores.reduce((a, b) => a + b, 0) / scores.length
            );
            moduleStats[moduleId].passRate = Math.round((passedCount / moduleAttempts.length) * 100);
        });

        res.status(200).json({
            success: true,
            period,
            analytics: {
                newUsers,
                quizAttempts: quizAttempts.length,
                certificatesEarned,
                averageQuizScore: quizAttempts.length > 0
                    ? Math.round(quizAttempts.reduce((sum, q) => sum + q.score, 0) / quizAttempts.length)
                    : 0,
                moduleStatistics: Object.values(moduleStats)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching analytics',
            error: error.message
        });
    }
});

// @route   POST /api/admin/user-activity
// @desc    Get user activity report
// @access  Private/Admin
router.post('/user-activity', async (req, res) => {
    try {
        const { userId, startDate, endDate } = req.body;

        const quizResults = await QuizResult.find({
            userId,
            completedAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }).sort({ completedAt: -1 });

        const user = await User.findById(userId);
        const progress = await Progress.findOne({ userId });

        res.status(200).json({
            success: true,
            userActivity: {
                user: user.toJSON(),
                quizzes: quizResults,
                totalQuizzesAttempted: quizResults.length,
                averageScore: quizResults.length > 0
                    ? Math.round(quizResults.reduce((sum, q) => sum + q.score, 0) / quizResults.length)
                    : 0,
                progress
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user activity',
            error: error.message
        });
    }
});

module.exports = router;
