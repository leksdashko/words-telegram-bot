const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const UserModel = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		username: {type: DataTypes.STRING, unique: true}
});

module.exports = UserModel;