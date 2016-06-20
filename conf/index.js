var fs = require('fs');
var path = require('path');

var UnconfigureServiceError = require('../errors/UnconfiguredServiceError');

var conf = null;

function read_conf_file(){
    return JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));
}

module.exports = {
    get_conf: function () {
        if (!conf) {
            try {
                conf = read_conf_file();
            } catch (ex) {
                throw new UnconfigureServiceError('Service unconfigured');
            }
        }
        return conf;
    },
    reload_conf: function () {
        try {
            var newconf = read_conf_file();
            conf = newconf;
        } catch (ex) {}
    }
}