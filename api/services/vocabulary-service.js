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

			const candidate = await WordModel.findOne({where: {value: word, userId: chat.userId}});
			if(candidate){
				// update word
			}
			
			const wordModel = await WordModel.create({value: word, meaning, userId: chat.userId});
			const wordDto = new WordDto(wordModel);

			return {
				word: wordDto
			}
    }

		async getList(chatId, limit = 10) {
			chatId = chatId.toString();
			
			const chat = await ChatModel.findOne({where: {chatId}});
			if(!chat){
				throw ApiError.BadRequest('Chat ID is not correct');
			}

			const words = await WordModel.findAll({where: {userId: chat.userId}, limit});

			const list = words.map((word) => {
				return new WordDto(word);
			});

			return list;
		}
}

module.exports = new VocabularyService();