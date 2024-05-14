const Group = require('../models/Group');
const Groupmember = require('../models/Groupmember');
const User = require('../models/User');
//const Groupmember = require("../models/Groupmember");



exports.editGroup = async (req, res) => {

    try {
        
        const {groupName, groupImage, selectedUsers} = req.body;

        const user = req.user;
        console.log('Current-User : ', user);

        const groupId = req.params.editId;
        console.log('Group-Id : ' +groupId);

        if (groupName.trim() === '') {
            return res.status(400).json({ message: 'Group-Name should not be blank.' });
        }

        if (groupImage.trim() === '') {
            return res.status(400).json({ message: 'Group-Image should not be blank.' });
        }

        // if (!selectedUsers || selectedUsers.length == 0) {
        //     return res.status(400).json({ message: 'Bad request. Please add users.' });
        // }

        if (groupId.trim() === '') {
            return res.status(400).json({ message: 'groupId should not be blank.' });
        }

        console.log('Group-Name : ', groupName);
        console.log('Group-Image : ', groupImage);
        console.log('Selected-Users : ', selectedUsers);

        const existingGroup = await Group.findByPk(groupId);
        if (!existingGroup) {
            return res.status(404).json({ message: 'Group not found.' });
        } else {
            console.log('Group Found', existingGroup);
        }

        if (existingGroup.groupName !== groupName) {
            existingGroup.groupName = groupName;
        }

        if (existingGroup.imgpath !== groupImage) {
            existingGroup.imgpath = groupImage;
        }
          
        const existingMemberIds = (await existingGroup.getUsers()).map(member => member.id);
        const selectedUserIds = selectedUsers.filter(user => user.username !== 'admin').map(user => user.userId);
        selectedUserIds.push(req.user.id);

        const adminUserIds = selectedUsers.filter(user => user.username === 'admin').map(user => parseInt(user.userId));
        adminUserIds.push(req.user.id);

        const removedMembers = existingMemberIds.filter(id => !selectedUserIds.includes(id));
        const newMembers = selectedUserIds.filter(id => !existingMemberIds.includes(id));

        await Promise.all([
            existingGroup.removeUsers(removedMembers),
            existingGroup.addUsers(newMembers)
        ]);

        existingGroup.save();
        await updateIsAdminForAdminIds(adminUserIds, groupId);

        res.status(200).json({ group: existingGroup, message: 'Group updated successfully.' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}





const updateIsAdminForAdminIds = async (adminUserIds, groupId) => {
    try {
        await Promise.all(adminUserIds.map(async adminId => {
            await Groupmember.update({ isAdmin: true }, { where: { userId: adminId, groupId: groupId } });
        }));
    } catch (error) {
        console.error('Error updating isAdmin for adminIds:', error);
        throw error;
    }
};





exports.getCurrentGroupMembers = async (req, res) => {
    
    //console.log(Object.keys(Group.prototype));
    //console.log(Object.keys(Groupmember.prototype));

    try {

        const groupId = req.params.groupId;
        const group = await Group.findByPk(groupId);

        if (!group) {
          return res.status(404).json({ error: 'Group not found' });
        }

        const groupMembers = await group.getUsers({
          attributes: ['id', 'name', 'email', 'phone', 'status'],
        });

        return res.status(200).json({ group, groupMembers });
    
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

}




exports.getCurrentUserGroups = async (req, res) => {

    try {
        
        //console.log(Object.keys(Group.prototype));
        //console.log(Object.keys(User.prototype));
    
        const groups = await req.user.getGroups();
        
        if (groups) {
            return res.status(200).json({ success: true, groups });
        }
        
        throw new Error('Cannot fetch the groups');
    
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}






exports.createGroup = async (req, res) => {

    try {

        const user = req.user;
        console.log('Current-User : ', user.id);

        const {groupName, groupImage, selectedUsers} = req.body;

        if (groupName.trim() === '') {
            return res.status(400).json({ message: 'Group-Name should not be blank.' });
        }

        if (groupImage.trim() === '') {
            return res.status(400).json({ message: 'Group-Image should not be blank.' });
        }

        if (!selectedUsers || selectedUsers.length == 0) {
            return res.status(400).json({ message: 'Bad request.Please add users' });
        }

        console.log('Group-Image : ', groupImage);
        console.log('Group-Name : ', groupName);
        console.log('Selected-User : ', selectedUsers);

        const userIds = [];
        const adminIds = [];
        for (const user of selectedUsers) {
            if (user.checkboxId.startsWith('adminUser')) {
                console.log('----xx---' +user.checkboxId);
                adminIds.push(parseInt(user.checkboxId.replace('adminUser', '')));
            } else {
                console.log('-------' +user.userId);
                userIds.push(parseInt(user.userId));
            }
        }

        adminIds.push(req.user.id);
        userIds.push(req.user.id);

        console.log('Users-Id-Array : ', userIds);
        console.log('Total-Users : ', userIds.length);

        console.log('Admin-Ids-Array : ', adminIds);       
        console.log('Total-Admins : ', adminIds.length);

        const group = await Group.create({ 
            groupName: groupName,
            imgpath: groupImage,
            totalUsers: userIds.length,
        });

        for (const userId of userIds) {
            const groupMember = await Groupmember .create({
                userId: userId,
                groupId: group.id,
                isAdmin: adminIds.includes(userId),
            });
        }

        res.status(201).json({ group, message: 'Group creation is successful' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}