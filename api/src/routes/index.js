const router = require('express').Router();
const dog = require('../controllers/dog.controller');
const dogs = require('../controllers/dogs.controller');
const temperament = require('../controllers/temperament.controller');

//main routes
router.get('/', (_req, res) => res.json({ message: 'Welcome to the Dogs API.' }));
router.get('/dogs', dogs.getDogs);
router.get('/dogs/:id', dogs.getDogForId);
router.get('/temperament', temperament.getTemperaments);
router.get('/breed_group', temperament.getBreedGroups);
router.post('/dog', dog.createDog);


module.exports = router;
