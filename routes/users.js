const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController')
const postController = require('../controllers/postControler')

router.get('/profile',UserController.profile)
router.get('/post', postController.post)
router.get('/signin',UserController.signin)
router.get('/signup',UserController.signup)
router.get('/logout',UserController.signout)

router.post('/create',UserController.create)
router.post('/create-session',UserController.createSession)

module.exports = router;