const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  const wes = { name: 'Carlos', age: 15 };
  // res.send('Hey! It works!');
  // res.json(wes)
  // res.send(req.query.name);
  // res.send(req.query.name);
  res.render('hello', {
    name: req.query.name,
    dog: req.query.age
  });
});

router.get('/reverse/:name', (req, res) => {
  const reverse = [...req.params.name].reverse().join('');
  res.send(reverse);
});

module.exports = router;
