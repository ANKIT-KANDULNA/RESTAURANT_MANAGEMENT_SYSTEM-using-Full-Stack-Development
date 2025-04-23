const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public/')));

// Routes
const signinRoutes = require('./routes/signinRoutes');
const signupRoutes = require('./routes/signupRoutes');
const billRoutes = require('./routes/billRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

app.use('/signin', signinRoutes);
app.use('/signup', signupRoutes);
app.use('/bill', billRoutes);
app.use('/feedback', feedbackRoutes);
app.use('/payment', paymentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});