var util = require('util');

function UnconfiguredServiceError (msg){
    Error.call(this);
    this.message = msg;
}

util.inherits(UnconfiguredServiceError, Error);

module.exports = UnconfiguredServiceError;