const Interface = require('../patterns/interface');

function Policy(objectClass){
    Interface.call(this, objectClass,'Policy', [
        'is_allowed',
        'compile'
    ],{
        status: {
            OK: 0,
            FORBIDDEN: 1,
            AUTHZ_NEEDED: 2,
            ADMIN_NEEDED: 3
        },
        opType: {
            CACERT: 20,
            ENROLL: 21,
            REENROLL: 22
        }
    });
}

module.exports = Policy;