const ResourceUsage = require('../models/ResourceUsage');

exports.createResource = async (req, res) => {
  try {
    const { electricityUsage, waterConsumption, wasteGenerated, month, year } = req.body;

    const resource = await ResourceUsage.create({
      userId: req.user._id,
      electricityUsage,
      waterConsumption,
      wasteGenerated,
      month,
      year
    });

    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getResources = async (req, res) => {
  try {
    const { month, year } = req.query;
    const filter = req.user.role === 'Admin' ? {} : { userId: req.user._id };

    if (month) filter.month = parseInt(month);
    if (year) filter.year = parseInt(year);

    const resources = await ResourceUsage.find(filter)
      .populate('userId', 'name email role')
      .sort({ year: -1, month: -1 });

    res.json(resources);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateResource = async (req, res) => {
  try {
    const resource = await ResourceUsage.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (resource.userId.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updated = await ResourceUsage.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const resource = await ResourceUsage.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (resource.userId.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await ResourceUsage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resource deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const filter = req.user.role === 'Admin' ? {} : { userId: req.user._id };

    const analytics = await ResourceUsage.aggregate([
      { $match: filter },
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

    res.json(analytics[0] || {});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
