const express = require('express')
const router = express.Router();

const groupController = require('../controllers/group');


// router.post('/signup', userController.createNewUser);

// router.post('/login', userController.authenticateUser);

router.post('/create-group', groupController.createGroup);

router.get('/get-mygroups', groupController.getCurrentUserGroups);

// router.get('/users-status', userAuthentication.isAuthenticated, userController.getAllUsersWithStatus);


module.exports = router;