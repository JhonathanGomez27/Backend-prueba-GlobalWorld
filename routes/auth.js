const router = require('express').Router();
const usersController = require('../controllers/UserController');

//Register
router.post('/register', usersController.register);

//Login
router.post('/login', usersController.login);

module.exports = router;