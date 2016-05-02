const Interface = require('../patterns/interface');

function RAController(objectClass) {
    Interface.call(this, objectClass, 'RAController', [
        'get_registered_csr',
        'is_already_signed',
        'register_csr',
        'approve_csr',
        'delete_csr'
    ]);
}

module.exports = RAController;