const express = require('express');
const protect = require('../middlewares/authMiddleware');
const {signUpUser, loginUser } = require('../controllers/authControllers');

const router = express.Router()

router.post('/signup',signUpUser)
router.post('/login',loginUser)


module.exports = router