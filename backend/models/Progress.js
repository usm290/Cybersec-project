const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    modulesCompleted: [{
        moduleId: String,
        moduleName: String,
        completedAt: {
            type: Date,
            default: Date.now
        },
        score: Number,
        timeSpent: Number
    }],
    currentModule: {
        type: String,
        default: null
    },
    totalTimeSpent: {
        type: Number,
        default: 0 // in seconds
    },
    completionPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    averageScore: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    streakDays: {
        type: Number,
        default: 0
    },
    lastActivityDate: {
        type: Date,
        default: null
    },
    certificateEarned: {
        type: Boolean,
        default: false
    },
    certificateDate: {
        type: Date,
        default: null
    },
    badges: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
progressSchema.index({ userId: 1 });

module.exports = mongoose.model('Progress', progressSchema);
