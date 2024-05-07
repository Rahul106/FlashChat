const express = require('express')
const router = express.Router();

const groupController = require('../controllers/group');


// router.post('/signup', userController.createNewUser);

// router.post('/login', userController.authenticateUser);

router.get('/get-groupmembers/:groupId', groupController.getCurrentGroupMembers);

router.post('/create-group', groupController.createGroup);

router.post('/edit-group/:editId', groupController.editGroup);

router.get('/get-mygroups', groupController.getCurrentUserGroups);

// router.get('/users-status', userAuthentication.isAuthenticated, userController.getAllUsersWithStatus);


module.exports = router;