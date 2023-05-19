const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts_Controler')

router.post('/createPost',postController.createPost)
router.get('/posts', postController.post)

module.exports = router;