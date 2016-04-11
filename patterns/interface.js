var Interface = function (name, methods) {
    if(arguments.length != 2){
        throw new Error("Interface constructor called with "+arguments.length+" args, but expected exactly 2.");
    }

    this.name = name;
    this.methods = [];

    if(! methods instanceof Array){
        throw new Error("Interface constructor expected methods argument to be an Array");
    }

    for(var i=0, len = methods.length; i < len; i++){
        if(typeof methods[i] !== 'string'){
            throw new Error("Interface constructor expected methods names to be passed in as a string.")
        }

        this.methods.push(methods[i]);
    }
};

Interface.prototype.ensureImplements = function (object){
    for(var i=0, len = this.methods.length; i < len; i++){
        var method = this.methods[i];
        if(!object[method] || typeof object[method] !== 'function'){
            throw new Error("Object does not implement the "+this.name+" interface. Method "+method
                +" was not found.");
        }
    }
};

module.exports = Interface;