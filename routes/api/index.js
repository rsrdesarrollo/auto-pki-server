var express = require('express');

var csr_route = require('./csr');
var auth_route = require('./auth');

var router = express.Router();

router.use('/csr', csr_route);
router.use('/auth', auth_route);

module.exports = router;