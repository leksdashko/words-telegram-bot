const UserModel = require('./user-model');
const WordModel = require('./word-model');
const ChatModel = require('./chat-model');

UserModel.hasOne(ChatModel);
ChatModel.belongsTo(UserModel);

UserModel.hasMany(WordModel);
WordModel.belongsTo(UserModel);

module.exports = {
    UserModel,
    WordModel,
		ChatModel
}