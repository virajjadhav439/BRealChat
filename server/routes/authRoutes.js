const express = require('express');
const protect = require('../middlewares/authMiddleware');
const {signUpUser, loginUser, googleLogin } = require('../controllers/authControllers');

const router = express.Router()

router.post('/signup',signUpUser)
router.post('/login',loginUser)

router.post('/google',googleLogin)

module.exports = router