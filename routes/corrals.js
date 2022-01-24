const router = require('express').Router();
const verify = require('../middlewares/verifyToken');

const corralController = require('../controllers/CorralController');

router.get('/',verify, corralController.getCorrales);
router.post('/',verify, corralController.addCorral);
router.post('/animals',verify, corralController.getAnimalsByCorral);
router.post('/average',verify, corralController.getAverageByAge);


module.exports = router;