/*global req, res */

var BlogPosts = require('Stores/BlogPosts'),
    Page      = require('Page').BlogPage,
    page      = new Page(req, res);

var post    = BlogPosts.getBySEO(req.args[ 0 ]),
    isAdmin = req.user.userGroupId === 1;

if ( isAdmin ) {
    page.addStylesheet('/bower_components/summernote/dist/summernote.css');
    page.addScript('/bower_components/summernote/dist/summernote.min.js');
}

if (post.edited === post.created) {
    delete post.edited;
}
console.dir(post);

page.render('post', {
    breadcrumb  : [
        { active : false, text : 'Home', url : '/' },
        { active : true, text : post.title }
    ],
    post        : post,
    isAdmin     : isAdmin,
    postEncoded : JSON.stringify(post)
});
