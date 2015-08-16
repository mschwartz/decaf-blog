/**
 * Created by mschwartz on 6/1/15.
 */

/*global require, module, sync */

var Schema     = require('decaf-mysql').Schema,
    UserGroups = require('Stores/UserGroups');

module.exports = {
    clean            : function (example) {
        return Schema.clean('Users', example);
    },
    count            : function (example) {
        return Schema.count('Users', example);
    },
    list             : function (example) {
        return Schema.list('Users', example, this.clean);
    },
    find             : function (example) {
        console.log('findOne');
        console.dir(example);
        return Schema.find('Users', example);
    },
    findOne          : function (example) {
        return Schema.findOne('Users', example);
    },
    putOne           : function (example) {
        return Schema.putOne('Users', example);
    },
    remove           : function (example) {
        return Schema.remove('Users', example);
    },
    decorate         : function (record) {
        record.userGroupInfo = UserGroups.getById(record.userGroupId);
        record.creatorInfo = this.clean(this.findOne({ userId : record.creator }));
        record.editorInfo = this.clean(this.findOne({ userId : record.editor }));
        return record;
    },
    getById          : function (userId) {
        return this.decorate(this.findOne({ userId : userId }));
    },
    updateLastAccess : function (userId, time) {
        if (!userId) {
            throw new Error('updateLastAccess: no userId');
        }
        if (!decaf.isDefined(time)) {
            time = decaf.timestamp();
        }
        return SQL.update('UPDATE Users SET lastAccess=' + SQL.quote(time) + ' WHERE userId=' + SQL.quote(userId));
    }
};
