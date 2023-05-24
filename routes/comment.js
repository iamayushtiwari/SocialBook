const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController')
const passport = require('passport');

router.post('/create',passport.checkAuthentication,commentController.createComment)
//router.get('/comments', commentController.Comment)

module.exports = router;