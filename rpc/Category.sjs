/*global req, res, require */

var Categories = require('Stores/Categories');

switch (req.data.method) {
    case 'list':
        res.send(200, Categories.list({}));
        break;
    default:
        res.send(400, { message: 'Bad request' });
        break;
}
