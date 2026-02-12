const ResourceUsage = require('../models/ResourceUsage');
const User = require('../models/User');
const SustainabilityGoal = require('../models/SustainabilityGoal');

exports.getStudentDashboard = async (req, res) => {
  try {
    const resources = await ResourceUsage.find({ userId: req.user._id }).sort({ year: -1, month: -1 }).limit(6);
    
    const stats = await ResourceUsage.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: null,
          totalElectricity: { $sum: '$electricityUsage' },
          totalWater: { $sum: '$waterConsumption' },
          totalWaste: { $sum: '$wasteGenerated' },
          avgElectricity: { $avg: '$electricityUsage' },
          avgWater: { $avg: '$waterConsumption' },
          avgWaste: { $avg: '$wasteGenerated' }
        }
      }
    ]);

    const suggestions = [];
    if (stats[0]?.avgElectricity > 500) suggestions.push({ type: 'electricity', message: 'High electricity usage. Switch to LED bulbs and unplug devices.' });
    if (stats[0]?.avgWater > 300) suggestions.push({ type: 'water', message: 'High water consumption. Fix leaks and use water-saving fixtures.' });
    if (stats[0]?.avgWaste > 50) suggestions.push({ type: 'waste', message: 'High waste generation. Practice waste segregation and recycling.' });

    res.json({ stats: stats[0] || {}, resources, suggestions });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getFacultyDashboard = async (req, res) => {
  try {
    const { month, year } = req.query;
    const filter = {};
    if (month) filter.month = parseInt(month);
    if (year) filter.year = parseInt(year);

    const campusStats = await ResourceUsage.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalElectricity: { $sum: '$electricityUsage' },
          totalWater: { $sum: '$waterConsumption' },
          totalWaste: { $sum: '$wasteGenerated' },
          avgElectricity: { $avg: '$electricityUsage' },
          avgWater: { $avg: '$waterConsumption' },
          avgWaste: { $avg: '$wasteGenerated' },
          recordCount: { $sum: 1 }
        }
      }
    ]);

    const monthlyTrends = await ResourceUsage.aggregate([
      { $match: filter },
      {
        $group: {
          _id: { month: '$month', year: '$year' },
          electricity: { $sum: '$electricityUsage' },
          water: { $sum: '$waterConsumption' },
          waste: { $sum: '$wasteGenerated' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    const resourceDistribution = await ResourceUsage.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          electricity: { $sum: '$electricityUsage' },
          water: { $sum: '$waterConsumption' },
          waste: { $sum: '$wasteGenerated' }
        }
      }
    ]);

    res.json({ campusStats: campusStats[0] || {}, monthlyTrends, resourceDistribution: resourceDistribution[0] || {} });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRecords = await ResourceUsage.countDocuments();
    const totalGoals = await SustainabilityGoal.countDocuments();

    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    const recentActivity = await ResourceUsage.find()
      .populate('userId', 'name email role')
      .sort({ createdAt: -1 })
      .limit(10);

    const goals = await SustainabilityGoal.find();

    const overallStats = await ResourceUsage.aggregate([
      {
        $group: {
          _id: null,
          totalElectricity: { $sum: '$electricityUsage' },
          totalWater: { $sum: '$waterConsumption' },
          totalWaste: { $sum: '$wasteGenerated' }
        }
      }
    ]);

    const goalProgress = goals.map(goal => {
      const actual = overallStats[0]?.[`total${goal.targetType.charAt(0).toUpperCase() + goal.targetType.slice(1)}`] || 0;
      return {
        ...goal.toObject(),
        actual,
        percentage: goal.targetValue > 0 ? Math.min((actual / goal.targetValue) * 100, 100) : 0
      };
    });

    res.json({
      summary: { totalUsers, totalRecords, totalGoals },
      usersByRole,
      recentActivity,
      goals,
      goalProgress,
      overallStats: overallStats[0] || {}
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
