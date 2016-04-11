const Interface = require('../patterns/interface');

module.exports = new Interface('EstController', [
    'get_ca_certificate',
    'simple_enroll',
    'simple_reenroll'
]);
