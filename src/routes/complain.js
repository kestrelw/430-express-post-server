const express = require('express');

const router = express.Router();

router.get('/cry', (req, res) => {
  res.send('Wahh - I got zero!!');
});

router.get('/whine', (req, res) => {
  res.send('I want Ramune');
});

module.exports = router;
