/*
 module imports
 */
const express = require('express');

const debug = require('debug')('test_cert');
const policy = require('../policies/policy');


const router = express.Router();

/*
 Aux Functions
 */
function response_forbidden(res, err, msg) {
    if (err) {
        debug(err);
    }

    res.status(403);
    res.send("<h1>"+msg+"</h1>");
}

router.get('/',
    policy.authenticate('client-cert', { session: false }),
    function (req, res) {
        delete req.user.cert.raw;
        res.send("<h1>Welcome</h1><h3>Certificate information:</h3><pre><code>"+JSON.stringify(req.user.cert,null, "  ")+"</code></pre>");
    }
);


module.exports = router;
