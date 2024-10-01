const express = require('express');

const router = express.Router();
const db = require('../db.js');

const data = db.getAllQuotes();

router.get('/', (req, res) => {
  const { id } = req.query;

  if (!id) {
    res.json(data);
    return;
  }

  const idMatch = data.find((d) => d.id === id);

  if (idMatch) {
    res.json(idMatch);
  } else {
    res.json({});
  }
});

router.get('/random', (req, res) => {
  res.json(db.randomQuote());
});

router.get('/recent', (req, res) => {
  res.json(db.recentQuote());
});

router.get('/:id', (req, res) => { // Note the colon, which matches anything after '/' and assigns it to the `id` variable
  console.log(req.params);
  res.send(db.getQuotesById(req.params));
});

module.exports = router;
