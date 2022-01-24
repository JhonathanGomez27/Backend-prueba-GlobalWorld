const router = require('express').Router();
const verify = require('../middlewares/verifyToken');

const animalController = require('../controllers/AnimalController');

router.get('/',verify, animalController.getAllAnimals);
router.post('/',verify, animalController.addAnimal);

module.exports = router;