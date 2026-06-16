const express = require('express');
const protect = require('../middlewares/authMiddleware');
const { sendMessage, getMessage, markMessageAsSeen } = require('../controllers/messageControllers');

const router = express.Router()

router.post('/',protect,sendMessage)
router.get('/:conversationId',protect,getMessage)

router.put('/seen/:conversationId',protect,markMessageAsSeen)

module.exports = router