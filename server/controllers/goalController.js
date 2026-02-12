const SustainabilityGoal = require('../models/SustainabilityGoal');

exports.createGoal = async (req, res) => {
  try {
    const goal = await SustainabilityGoal.create(req.body);
    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getGoals = async (req, res) => {
  try {
    const goals = await SustainabilityGoal.find();
    res.json(goals);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    await SustainabilityGoal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Goal deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
