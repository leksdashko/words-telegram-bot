const chatService = require('../services/chat-service');

class ChatController {
    async update(req, res, next) {
        try {
					const chatId = req.params.id;
					const {intervalTime, timeoutTime} = req.body;
					const chatData = await chatService.update(chatId, intervalTime, timeoutTime);
					return res.json(chatData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ChatController();