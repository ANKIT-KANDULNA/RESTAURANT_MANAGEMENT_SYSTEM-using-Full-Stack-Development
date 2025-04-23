const pool = require('../db/db');

const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    await pool.query(
      'INSERT INTO users(username,password) VALUES($1,$2)',
      [username, password]
    );
    res.send(`
      <p>Signup successful!</p>
      <a href="/signin">Go to Sign In</a>
    `);
  } catch (error) {
    console.error(error);
    res.send(`
      <p>Error during signup. Maybe user already exists?</p>
      <a href="/signup">Try Again</a>
    `);
  }
};

module.exports = { signup };