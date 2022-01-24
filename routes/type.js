const router = require('express').Router();
const verify = require('../middlewares/verifyToken');

const typeController = require('../controllers/TypeController');

router.get('/',verify, typeController.getTypes);
router.post('/',verify, typeController.addType);


module.exports = router;