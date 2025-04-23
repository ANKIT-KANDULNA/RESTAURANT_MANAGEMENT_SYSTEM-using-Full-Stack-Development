const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/signupController');

router.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Sign Up</title></head>
      <body style="font-family:sans-serif; text-align:center; padding-top:50px;">
        <h1>Sign Up</h1>
        <form method="POST" action="/signup">
          <input name="username" placeholder="Username" required><br><br>
          <input name="password" type="password" placeholder="Password" required><br><br>
          <button type="submit">Register</button>
        </form>
      </body>
    </html>
  `);
});

router.post('/', signup);

module.exports = router;