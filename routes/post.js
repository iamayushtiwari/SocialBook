const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts_Controler')
const passport = require('passport');

router.post('/createPost',passport.checkAuthentication,postController.createPost)
router.get('/destroy/:id',passport.checkAuthentication, postController.destroy)

module.exports = router;