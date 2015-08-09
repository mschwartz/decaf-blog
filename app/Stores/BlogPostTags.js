/**
 * Created by mschwartz on 6/1/15.
 */

/*global require, module, sync */

var Schema     = require('decaf-mysql').Schema;

module.exports = {
    list     : function (example) {
        return Schema.list('BlogPostTags', example, Schema.clean);
    },
    find     : function (example) {
        return Schema.find('BlogPostTags', example);
    },
    findOne  : function (example) {
        return Schema.findOne('BlogPostTags', example);
    },
    putOne   : function (example) {
        return Schema.putOne('BlogPostTags', example);
    },
    remove   : function (example) {
        return Schema.remove('BlogPostTags', example);
    }
};
