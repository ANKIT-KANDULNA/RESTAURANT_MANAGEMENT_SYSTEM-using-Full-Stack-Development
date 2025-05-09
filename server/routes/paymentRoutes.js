const express = require('express');
const router = express.Router();
const { makePayment } = require('../controllers/paymentController');

router.post('/makePayment', makePayment);

module.exports = router;