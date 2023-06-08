const express = require('express');
const router = express.Router();
//this file contain all versions of routes v1,v2 .....
router.use('/v1',require('./v1'))
module.exports = router