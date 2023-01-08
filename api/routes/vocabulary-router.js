const Router = require('express');
const router = new Router();
const vocabularyController = require('../controllers/vocabulary-controller');

router.post('/', vocabularyController.add);

module.exports = router;