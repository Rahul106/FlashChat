const express = require('express')
const router = express.Router();

const userController = require('../controllers/user');
const userAuthentication = require('../middlewares/auth');


router.post('/signup', userController.createNewUser);

router.post('/login', userController.authenticateUser);

router.post('/upload-dp',  userAuthentication.isAuthenticated, userController.uploadProfilePicture);

router.get('/current-user',  userAuthentication.isAuthenticated, userController.getCurrentUserInfo);

router.get('/users-status',  userAuthentication.isAuthenticated, userController.getAllUsersWithStatus);

router.get('/logout',  userAuthentication.isAuthenticated, userController.logoutUser);


module.exports = router;