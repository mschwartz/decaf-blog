/**
 * Created by mschwartz on 6/1/15.
 */

/*global require, module, sync */

var Schema     = require('decaf-mysql').Schema;

module.exports = {
    list     : function (example, fn) {
        return Schema.list('BlogPosts', example, function(record) {
            if (fn) {
                fn(record);
            }
        });
    },
    find     : function (example) {
        return Schema.find('BlogPosts', example);
    },
    findOne  : function (example) {
        return Schema.findOne('BlogPosts', example);
    },
    putOne   : function (example) {
        return Schema.putOne('BlogPosts', example);
    },
    remove   : function (example) {
        return Schema.remove('BlogPosts', example);
    },
    decorate : function (record) {
        return record;
    },
    getById  : function (userId) {
        return this.decorate(this.findOne({ userId : userId }));
    }
};
