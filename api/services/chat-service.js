const ChatModel = require('../models/chat-model');
const ChatDto = require('../dtos/chat-dto');

class ChatService {
    async create(chatId, user) {
			chatId = chatId.toString();
			
			const candidate = await ChatModel.findOne({where: {chatId}});
			if(candidate){
				const chatDto = new ChatDto(candidate);

				return {
					chat: chatDto
				}
			}
			
			const chat = await ChatModel.create({chatId, userId: user.id});
			const chatDto = new ChatDto(chat);

			return {
				chat: chatDto
			}
    }

		async update(chatId, intervalTime, timeoutTime) {
			const chat = await ChatModel.findOne({where: {chatId}});
			if(!chat){
				throw ApiError.BadRequest('Chat ID is not correct');
			}

			chat.intervalTime = intervalTime;
			chat.timeoutTime = timeoutTime;
      await user.save();
		}
}

module.exports = new ChatService();