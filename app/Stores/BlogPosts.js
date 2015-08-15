/**
 * Created by mschwartz on 6/1/15.
 */

/*global require, module, sync */

var Schema       = require('decaf-mysql').Schema;

module.exports = {
    list     : function (example, fn) {
        return Schema.list('BlogPosts', example, function (record) {
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
        var post = Schema.putOne('BlogPosts', example);
        Schema.remove('BlogPostTags', {
            blogPostId : post.blogPostId
        });
        decaf.each(example.tags || [], function (tag) {
            var existing = Schema.findOne('Tags', { tagName : tag.name });
            if (!existing.tagId) {
                existing = Schema.putOne('Tags', { tagName : tag.name });
            }
            Schema.putOne('BlogPostTags', { tagId : existing.tagId, blogPostId : post.blogPostId });
        });
        return post;
    },
    remove   : function (example) {
        return Schema.remove('BlogPosts', example);
    },
    decorate : function (record) {
        var tags = [];
        decaf.each(SQL.getDataRows('SELECT * FROM BlogPostTags,Tags WHERE Tags.tagId=BlogPostTags.tagId AND BlogPostTags.blogPostId=' + SQL.quote(record.blogPostId)), function(tag) {
            console.dir(tag);
            tags.push({ name: tag.tagName, last: false });
        });
        if (tags.length) {
            tags[tags.length-1 ].last = true;
        }
        record.tags = tags;

        var user = Schema.findOne('Users', { userId: record.creator });
        record.creatorInfo = { userId: user.userId, displayName: user.displayName };
        user = Schema.findOne('Users', { userId: record.editor });
        record.editorInfo = { userId: user.userId, displayName: user.displayName };

        record.comments = Schema.list('Comments', { blogPostId: record.blogPostId });

        return record;
    },
    getById  : function (blogPostId) {
        return this.decorate(this.findOne({ blogPostId : blogPostId }));
    },
    getBySEO : function (seo) {
        return this.decorate(this.findOne({ seo : seo }));
    }
};
