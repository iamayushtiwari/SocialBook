const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController')



router.get('/',homeController.home)
router.use('/users',require('./users'))
router.use('/post',require('./post'))
router.use('/comments',require('./comment'))

module.exports = router;