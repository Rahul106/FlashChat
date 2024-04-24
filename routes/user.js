const express = require('express')
const router = express.Router();

const userController = require('../controllers/user');
const userAuthentication = require('../middlewares/auth');


router.post('/signup', userController.createNewUser);

router.post('/login', userController.authenticateUser);

router.get('/current-user', userAuthentication.isAuthenticated, userController.getCurrentUserInfo);

router.get('/users-status', userAuthentication.isAuthenticated, userController.getAllUsersWithStatus);


module.exports = router;