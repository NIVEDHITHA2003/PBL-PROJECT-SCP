const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    console.log('getAllUsers called by:', req.user?.email, 'Role:', req.user?.role);
    const users = await User.find().select('-password');
    console.log('Found users:', users.length);
    res.json(users);
  } catch (error) {
    console.error('getAllUsers error:', error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete yourself' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
