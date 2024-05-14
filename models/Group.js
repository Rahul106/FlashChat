const DataTypes = require('sequelize');
const sequelize = require('../utils/database');

const Group = sequelize.define('groups', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,    
    },

    groupName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    
    imgpath: {
      type: DataTypes.TEXT, 
      allowNull: false,
      defaultValue: 'D:\\Project_Workspace\\CodeRoot\\Sharpener\\JavaScript\\Projects\\FlashChat\\public\\images\\group\\group2.png' 
    },

    totalUsers: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});


module.exports = Group;