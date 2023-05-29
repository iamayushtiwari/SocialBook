const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController')
const passport = require('passport')

router.get('/profile/:id',passport.checkAuthentication,UserController.profile)
router.get('/signin',UserController.signin)
router.get('/signup',UserController.signup)
router.get('/signout',UserController.destroySession)


router.post('/create',UserController.create)
router.post('/update/:id',passport.checkAuthentication,UserController.update)
router.post('/create-session',passport.authenticate('local', { failureRedirect: '/users/signin'}),
UserController.createSession)

module.exports = router;