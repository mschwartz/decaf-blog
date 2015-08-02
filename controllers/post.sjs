/*global req, res */

var Page = require('Page').BlogPage,
page = new Page(req, res);

page.render('post', {
    title: 'test blog post title 1',
    subtitle: 'test blog post subtitle 1',
    seo: 'post1',
    creatorInfo: { userId: 1, displayName: 'Mike Schwartz '},
    createdInfo: { date: 'September 24, 2014' },
    content: 'this is a blog post!'
});
