var express = require('express');
var router = express.Router();
var conf = require('../conf');


/* GET home page. */
router.get('/', function(req, res, next) {
  var config = conf.get_conf();

  res.render('index', { title: 'Express' });
});

module.exports = router;
