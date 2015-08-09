/*global req, res */

req.data.start = 0;
req.data.limit = 10;

var Config    = require('Config'),
    Page      = require('Page').BlogPage,
    page      = new Page(req, res),
    BlogPosts = require('Stores/BlogPosts'),
    posts     = BlogPosts.list({}, function (o) { return BlogPosts.decorate(o)});

if (!posts.list.length) {
    posts = { list: undefined };
}
page.render('home', {
    title      : Config.blogName,
    breadcrumb : [
        { active : true, text : 'Home' }
    ],
    posts      : posts.list
});
