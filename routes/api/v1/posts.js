const express = require('express');
const router = express.Router();
const passport  = require('passport');
require('../../../config/passport-jwt-strategy')
const postApi = require('../../../controllers/api/v1/post_API')

router.get('/posts',postApi.index)
// To prevent Session cookies to be gentrated {session:false}, this below line put an authentication check by passport
router.delete('/:id',passport.authenticate('jwt',{session:false}), postApi.destroy)

module.exports = router