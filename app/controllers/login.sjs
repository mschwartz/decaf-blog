/*global req, res */

var Page = require('Page').BlogPage,
    page = new Page(req, res);

page.render('login', {
    title: 'Log in'
});
