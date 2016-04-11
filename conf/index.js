var fs = require('fs');
var path = require('path');

var UnconfigureServiceError = require('../errors/UnconfiguredServiceError');

var conf = null;

module.exports.get_conf = function(){
    if (!conf) {
        try {
            conf = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.jsona')));
        } catch (ex) {
            throw new UnconfigureServiceError('Service unconfigured');
        }
    }
    return conf;
};