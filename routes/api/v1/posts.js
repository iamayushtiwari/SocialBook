const express = require('express');
const router = express.Router();
const postApi = require('../../../controllers/api/v1/post_API')

router.get('/posts',postApi.index)
router.delete('/:id',postApi.destroy)

module.exports = router