const WordModel = require('../models/word-model');
const WordDto = require('../dtos/word-dto');
const ChatModel = require('../models/chat-model');
const ApiError = require('../exceptions/api-error');
const { shuffleArray, createArrayOfNumbers } = require('../utils');

class LearningService {
    async startInterval(bot, chatId, words) {
			const countWords = words.length;
			if(!countWords){
				throw ApiError.BadRequest('Add new words to your vocabulary');
			}
			chatId = chatId.toString();
			
			const chat = await ChatModel.findOne({where: {chatId}});
			if(!chat){
				throw ApiError.BadRequest('Chat ID is not correct');
			}

			const numbersList = shuffleArray(createArrayOfNumbers(countWords));

			const intervalId = setInterval(async () => {
				const currentId = numbersList.pop();

				if(numbersList.length < 1){
					const newNumbersList = shuffleArray(createArrayOfNumbers(countWords));
					numbersList.unshift(...newNumbersList);
				}

				const wordObj = words[currentId];

				await bot.sendMessage(chatId, wordObj.value + ' - ' + wordObj.meaning);
			}, 3000);

			setTimeout(() => {
				clearInterval(intervalId);
			}, 60000);
    }
}

module.exports = new LearningService();