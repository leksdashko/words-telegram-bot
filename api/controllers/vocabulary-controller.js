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
}

module.exports = new VocabularyController();