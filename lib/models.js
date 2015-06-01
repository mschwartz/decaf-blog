/**
 * Created by mschwartz on 6/1/15.
 */

/*global require, global, exports */

var Config = require('Config'),
    MySQL  = require('decaf-mysql').MySQL,
    Schema = require('decaf-mysql').Schema;

// sql singleton will be available to all the http child threads
global.SQL = new MySQL({
    user     : 'mschwartz',
    password : '',
    database : 'blog'
});


Schema.add({
    name       : 'UserGroups',
    primaryKey : 'userGroupId',
    fields     : [
        { name : 'userGroupId', type : 'int', autoIncrement : true },
        { name : 'userGroupName', type : 'varchar', size : 64 },
        { name : 'prefix', type : 'varchar', size : 64 },
        { name : 'suffix', type : 'varchar', size : 64 }
    ],
    onCreate   : function () {
        Schema.putOne('UserGroups', {
            userGroupName : 'Administrator',
            prefix        : '',
            suffix        : ''
        });
        Schema.putOne('UserGroups', {
            userGroupName : 'Registered',
            prefix        : '',
            suffix        : ''
        });
    }
});

Schema.add({
    name       : 'Users',
    primaryKey : 'userId',
    fields     : [
        { name : 'userId', type : 'int', autoIncrement : true },
        { name : 'username', type : 'varchar', size : 64 },
        { name : 'displayName', type : 'varchar', size : 128 },
        { name : 'userGroupId', type : 'int' },
        { name : 'email', type : 'varchar', size : 128 },
        { name : 'password', type : 'varchar', size : 128 },
        { name : 'salt', type : 'varchar', size : 16 }
    ]
});

Schema.add({
    name       : 'BlogPosts',
    primaryKey : 'blogPostId',
    fields     : [
        { name : 'blogPostId', type : 'int', autoIncrement : true },
        { name : 'seoName', type : 'varchar', size : 64 },
        { name : 'published', type : 'tinyint' },
        { name : 'creator', type : 'int' },
        { name : 'created', type : 'int' },
        { name : 'editor', type : 'int' },
        { name : 'edited', type : 'int' }
    ],
    indexes    : [
        'creator',
        'created',
        'seoName'
    ]
});

decaf.extend(exports, {
    Schema : Schema
});
