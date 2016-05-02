const Interface = require('../patterns/interface');

function CAController(objectClass){
    Interface.call(this, objectClass,'CAController', [
        'get_ca_certificate',
        'sign_csr'
    ]);
};

module.exports = CAController;