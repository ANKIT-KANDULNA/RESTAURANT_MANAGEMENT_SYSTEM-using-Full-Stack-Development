const express = require('express');
const router = express.Router();
const { addToBill, getBill } = require('../controllers/billController');

router.post('/addToBill', addToBill);
router.get('/getBill', getBill);

module.exports = router;