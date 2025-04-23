const pool = require('../db/db');

const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username=$1 AND password=$2',
      [username, password]
    );

    if (result.rows.length > 0) {
      // User found, successful login
      res.redirect('/signin/menu');
    } else {
      // No user found
      res.send(`
        <p>Invalid credentials.</p>
        <a href="/signin">Try Again</a>
      `);
    }
  } catch (error) {
    console.error(error);
    res.send(`
      <p>Error during login.</p>
      <a href="/signin">Try Again</a>
    `);
  }
};

module.exports = { signin };