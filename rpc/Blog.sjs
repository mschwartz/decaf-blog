/*global req, res, require */

var BlogPosts = require('Stores/BlogPosts');

res.send(200, BlogPosts.list({}, function(record) {
    record.url = '/view/' + record.seo;
}));
