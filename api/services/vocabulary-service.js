const WordModel = require('../models/word-model');
const WordDto = require('../dtos/word-dto');
const ChatModel = require('../models/chat-model');

class VocabularyService {
    async add(chatId, word, meaning) {
			chatId = chatId.toString();
			
			const chat = await ChatModel.findOne({where: {chatId}});
			if(!chat){
				throw ApiError.BadRequest('Chat ID is not correct');
			}
			
			const wordModel = await WordModel.create({value: word, meaning, userId: chat.userId});
			const wordDto = new WordDto(wordModel);

			return {
				word: wordDto
			}
    }
}

module.exports = new VocabularyService();