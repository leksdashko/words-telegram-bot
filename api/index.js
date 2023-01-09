require('dotenv').config();
require('./models');
const router = require('./routes');
const sequelize = require('./db');
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const userService = require('./services/user-service');
const chatService = require('./services/chat-service');

const webAppUrl = `${process.env.CLIENT_BOT_BASE_URL}/words/add`;

const bot = new TelegramBot(process.env.TOKEN, {polling: true});
const app = express();

app.use(express.json());
app.use(cors());
app.use('/', router);


const start = async () => {
	try{
			await sequelize.authenticate();
			await sequelize.sync();

			const PORT = process.env.PORT;
			app.listen(PORT, () => console.log('Server started on PORT = ' + PORT));
	} catch (e) {
			console.log(e);
	}
}

start();

bot.on('message', async (msg) => {
	const text = msg.text;
	const chatId = msg.chat.id;
	const username = msg?.from?.username.length > 0 ? msg.from.username : chatId;

	if(text === '/start') {
		const userData = await userService.registration(username);
		
		await chatService.create(chatId, userData.user);

		await bot.sendMessage(chatId, 'Please set configuration to start learning new words', {
			reply_markup: {
				keyboard: [
					[{text: 'Add new', web_app: {url: webAppUrl}}]
				]
			}
		})
	}

	if(msg?.web_app_data?.data) {
		try{
			const data = JSON.parse(msg.web_app_data.data);

			console.log(data?.tg);

			await bot.sendMessage(chatId, 'Thank you for your connection!');
			await bot.sendMessage(chatId, 'Your words: ' + JSON.stringify(data?.words));

			setTimeout(async () => {
				await bot.sendMessage(chatId, 'The next step is receiving messages from this bot, word by word');
			}, 3000);
		}catch(e){
			console.log(e);
		}
	}
});



app.post('/web-data', async (req, res) => {
	const {queryId, products, totalPrice} = req.body;

	console.log(req.body);

	try {
		await bot.answerWebAppQuery(queryId, {
			type: 'article',
			id: queryId,
			title: 'Order was sucessed',
			input_message_content: {message_text: 'Thank you! You bought items worth $' + totalPrice}
		});

		return res.status(200).json({});
	} catch (e) {
		await bot.answerWebAppQuery(queryId, {
			type: 'article',
			id: queryId,
			title: 'Something went wrong',
			input_message_content: {message_text: 'It was not possible to buy the product'}
		});

		return res.status(500).json({});
	}
});

