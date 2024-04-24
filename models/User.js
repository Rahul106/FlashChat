const { DataTypes } = require("sequelize");
const sequelize = require('../utils/database'); 

const User = sequelize.define("user", {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM('offline', 'online'),
    allowNull: false,
    defaultValue: 'offline',
  },

});

module.exports = User;
