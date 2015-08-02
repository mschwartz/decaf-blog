/*global req, res */

var Page = require('Page').BlogPage,
    page = new Page(req, res);

page.render('home', {
    title: 'blog home',
    breadcrumb: [
        { active: true, text: 'Home' }
    ],
    posts: [
        {
            title: 'test blog post title 1',
            subtitle: 'test blog post subtitle 1',
            seo: 'post1',
            creatorInfo: { userId: 1, displayName: 'Mike Schwartz '},
            createdInfo: { date: 'September 24, 2014' },
            last: false
        },
        {
            title: 'test blog post title 2',
            subtitle: 'test blog post subtitle 2',
            seo: 'post2',
            creatorInfo: { userId: 1, displayName: 'Mike Schwartz '},
            createdInfo: { date: 'September 24, 2014' },
            last: false
        },
        {
            title: 'test blog post title 3',
            subtitle: 'test blog post subtitle 3',
            seo: 'post3',
            creatorInfo: { userId: 1, displayName: 'Mike Schwartz '},
            createdInfo: { date: 'September 24, 2014' },
            last: false
        },
        {
            title: 'test blog post title 4',
            subtitle: 'test blog post subtitle 4',
            seo: 'post4',
            creatorInfo: { userId: 1, displayName: 'Mike Schwartz '},
            createdInfo: { date: 'September 24, 2014' },
            last: false
        },
        {
            title: 'test blog post title 5',
            subtitle: 'test blog post subtitle 5',
            seo: 'post5',
            creatorInfo: { userId: 1, displayName: 'Mike Schwartz '},
            createdInfo: { date: 'September 24, 2014' },
            last: false
        },
        {
            title: 'test blog post title 6',
            subtitle: 'test blog post subtitle 6',
            seo: 'post6',
            creatorInfo: { userId: 1, displayName: 'Mike Schwartz '},
            createdInfo: { date: 'September 24, 2014' },
            last: true
        }
    ]
});
