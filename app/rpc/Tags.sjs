/*global req, res, require */

var Tags   = require('Stores/Tags');

var methods = {
    list: function() {
        res.send(200, Tags.list({ tagName : '%' + params.pattern + '%' }));
    }
};

var method = methods[ req.data.method ];
if (method) {
    method(req.data.params);
}
else {
    res.send(400, { message : 'Bad request' });
}
