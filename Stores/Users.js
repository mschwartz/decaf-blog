/**
 * Created by mschwartz on 6/1/15.
 */

/*global require, module, sync */

var Schema     = require('decaf-mysql').Schema,
    UserGroups = require('Stores/UserGroups');

module.exports = {
    list     : function (example) {
        return Schema.list('Users', example, Schema.clean);
    },
    find     : function (example) {
        return Schema.find('Users', example);
    },
    findOne  : function (example) {
        return Schema.findOne('Users', example);
    },
    putOne   : function (example) {
        return Schema.putOne('Users', example);
    },
    remove   : function (example) {
        return Schema.remove('Users', example);
    },
    decorate : function (record) {
        record.userGroup = UserGroups.getById(record.userGroupId);
        return record;
    },
    getById  : function (userId) {
        return this.decorate(this.findOne({ userId : userId }));
    }
};
