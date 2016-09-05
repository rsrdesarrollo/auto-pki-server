var express = require('express');

var csr_route = require('./csrs');
var user_route = require('./users');
var group_route = require('./groups');
var auth_route = require('./auth');
var client_route = require('./clients')


var router = express.Router();

router.use('/csrs', csr_route);
router.use('/users', user_route);
router.use('/groups', group_route);
router.use('/auth', auth_route);
router.use('/clients', client_route);


module.exports = router;