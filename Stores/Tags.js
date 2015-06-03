/**
 * Created by mschwartz on 6/1/15.
 */

/*global require, module, sync */

var Schema = require('decaf-mysql').Schema;

module.exports = {
    list     : function (example) {
        return Schema.list('Tags', example, Schema.clean);
    },
    find     : function (example) {
        return Schema.find('Tags', example);
    },
    findOne  : function (example) {
        return Schema.findOne('Tags', example);
    },
    putOne   : function (example) {
        var tag = this.findOne({ name : example.name });
        if (tag) {
            return tag.tagId ? tag : Schema.putOne('Tags', example);
        }
    },
    remove   : function (example) {
        return Schema.remove('Tags', example);
    },
    decorate : function (record) {
        return record;
    },
    //
    getById  : function (userId) {
        return this.decorate(this.findOne({ userId : userId }));
    }
};
