const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController')
const postController = require('../controllers/postControler')
const passport = require('passport')

router.get('/profile',passport.checkAuthentication,UserController.profile)
router.get('/post', postController.post)
router.get('/signin',UserController.signin)
router.get('/signup',UserController.signup)
router.get('/signout',UserController.destroySession)


router.post('/create',UserController.create)
router.post('/create-session',passport.authenticate('local', { failureRedirect: '/users/signin'}),
UserController.createSession)

module.exports = router;