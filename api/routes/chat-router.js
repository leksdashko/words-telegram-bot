const Router = require('express');
const router = new Router();
const chatController = require('../controllers/chat-controller');

router.post('/:id', chatController.update);

module.exports = router;