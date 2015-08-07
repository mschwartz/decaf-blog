/*global req, res, require */

var Tags   = require('Stores/Tags'),
    params = req.params;

debugger
switch (req.data.method) {
    case 'list':
        res.send(200, Tags.list({ tagName : '%' + params.pattern + '%' }));
        break;
    default:
        res.send(404, { message : 'No such method' });
        break;
}
