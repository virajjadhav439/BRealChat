const express = require('express');

const protect = require('../middlewares/authMiddleware');
const { createConversation, getConversation } = require('../controllers/conversationControllers');

const router = express.Router()

router.post('/',protect,createConversation)

router.get('/',protect,getConversation)

module.exports = router