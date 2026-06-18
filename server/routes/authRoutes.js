const express = require('express');
const protect = require('../middlewares/authMiddleware');
const {signUpUser, loginUser, googleLogin, updatePublicKey } = require('../controllers/authControllers');

const router = express.Router()

router.post('/signup',signUpUser)
router.post('/login',loginUser)

router.post('/google',googleLogin)

router.put('/public-key',updatePublicKey)

module.exports = router