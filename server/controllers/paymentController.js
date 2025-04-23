const pool = require('../db/db');

const makePayment = async (req, res) => {
  const { payment_method, amount } = req.body;
  const orderId = 1; // Replace with actual order ID in production

  try {
    await pool.query(
      'INSERT INTO payments(order_id, payment_method, amount) VALUES($1, $2, $3)',
      [orderId, payment_method, amount]
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { makePayment };