/**
 * Created by mschwartz on 6/1/15.
 */

/*global require, module, sync */

var Schema     = require('decaf-mysql').Schema;

module.exports = {
    list     : function (example) {
        return Schema.list('Comments', example, Schema.clean);
    },
    find     : function (example) {
        return Schema.find('Comments', example);
    },
    findOne  : function (example) {
        return Schema.findOne('Comments', example);
    },
    putOne   : function (example) {
        return Schema.putOne('Comments', example);
    },
    remove   : function (example) {
        return Schema.remove('Comments', example);
    },
    decorate : function (record) {
        return record;
    },
    getById  : function (userId) {
        return this.decorate(this.findOne({ userId : userId }));
    }
};
