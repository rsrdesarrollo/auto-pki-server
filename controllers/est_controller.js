const Interface = require('../patterns/interface');

function EstController(objectClass){
    Interface.call(this, objectClass,'EstController', [
        'get_ca_certificate',
        'simple_enroll',
        'simple_reenroll'
    ],{
        OK: 0,
        WAIT_RES: 1
    });
};

module.exports = EstController;