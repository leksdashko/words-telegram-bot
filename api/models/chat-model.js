const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const ChatModel = sequelize.define('chat', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		chatId: {type: DataTypes.STRING, unique: true},
		intervalTime: {type: DataTypes.INTEGER},
		timeoutTime: {type: DataTypes.INTEGER}
});

module.exports = ChatModel;