/*global require, req, res */
var Comments = require('Stores/Comments');

var methods = {
    postComment : function (params) {
        if (!req.user) {
            res.send(200, { success : false, message : 'Not signed in' });
            return;
        }
        SQL.startTransaction();
        try {
            var blogPostId = parseInt('' + params.blogPostId, 10),
                commentId  = parseInt('' + params.commentId, 10),
                content    = params.content.trim(),
                now        = decaf.timestamp();

            if (!content.length) {
                res.send(200, { success : false, message : 'Comment has no content' });
                return;
            }

            var comment = {
                commentId  : commentId,
                blogPostId : blogPostId,
                content    : content,
                editor     : req.user.userId,
                edited     : now
            };
            if (commentId) {
                comment = decaf.extend(Comments.findOne({ commentId : commentId }) || { creator : req.user.userId, created : now }, comment);
            }
            else {
                comment.creator = req.user.userId;
                comment.created = now;
                comment.approved = 0;
            }

            Comments.putOne(comment);
            SQL.commit();
            res.send(200, { success: true });
        }
        catch (e) {
            SQL.rollback();
            res.send(200, { success: false, message: e.message + '\n' + e.stack });
        }
    }
};

var method = methods[ req.data.method ];
if (method) {
    method(req.data.params);
}
else {
    res.send(400, { success : false, message : 'Bad request' });
}
