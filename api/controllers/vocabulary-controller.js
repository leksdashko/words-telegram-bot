const vocabularyService = require('../services/vocabulary-service');

class VocabularyController {
    async add(req, res, next) {
			try {
				const {chatId, word, meaning} = req.body;
				const wordData = await vocabularyService.add(chatId, word, meaning);
				return res.json(wordData);
			} catch (e) {
					next(e);
			}
    }

		async getList(req, res, next) {
			try {
				console.log(req.query);
				const {chatId, limit} = req.query;
				const list = await vocabularyService.getList(chatId, limit);
				return res.json(list);
			} catch (e) {
					next(e);
			}
    }
}

module.exports = new VocabularyController();