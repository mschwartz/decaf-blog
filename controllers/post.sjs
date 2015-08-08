/*global req, res */

var BlogPosts = require('Stores/BlogPosts'),
    Page      = require('Page').BlogPage,
    page      = new Page(req, res);

var post = BlogPosts.getBySEO(req.args[ 0 ]);

console.dir({ post : post });
page.render('post', {
    breadcrumb : [
        { active : false, text : 'Home', url : '/' },
        { active : true, text : post.title }
    ],
    post       : post
});
