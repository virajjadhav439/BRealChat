const express = require('express');
const protect = require('../middlewares/authMiddleware');
const { getAllUsers, searchUsers } = require('../controllers/userControllers');
const router = express.Router()

router.get('/',protect,getAllUsers)
router.get('/search',protect,searchUsers)

module.exports = router