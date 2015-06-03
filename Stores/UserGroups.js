/**
 * Created by mschwartz on 6/1/15.
 */

/*global require, module, sync */

var Schema = require('decaf-mysql').Schema;

var cache = {};

module.exports = {
    list: function(example) {
        return Schema.list('UserGroups', example, Schema.clean);
    },
    find: function(example) {
        return Schema.find('UserGroups', example);
    },
    findOne: function(example) {
        return Schema.findOne('UserGroups', example);
    },
    putOne: function(example) {
        return Schema.putOne('UserGroups', example);
    },
    remove: function(example) {
        return Schema.remove('UserGroups', example);
    },
    decorate: function(record) {
        return record;
    },
    getById: function(userGroupId) {
        return this.decorate(this.findOne({ userGroupId: userGroupId }));
    }
};
