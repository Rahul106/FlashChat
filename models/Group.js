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

    // adminId: {
    //     type: DataTypes.INTEGER,
    //     allowNull:false
    // },

    totalUsers: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});


module.exports = Group;