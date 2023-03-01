const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController')
const postController = require('../controllers/postControler')

router.get('/profile',UserController.profile)
router.get('/post', postController.post)

module.exports = router;