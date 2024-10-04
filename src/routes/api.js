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
  // console.log('req.body.content=', req.body.content); // NEW!
  const content = req.body && req.body.content ? req.body.content : 'No req.body or req.body.content found!';

  const hoot = {
    id: generateNewId(),
    content,
    createdAt: new Date(),
  };

  hoots.push(hoot);

  res.status(201).json(hoot);
});

// delete
const getHootById = (id) => {
  const hoot = hoots.find((h) => h.id === id);
  return hoot;
};

const deleteHootById = (id) => {
  const hoot = getHootById(id);
  if (!hoot) return null;
  const index = hoots.indexOf(hoot);
  hoots.splice(index, 1);
  return hoot;
};

router.delete('/deleteHoot/:id([0-9,a-z,A-Z,-]{36})', (req, res) => {
  // res.send('The id you specified for DELETE is ' + req.params.id);
  const hoot = deleteHootById(req.params.id);
  if (!hoot) {
    const error = `id: '${req.params.id}' not found`;
    res.status(404).send({ error });
  } else {
    res.json(hoot);
  }
});

router.put('/updateHoot/:id([0-9,a-z,A-Z,-]{36})', (req, res) => {
  // res.send('The id you specified for DELETE is ' + req.params.id);
  const hoot = getHootById(req.params.id);
  console.log(hoot);
  if (!hoot) {
    const error = `id: '${req.params.id}' not found`;
    res.status(404).send({ error });
  } else {
    const content = req.body && req.body.content ? req.body.content : 'No req.body or req.body.content ound!';
    hoot.content = content;
    hoot.updatedAt = new Date();
    res.json(hoot);
  }
});

module.exports = router;
