/*global req, res, require */

var BlogPosts = require('Stores/BlogPosts'),
    Tags      = require('Stores/Tags');

var methods = {
    list : function () {
        res.send(200, BlogPosts.list({}, function (record) {
            record.url = '/view/' + record.seo;
        }));
    },
    save : function (params) {
        var post = params.post,
            now  = decaf.timestamp();

        if (!req.user || !req.user.userId) {
            res.send(403, {
                success : false,
                message : 'Not logged in'
            });
            return;
        }

        SQL.startTransaction();
        try {
            var existing = BlogPosts.findOne({ seo : post.seo });
            console.dir({ post: post, existing: existing })
            if (existing.blogPostId !== post.blogPostId) {
                SQL.rollback();
                res.send({
                    success : false,
                    message : 'SEO is already in use'
                });
                return;
            }
            if (!post.blogPostId) {
                post.creator = req.user.userId;
                post.created = now;
            }
            post.editor = req.user.userId;
            post.edited = now;
            //}
            post = BlogPosts.putOne(params.post);
            SQL.commit();
            res.send({
                success : true,
                post    : post
            });
        }
        catch (e) {
            SQL.rollback();
            res.send({
                success : false,
                message : e.message + '\n' + e.stack
            });
        }
    }
};

var method = methods[ req.data.method ];
if (method) {
    method(req.data.params);
}
else {
    res.send(400, { message : 'Bad request' });
}
