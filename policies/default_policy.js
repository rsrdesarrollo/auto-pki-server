const Policy = require('./policy');
const debug = require('debug')('policies:defaul_policy');

var DefaultPolicy = function () {  // implements Policy
    Policy.call(this,DefaultPolicy);
    DefaultPolicy._ensureImplements(this);
};

DefaultPolicy.prototype.is_allowed = function (opType, req){

    switch (opType){
        case DefaultPolicy.opType.CACERT:
            break;
        case DefaultPolicy.opType.ENROLL:
            break;
        case DefaultPolicy.opType.REENROLL:
            break;
    }
};

DefaultPolicy.prototype.compile = function(policy_conf){

};

DefaultPolicy.prototype._cacert_policy = function () {

};

DefaultPolicy.prototype._enrollment_policy = function(){

};

DefaultPolicy.prototype._reenrollment_policy = function(){

};