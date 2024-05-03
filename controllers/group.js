//const Group = require('../models/Group');
//const Groupmember = require('../models/Groupmember');




exports.getCurrentUserGroups = async (req, res) => {

    try {
        
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
        console.log('Current-User : ', user);

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

        const userIds = selectedUsers.map(user => user.userId);
        userIds.push(user.id);

        console.log('Users-Id-Array : ' +userIds);

        const totalUsers = userIds.length;
        console.log('TotalUsers : ' +totalUsers);

        const group = await req.user.createGroup({ 
            groupName: groupName, 
            adminId: user.id, 
            totalUsers: totalUsers,
         });

        if (!group) {
            throw new Error('error in group creation');
        }
        console.log('Group created:', group);

        for (const userId of userIds) {
            await group.addUsers(userId);
            console.log('User added to group:', userId);
        }

        res.status(201).json({ group, message: 'Group creation is successfull' })
    
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}
