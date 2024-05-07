const DataTypes = require('sequelize');
const sequelize = require('../utils/database');


const Groupmember = sequelize.define('groupmembers', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,    
    },

    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false 
    }

})


module.exports = Groupmember;