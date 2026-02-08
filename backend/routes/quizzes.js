const express = require('express');
const { body, validationResult } = require('express-validator');
const QuizResult = require('../models/QuizResult');
const Progress = require('../models/Progress');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/quizzes/submit
// @desc    Submit quiz answers and save results
// @access  Private
router.post('/submit', protect, [
    body('moduleId', 'Module ID is required').exists(),
    body('answers', 'Answers array is required').isArray(),
    body('timeSpent', 'Time spent is required').isNumeric()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { moduleId, moduleName, answers, timeSpent } = req.body;
        const userId = req.user._id;

        // Calculate score
        let correctAnswers = 0;
        answers.forEach(answer => {
            if (answer.isCorrect) correctAnswers++;
        });

        const score = Math.round((correctAnswers / answers.length) * 100);
        const passed = score >= 60; // 60% passing score

        // Create quiz result
        const quizResult = new QuizResult({
            userId,
            moduleId,
            moduleName: moduleName || moduleId,
            answers,
            totalQuestions: answers.length,
            correctAnswers,
            score,
            timeSpent,
            passed
        });

        await quizResult.save();

        // Update progress
        let progress = await Progress.findOne({ userId });
        if (!progress) {
            progress = new Progress({ userId });
        }

        // Check if module was already completed
        const moduleCompleted = progress.modulesCompleted.find(m => m.moduleId === moduleId);
        
        if (!moduleCompleted) {
            progress.modulesCompleted.push({
                moduleId,
                moduleName: moduleName || moduleId,
                score,
                timeSpent
            });
        } else {
            // Update with better score if applicable
            if (score > moduleCompleted.score) {
                moduleCompleted.score = score;
                moduleCompleted.timeSpent = timeSpent;
            }
        }

        // Update total time spent
        progress.totalTimeSpent += timeSpent;

        // Update last activity
        progress.lastActivityDate = new Date();

        // Calculate completion percentage (5 modules total)
        progress.completionPercentage = Math.round((progress.modulesCompleted.length / 5) * 100);

        // Calculate average score
        const totalScore = progress.modulesCompleted.reduce((sum, m) => sum + (m.score || 0), 0);
        progress.averageScore = Math.round(totalScore / progress.modulesCompleted.length);

        // Check if certificate earned (all 5 modules with 70+ score)
        if (progress.modulesCompleted.length === 5) {
            const allPassed = progress.modulesCompleted.every(m => m.score >= 70);
            if (allPassed && !progress.certificateEarned) {
                progress.certificateEarned = true;
                progress.certificateDate = new Date();
            }
        }

        await progress.save();

        res.status(201).json({
            success: true,
            message: 'Quiz submitted successfully',
            quizResult: {
                id: quizResult._id,
                score,
                passed,
                correctAnswers,
                totalQuestions: answers.length
            },
            progress: {
                completionPercentage: progress.completionPercentage,
                averageScore: progress.averageScore,
                certificateEarned: progress.certificateEarned
            }
        });
    } catch (error) {
        console.error('Quiz submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting quiz',
            error: error.message
        });
    }
});

// @route   GET /api/quizzes/results/:moduleId
// @desc    Get quiz results for a specific module
// @access  Private
router.get('/results/:moduleId', protect, async (req, res) => {
    try {
        const { moduleId } = req.params;
        const userId = req.user._id;

        const results = await QuizResult.find({ userId, moduleId })
            .sort({ completedAt: -1 });

        res.status(200).json({
            success: true,
            count: results.length,
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

// @route   GET /api/quizzes/history
// @desc    Get all quiz results for user
// @access  Private
router.get('/history', protect, async (req, res) => {
    try {
        const userId = req.user._id;
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;

        const results = await QuizResult.find({ userId })
            .sort({ completedAt: -1 })
            .limit(limit)
            .skip((page - 1) * limit);

        const total = await QuizResult.countDocuments({ userId });

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
            message: 'Error fetching quiz history',
            error: error.message
        });
    }
});

// @route   GET /api/quizzes/analytics
// @desc    Get quiz analytics and performance breakdown
// @access  Private
router.get('/analytics', protect, async (req, res) => {
    try {
        const userId = req.user._id;

        const results = await QuizResult.find({ userId });
        const progress = await Progress.findOne({ userId });

        if (!progress) {
            return res.status(404).json({
                success: false,
                message: 'Progress record not found'
            });
        }

        // Calculate statistics
        const totalQuizzes = results.length;
        const passedQuizzes = results.filter(r => r.passed).length;
        const averageScore = results.length > 0 
            ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)
            : 0;

        // Module-wise breakdown
        const moduleStats = {};
        results.forEach(result => {
            if (!moduleStats[result.moduleId]) {
                moduleStats[result.moduleId] = {
                    moduleId: result.moduleId,
                    moduleName: result.moduleName,
                    attempts: 0,
                    bestScore: 0,
                    averageScore: 0,
                    passed: false,
                    totalTime: 0
                };
            }
            const stat = moduleStats[result.moduleId];
            stat.attempts++;
            stat.bestScore = Math.max(stat.bestScore, result.score);
            stat.totalTime += result.timeSpent;
            if (result.passed) stat.passed = true;
        });

        // Calculate average for each module
        Object.keys(moduleStats).forEach(moduleId => {
            const moduleResults = results.filter(r => r.moduleId === moduleId);
            moduleStats[moduleId].averageScore = Math.round(
                moduleResults.reduce((sum, r) => sum + r.score, 0) / moduleResults.length
            );
        });

        res.status(200).json({
            success: true,
            statistics: {
                totalQuizzes,
                passedQuizzes,
                passRate: totalQuizzes > 0 ? Math.round((passedQuizzes / totalQuizzes) * 100) : 0,
                averageScore,
                totalTimeSpent: progress.totalTimeSpent,
                completionPercentage: progress.completionPercentage,
                certificateEarned: progress.certificateEarned
            },
            moduleBreakdown: Object.values(moduleStats),
            recentQuizzes: results.slice(0, 5)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching analytics',
            error: error.message
        });
    }
});

module.exports = router;
