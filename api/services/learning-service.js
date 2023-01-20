const WordModel = require('../models/word-model');
const WordDto = require('../dtos/word-dto');
const ChatModel = require('../models/chat-model');
const ApiError = require('../exceptions/api-error');
const TelegramBot = require('node-telegram-bot-api');
const { shuffleArray } = require('../utils');

const bot = new TelegramBot(process.env.TOKEN, {polling: true});

class LearningService {
    async startInterval(chatId, words) {
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
				console.log(numbersList);

				const currentId = numbersList.pop();
				numbersList.unshift(currentId);

				const wordObj = words[currentId];

				await bot.sendMessage(chatId, wordObj.value);
			}, 3000);

			setTimeout(() => {
				clearInterval(intervalId);
			}, 60000);
    }
}

module.exports = new LearningService();