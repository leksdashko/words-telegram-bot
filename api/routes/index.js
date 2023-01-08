const Router = require('express');
const router = new Router();
const chatRouter = require('./chat-router');

router.use('/chats', chatRouter);

module.exports = router;