const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');



const Chat = sequelize.define('Chat', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
  userType: {
    type: DataTypes.ENUM('user', 'group'),
    allowNull: false
  },

  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  fileUrl: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: 'no-image'
  }
  
});


module.exports = Chat;
