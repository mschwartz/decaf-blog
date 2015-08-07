/*global req, res, require */

var BlogPosts = require('Stores/BlogPosts');

switch (req.data.method) {
    case 'list':
        res.send(200, BlogPosts.list({}, function(record) {
            record.url = '/view/' + record.seo;
        }));
        break;
    default:
        res.send(400, { message: 'Bad request' });
        break;
}