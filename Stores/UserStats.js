/**
 * Created by mschwartz on 6/1/15.
 */

/*global require, module, sync */

var Schema = require('decaf-mysql').Schema;

module.exports = {
    list              : function (example) {
        return Schema.list('UserStats', example, Schema.clean);
    },
    find              : function (example) {
        return Schema.find('UserStats', example);
    },
    findOne           : function (example) {
        return Schema.findOne('UserStats', example);
    },
    putOne            : function (example) {
        return Schema.putOne('UserStats', example);
    },
    remove            : function (example) {
        return Schema.remove('UserStats', example);
    },
    decorate          : function (record) {
        return record;
    },
    getById           : function (userId) {
        return this.decorate(this.findOne({ userId : userId }));
    },
    incrementPosts    : function (userId) {
        SQL.update('UPDATE UserStats SET posts=post+1 WHERE userId=' + SQL.quote(userId));
    },
    incrementComments : function (userId) {
        SQL.update('UPDATE UserStats SET comments=comments+1 WHERE userId=' + SQL.quote(userId));
    },
    incrementLikes    : function (userId) {
        SQL.update('UPDATE UserStats SET likes=likes+1 WHERE userId=' + SQL.quote(userId));
    }
};
