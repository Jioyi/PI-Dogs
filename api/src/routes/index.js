const router = require('express').Router();
const dogs = require('../controllers/dogs.controller');
const temperament = require('../controllers/temperament.controller');

//main routes
router.get('/', (_req, res) => res.json({ message: 'Welcome to the Dogs API.' }));
router.get('/dogs', dogs.getDogs);
router.get('/dogs/:id', dogs.getDogForId);
router.get('/temperament', temperament.getTemperaments);
//router.post('/dog', dog.createDog);


module.exports = router;
