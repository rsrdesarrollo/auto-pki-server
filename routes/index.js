var express = require('express');
var conf = require('../conf');
var UnconfigureServiceError = require('../errors/UnconfiguredServiceError');

var router = express.Router();

function is_service_configured(){
    try{
        conf.get_conf();
    } catch (ex){
        if(ex instanceof UnconfigureServiceError){
            return false;
        }
    }
    return true;
}

/* GET home page. */
router.post('/', function(req, res, next) {
    var config = conf.get_conf();

    res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/start-config', function(req, res, next) {
    if(is_service_configured())
        return res.redirect("/");

    // TODO: Start Configuration

    res.render('index', { title: 'Express' });
});


module.exports = router;
