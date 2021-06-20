const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/user-list/:perPage?/:page?', userController.getUserList);

module.exports = router;
