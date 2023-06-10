const express = require('express');
const router = express.Router();
const postApi = require('../../../controllers/api/v1/post_API')

router.use('/posts',require('./posts'))
router.use('/user',require('./users'))

module.exports = router