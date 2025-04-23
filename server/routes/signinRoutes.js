const express = require('express');
const path = require('path');
const router = express.Router();
const { signin } = require('../controllers/signinController');

router.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Sign In</title></head>
      <body style="font-family:sans-serif; text-align:center; padding-top:50px;">
        <h1>Sign In</h1>
        <form method="POST" action="/signin">
          <input name="username" placeholder="Username" required><br><br>
          <input name="password" type="password" placeholder="Password" required><br><br>
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </body>
    </html>
  `);
});

router.post('/', signin);

router.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname,'../../public/index.html')); // Replace with real menu logic later
});

module.exports = router;