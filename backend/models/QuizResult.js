const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    moduleId: {
        type: String,
        required: true
    },
    moduleName: {
        type: String,
        required: true
    },
    answers: [{
        questionId: Number,
        question: String,
        selectedAnswer: String,
        correctAnswer: String,
        isCorrect: Boolean
    }],
    totalQuestions: {
        type: Number,
        required: true
    },
    correctAnswers: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    timeSpent: {
        type: Number, // in seconds
        default: 0
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    },
    passed: {
        type: Boolean,
        default: false // Assuming 60% is passing
    },
    completedAt: {
        type: Date,
        default: Date.now
    }
});

// Index for faster queries
quizResultSchema.index({ userId: 1, moduleId: 1 });
quizResultSchema.index({ userId: 1, completedAt: -1 });

module.exports = mongoose.model('QuizResult', quizResultSchema);
