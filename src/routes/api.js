const express = require('express');

const router = express.Router();

router.get('/helloJSON', (req, res) => {
  res.json({
    message: 'Hello there!',
  });
});

router.get('/timeJSON', (req, res) => {
  const d = new Date();
  res.json({
    time: `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
  });
});

module.exports = router;
