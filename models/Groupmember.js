const DataTypes = require('sequelize');
const sequelize = require('../utils/database');


const Groupmember = sequelize.define('groupmembers', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,    
    }

})


module.exports = Groupmember;