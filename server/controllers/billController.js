const pool = require('../db/db');

const addToBill = async (req, res) => {
  const { dish_name, qty, price } = req.body;

  try {
    await pool.query(
      'INSERT INTO bill(dish_name, qty, price) VALUES($1, $2, $3)',
      [dish_name, qty, price]
    );
    res.status(200).send({ message: 'Successfully added to bill' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error adding to bill' });
  }
};

const getBill = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bill');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error retrieving bill' });
  }
};

module.exports = { addToBill, getBill };