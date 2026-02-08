const express = require('express');
const Progress = require('../models/Progress');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/progress
// @desc    Get user progress
// @access  Private
router.get('/', protect, async (req, res) => {
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

// @route   PUT /api/progress/update
// @desc    Update current module progress
// @access  Private
router.put('/update', protect, async (req, res) => {
    try {
        const { moduleId, moduleName } = req.body;
        let progress = await Progress.findOne({ userId: req.user._id });

        if (!progress) {
            progress = new Progress({ userId: req.user._id });
        }

        progress.currentModule = moduleId;
        progress.lastActivityDate = new Date();

        await progress.save();

        res.status(200).json({
            success: true,
            message: 'Progress updated',
            progress
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating progress',
            error: error.message
        });
    }
});

// @route   PUT /api/progress/badge
// @desc    Add badge to user
// @access  Private
router.put('/badge', protect, async (req, res) => {
    try {
        const { badge } = req.body;

        if (!badge) {
            return res.status(400).json({
                success: false,
                message: 'Badge name is required'
            });
        }

        let progress = await Progress.findOne({ userId: req.user._id });

        if (!progress) {
            progress = new Progress({ userId: req.user._id });
        }

        if (!progress.badges.includes(badge)) {
            progress.badges.push(badge);
        }

        progress.updatedAt = new Date();
        await progress.save();

        res.status(200).json({
            success: true,
            message: 'Badge added successfully',
            badges: progress.badges
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding badge',
            error: error.message
        });
    }
});

// @route   PUT /api/progress/certificate
// @desc    Award certificate
// @access  Private
router.put('/certificate', protect, async (req, res) => {
    try {
        const progress = await Progress.findOne({ userId: req.user._id });

        if (!progress) {
            return res.status(404).json({
                success: false,
                message: 'Progress record not found'
            });
        }

        progress.certificateEarned = true;
        progress.certificateDate = new Date();
        progress.badges.push('Certificate Holder');

        await progress.save();

        res.status(200).json({
            success: true,
            message: 'Certificate awarded',
            certificateDate: progress.certificateDate
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error awarding certificate',
            error: error.message
        });
    }
});

// @route   GET /api/progress/statistics
// @desc    Get user statistics
// @access  Private
router.get('/statistics', protect, async (req, res) => {
    try {
        const progress = await Progress.findOne({ userId: req.user._id });

        if (!progress) {
            return res.status(404).json({
                success: false,
                message: 'Progress record not found'
            });
        }

        const stats = {
            totalModulesAvailable: 5,
            modulesCompleted: progress.modulesCompleted.length,
            completionPercentage: progress.completionPercentage,
            averageScore: progress.averageScore,
            totalTimeSpent: progress.totalTimeSpent,
            certificateEarned: progress.certificateEarned,
            badgesEarned: progress.badges.length,
            streakDays: progress.streakDays,
            lastActivityDate: progress.lastActivityDate
        };

        res.status(200).json({
            success: true,
            statistics: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics',
            error: error.message
        });
    }
});

module.exports = router;
