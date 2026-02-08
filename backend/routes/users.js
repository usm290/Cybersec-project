const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Progress = require('../models/Progress');
const QuizResult = require('../models/QuizResult');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const progress = await Progress.findOne({ userId: req.user._id });

        res.status(200).json({
            success: true,
            user: user.toJSON(),
            progress
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching profile',
            error: error.message
        });
    }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, [
    body('name').optional().trim().isLength({ min: 2 }),
    body('bio').optional().trim(),
    body('expertise').optional().isArray()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { name, bio, expertise, profilePicture } = req.body;
        const user = await User.findById(req.user._id);

        if (name) user.name = name;
        if (bio !== undefined) user.bio = bio;
        if (expertise) user.expertise = expertise;
        if (profilePicture) user.profilePicture = profilePicture;

        user.updatedAt = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: user.toJSON()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating profile',
            error: error.message
        });
    }
});

// @route   PUT /api/users/password
// @desc    Update user password
// @access  Private
router.put('/password', protect, [
    body('currentPassword', 'Current password is required').exists(),
    body('newPassword', 'New password must be at least 6 characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id).select('+password');

        // Check current password
        const isMatch = await user.matchPassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating password',
            error: error.message
        });
    }
});

// @route   GET /api/users/progress
// @desc    Get user learning progress
// @access  Private
router.get('/progress', protect, async (req, res) => {
    try {
        const progress = await Progress.findOne({ userId: req.user._id });

        if (!progress) {
            return res.status(404).json({
                success: false,
                message: 'Progress record not found'
            });
        }

        res.status(200).json({
            success: true,
            progress
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching progress',
            error: error.message
        });
    }
});

// @route   GET /api/users/quiz-results
// @desc    Get user quiz results
// @access  Private
router.get('/quiz-results', protect, async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;

        const results = await QuizResult.find({ userId: req.user._id })
            .sort({ completedAt: -1 })
            .limit(limit)
            .skip((page - 1) * limit);

        const total = await QuizResult.countDocuments({ userId: req.user._id });

        res.status(200).json({
            success: true,
            total,
            count: results.length,
            page,
            pages: Math.ceil(total / limit),
            results
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching quiz results',
            error: error.message
        });
    }
});

// @route   GET /api/users/dashboard
// @desc    Get user dashboard data (overview)
// @access  Private
router.get('/dashboard', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const progress = await Progress.findOne({ userId: req.user._id });
        const recentQuizzes = await QuizResult.find({ userId: req.user._id })
            .sort({ completedAt: -1 })
            .limit(5);

        const stats = {
            name: user.name,
            email: user.email,
            profilePicture: user.profilePicture,
            completionPercentage: progress?.completionPercentage || 0,
            averageScore: progress?.averageScore || 0,
            totalTimeSpent: progress?.totalTimeSpent || 0,
            certificateEarned: progress?.certificateEarned || false,
            streakDays: progress?.streakDays || 0,
            modulesCompleted: progress?.modulesCompleted.length || 0,
            recentQuizzes
        };

        res.status(200).json({
            success: true,
            dashboard: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard data',
            error: error.message
        });
    }
});

// @route   DELETE /api/users/account
// @desc    Delete user account
// @access  Private
router.delete('/account', protect, async (req, res) => {
    try {
        // Delete user data
        await User.findByIdAndDelete(req.user._id);
        await Progress.deleteOne({ userId: req.user._id });
        await QuizResult.deleteMany({ userId: req.user._id });

        res.status(200).json({
            success: true,
            message: 'Account deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting account',
            error: error.message
        });
    }
});

module.exports = router;
