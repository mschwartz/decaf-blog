/*global req, res */

var Page = require('Page').BlogPage,
    page = new Page(req, res);

page.addScript('/md5.js');
page.render('login', {
    title: 'log in'
});
