const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Group = new Schema({
    groupname: String
});

Group.options.toJSON = {
    transform: function (doc, resource, options) {
        var ret = {};

        ret.id = resource._id;
        ret.type = "groups";

        delete resource._id;
        delete resource.__v;

        ret.attributes = resource;

        return ret;
    }
};

Group.index({groupname: 1}, { unique: true });

module.exports = mongoose.model('Group', Group);