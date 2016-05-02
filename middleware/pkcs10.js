const forge = require('node-forge');
const is = require('type-is');
const content_type = require('content-type');

var debug = require('debug')('middleware:pkcs10');

function get_charset(req){
    try {
        return content_type.parse(req).parameters.charset.toLowerCase()
    } catch (e) {
        return undefined
    }
}

function pkcs10_request_parser(req, res, next){
    if(req.method !== "POST"){
        return debug('skip not POST'), next()
    }

    if(!is(req,"application/pkcs10")){
        return debug('skip wrong content type'), next()
    }

    if(req._body){
        return debug('body already parsed'), next();
    }

    // skip requests without bodies
    if (!is.hasBody(req)) {
        return debug('skip empty body'), next()
    }

    var charset = get_charset(req) || 'utf-8';

    var rawBody = '';
    req.setEncoding(charset);

    req.on('data', function(chunk) {
        rawBody += chunk;
    });

    req.on('end', function() {
        // flag as parsed
        req._body = true
        req.csr = forge.pki.certificationRequestFromPem(rawBody);
        req.csrRaw = rawBody;

        next();
    });
}

module.exports = pkcs10_request_parser;