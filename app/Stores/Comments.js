/**
 * Created by mschwartz on 6/1/15.
 */

/*global require, module, sync */

var Schema = require('decaf-mysql').Schema,
    Users  = require('Stores/Users');

module.exports = {
    list     : function (example) {
        debugger;
        return Schema.list('Comments', example, function (record) {
            var user = Users.getById(record.creator);
            record.creatorInfo = { userId: user.userId, displayName: user.displayName };
            user = Users.getById(record.editor);
            record.editorInfo = { userId: user.userId, displayName: user.displayName };
            record.content = record.content.replace(/</g, '&lt;');
            record.content = record.content.replace(/\n/g, '<br/>');
            record = Schema.clean('Comments', record);
            return record;
        });
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
