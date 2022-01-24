const router = require('express').Router();
const verify = require('../middlewares/verifyToken');

const restrictionController = require('../controllers/RestrictionsController');

router.get('/',verify, restrictionController.getRestrictions);
router.post('/',verify, restrictionController.addRestrictions);


module.exports = router;