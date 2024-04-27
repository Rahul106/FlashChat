// models/ChatMessage.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');


const Chat = sequelize.define('Chat', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  message: {
    type: DataTypes.TEXT,
    allowNull: false
  }
  
});

module.exports = Chat;
