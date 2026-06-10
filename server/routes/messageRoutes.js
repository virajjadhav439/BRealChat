const express = require('express');
const protect = require('../middlewares/authMiddleware');
const { sendMessage, getMessage } = require('../controllers/messageControllers');

const router = express.Router()

router.post('/',protect,sendMessage)
router.get('/:conversationId',protect,getMessage)

module.exports = router