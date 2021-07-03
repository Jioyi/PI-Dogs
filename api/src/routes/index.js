const router = require('express').Router();
const dogs = require('../controllers/dogs.controller.js');
//const temperament = require('./temperament.routes');

//main routes
router.get('/', (_req, res) => res.json({ message: 'Welcome to the Dogs API.' }));
router.get('/dogs', dogs.getDogs);
router.get('/dogs/:id', dogs.getDogForId);
//router.use('/temperament', temperament);
//router.use('/dogs', dogs);


module.exports = router;
