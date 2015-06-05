var Page = require('Page'),
    page = new Page(req, res);

page.render('home', {
    title: 'blog home',
    appComponents: [
        'blog-post'
    ]
});
