/**
 * Created by mschwartz on 6/1/15.
 */

/*global require, global:true, exports */

const CATEGORIES = false;

var Config     = require('Config'),
    MySQL      = require('decaf-mysql').MySQL,
    Schema     = require('decaf-mysql').Schema,
    md5        = require('support').md5,
    BCrypt     = require('support').BCrypt,
    UserGroups = require('Stores/UserGroups'),
    Users      = require('Stores/Users');

if (CATEGORIES) {
    var Categories = require('Stores/Categories');
}

// sql singleton will be available to all the http child threads
global.SQL = new MySQL(Config.mysql);

Schema.add({
    name       : 'UserGroups',
    primaryKey : 'userGroupId',
    fields     : [
        { name : 'userGroupId', type : 'int', autoIncrement : true },
        { name : 'userGroupName', type : 'varchar', size : 64 },
        { name : 'prefix', type : 'varchar', size : 64 },
        { name : 'suffix', type : 'varchar', size : 64 }
    ],
    indexes    : [
        'userGroupName'
    ],
    onCreate   : function () {
        Schema.putOne('UserGroups', {
            userGroupName : 'Administrators',
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
    name       : 'UserStats',
    primaryKey : 'userId',
    fields     : [
        { name : 'userId', type : 'int' },
        { name : 'posts', type : 'int' },
        { name : 'comments', type : 'int' },
        { name : 'likes', type : 'int' }
    ],
    indexes    : [
        'posts',
        'comments',
        'likes'
    ]
});

Schema.add({
    name       : 'UserPreferences',
    primaryKey : 'userId',
    fields     : [
        { name : 'userId', type : 'int' },
        { name : 'preferences', type : 'text' }
    ]
});

Schema.add({
    name       : 'Users',
    primaryKey : 'userId',
    fields     : [
        { name : 'userId', type : 'int', autoIncrement : true },
        { name : 'displayName', type : 'varchar', size : 128 },
        { name : 'userGroupId', type : 'int' },
        { name : 'email', type : 'varchar', size : 128 },
        { name : 'password', type : 'varchar', size : 60, serverOnly : true },
        { name : 'creator', type : 'int' },
        { name : 'created', type : 'int' },
        { name : 'editor', type : 'int' },
        { name : 'edited', type : 'int' },
        { name : 'lastLogin', type : 'int' },
        { name : 'lastAccess', type : 'int' }
    ],
    indexes    : [
        'email'
    ],
    onCreate   : function () {
        console.log('Add Admin user');
        SQL.startTransaction();
        try {
            var now   = decaf.timestamp(),
                admin = Users.putOne({
                    displayName : 'Administrator',
                    userGroupId : Schema.findOne('UserGroups', { userGroupName : 'Administrators' }).userGroupId,
                    email       : Config.adminEmail,
                    password    : BCrypt.hashpw(md5('admin')),
                    created     : now,
                    edited      : now
                });

            admin.creator = admin.editor = admin.userId;
            Users.putOne(admin);
            Schema.putOne('UserPreferences', { userId: admin.userId });
            Schema.putOne('UserStats', { userId: admin.userId });
            SQL.commit();
        }
        catch (e) {
            console.dir(e);
            SQL.rollback();
            throw e;
        }
    }
});


if (CATEGORIES) {

    Schema.add({
        name       : 'Categories',
        primaryKey : 'categoryId',
        fields     : [
            { name : 'categoryId', type : 'int', autoIncrement : true },
            { name : 'parentId', type : 'int' },
            { name : 'name', type : 'varchar', size : 64 },
            { name : 'creator', type : 'int' },
            { name : 'created', type : 'int' },
            { name : 'editor', type : 'int' },
            { name : 'edited', type : 'int' }
        ],
        indexes    : [
            'parentId',
            'name',
            'created',
            'edited'
        ],
        onCreate   : function () {
            var admin = Users.findOne({ username : 'admin' }),
                now   = decaf.timestamp();

            Categories.putOne({
                name     : 'Default',
                parentId : 0,
                creator  : admin.userId,
                created  : now,
                editor   : admin.userId,
                edited   : now
            });
        }
    });
}
else {
    SQL.update('DROP TABLE IF EXISTS Categories');
}

Schema.add({
    name       : 'Tags',
    primaryKey : 'tagId',
    fields     : [
        { name : 'tagId', type : 'int', autoIncrement : true },
        { name : 'tagName', type : 'varchar', size : 64 }
    ],
    indexes    : [
        'tagName'
    ]
});

Schema.add({
    name       : 'BlogPosts',
    primaryKey : 'blogPostId',
    fields     : [
        { name : 'blogPostId', type : 'int', autoIncrement : true },
        { name : 'seo', type : 'varchar', size : 64 },
        { name : 'published', type : 'tinyint' },
        { name : 'open', type : 'tinyint' },    // 0 if closed for comments
        { name : 'title', type : 'varchar', size : 128 },
        { name : 'subtitle', type : 'varchar', size : 128 },
        { name : 'contentFormat', type : 'varchar', size : 32 },    // markdown, html, etc.
        { name : 'content', type : 'text' },
        { name : 'commentCount', type : 'int' },
        { name : 'creator', type : 'int' },
        { name : 'created', type : 'int' },
        { name : 'editor', type : 'int' },
        { name : 'edited', type : 'int' }
    ],
    indexes    : [
        'creator',
        'created',
        'seo'
    ]
});

Schema.add({
    name    : 'BlogPostTags',
    fields  : [
        { name : 'tagId', type : 'int' },
        { name : 'blogPostId', type : 'int' }
    ],
    indexes : [
        'tagId',
        'blogPostId'
    ]
});

Schema.add({
    name       : 'Comments',
    primaryKey : 'commentId',
    fields     : [
        { name : 'commentId', type : 'int', autoIncrement : true },
        { name : 'blogPostId', type : 'int' },
        { name : 'replyToId', type : 'int' },
        { mame : 'approved', type : 'tinyint' },
        { name : 'content', type : 'text' },
        { name : 'replyCount', type : 'int' },
        { name : 'creator', type : 'int' },
        { name : 'created', type : 'int' },
        { name : 'editor', type : 'int' },
        { name : 'edited', type : 'int' }
    ],
    indexes    : [
        'blogPostId',
        'replyToId',
        'creator'
    ]
});

decaf.extend(exports, {
    Schema : Schema
});
