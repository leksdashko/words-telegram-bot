require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const webAppUrl = `${process.env.CLIENT_BOT_BASE_URL}/form`;

const bot = new TelegramBot(process.env.TOKEN, {polling: true});
const app = express();

app.use(express.json());
app.use(cors());

bot.on('message', async (msg) => {
	const text = msg.text;
	const chatId = msg.chat.id;

	console.log(text);

	if(text === '/start') {
		await bot.sendMessage(chatId, 'Please set configuration to start learning new words', {
			reply_markup: {
				keyboard: [
					[{text: 'Settings', web_app: {url: webAppUrl}}]
				]
			}
		})
	}

	if(msg?.web_app_data?.data) {
		try{
			const data = JSON.parse(msg.web_app_data.data);

			await bot.sendMessage(chatId, 'Thank you for your connection!');
			await bot.sendMessage(chatId, 'Your country: ' + data?.country);
			await bot.sendMessage(chatId, 'Your street: ' + data?.street);

			setTimeout(async () => {
				await bot.sendMessage(chatId, 'Whole information you will receive in this chat');
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

const PORT = process.env.PORT;
app.listen(PORT, () => console.log('Server started on PORT = ' + PORT));