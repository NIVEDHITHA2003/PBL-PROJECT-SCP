const mongoose = require('mongoose');

const sustainabilityGoalSchema = new mongoose.Schema({
  targetType: {
    type: String,
    enum: ['energy', 'water', 'waste'],
    required: true
  },
  targetValue: {
    type: Number,
    required: [true, 'Target value is required'],
    min: 0
  },
  description: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('SustainabilityGoal', sustainabilityGoalSchema);
