var Interface = function (object, name, methods, constants) {
    if(arguments.length < 3){
        throw new Error("Interface constructor called with "+arguments.length+" args, but expected 3 at least.");
    }

    this.name = name;
    this.methods = [];

    if(! object instanceof Function){
        throw new Error("Interface constructor expected methods argument to be a Function");
    }

    if(! methods instanceof Array){
        throw new Error("Interface constructor expected methods argument to be an Array");
    }

    for(var i=0, len = methods.length; i < len; i++){
        if(typeof methods[i] !== 'string'){
            throw new Error("Interface constructor expected methods names to be passed in as a string.")
        }

        this.methods.push(methods[i]);
    }

    object._ensureImplements = function (object){
        for(var i=0, len = methods.length; i < len; i++){
            var method = methods[i];
            if(!object[method] || typeof object[method] !== 'function'){
                throw new Error("Object does not implement the "+name+" interface. Method "+method
                    +" was not found.");
            }
        }
    };

    if(!constants)
        return;

    if(! constants instanceof Object){
        throw new Error("Interface constructor expected constants argument to be a Object");
    }

    for(var i in constants ){
        object[i] = constants[i];
    }

};


module.exports = Interface;