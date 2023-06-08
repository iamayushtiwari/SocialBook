const express = require('express');
const router = express.Router();
const postApi = require('../../../controllers/api/v1/post_API')
const userApi = require('../../../controllers/api/v1/user_API')

router.get('/posts',postApi.index)
router.delete('/:id',postApi.destroy)
router.post('/user',userApi.createSession)

module.exports = router