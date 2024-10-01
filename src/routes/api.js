const express = require('express');

const router = express.Router();

const generateNewId = () => crypto.randomUUID();

const hoots = [{
  id: generateNewId(),
  content: 'Birbs are better than birds!',
  createdAt: new Date(),
}];

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

router.get('/hoots', (req, res) => {
  res.json(hoots);
});

router.post('/addHoot', (req, res) => {
  console.log('req.body=', req.body); // NEW!
  const test = {
    testId: generateNewId(),
    testMsg: req.body.content, // NEW!
  };
  res.json(test);
});

module.exports = router;
