const pool = require('../db/db');

const submitFeedback = async (req, res) => {
  const { message, dish_name } = req.body;
  const userId = 1; // In real app, replace with logged-in user's ID

  try {
    await pool.query(
      'INSERT INTO feedback(user_id, message, dish_name) VALUES($1, $2, $3)',
      [userId, message, dish_name]
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { submitFeedback };