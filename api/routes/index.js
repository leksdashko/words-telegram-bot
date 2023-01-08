const Router = require('express');
const router = new Router();
const chatRouter = require('./chat-router');
const vocabularyRouter = require('./vocabulary-router');

router.use('/chats', chatRouter);
router.use('/vocabulary', vocabularyRouter);

module.exports = router;