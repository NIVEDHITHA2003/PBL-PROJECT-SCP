const mongoose = require('mongoose');

const resourceUsageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  electricityUsage: {
    type: Number,
    required: [true, 'Electricity usage is required'],
    min: 0
  },
  waterConsumption: {
    type: Number,
    required: [true, 'Water consumption is required'],
    min: 0
  },
  wasteGenerated: {
    type: Number,
    required: [true, 'Waste generated is required'],
    min: 0
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  year: {
    type: Number,
    required: true,
    min: 2020
  }
}, { timestamps: true });

resourceUsageSchema.index({ userId: 1, month: 1, year: 1 });

module.exports = mongoose.model('ResourceUsage', resourceUsageSchema);
