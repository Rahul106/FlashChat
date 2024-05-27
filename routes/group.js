const express = require('express')
const router = express.Router();

const groupController = require('../controllers/group');


router.get('/get-groupmembers/:groupId', groupController.getCurrentGroupMembers);

router.post('/create-group', groupController.createGroup);

router.post('/edit-group/:editId', groupController.editGroup);

router.get('/get-mygroups', groupController.getCurrentUserGroups);

router.get('/get-mygroups/:grpId', groupController.getCurrentGroupDp);


module.exports = router;