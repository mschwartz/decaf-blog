/*global req, res, require */

var Users  = require('Stores/Users'),
    BCrypt = require('support').BCrypt;

var methods = {
    login  : function (params) {
        if (!params.email) {
            return res.send(200, { success : false, message : 'No email address specified' });
        }
        var user = Users.findOne({ email : params.email });
        console.dir(user);

        if (!user.userId || !BCrypt.checkpw(params.password, user.password)) {
            res.send(200, { success : false, message : 'Invalid credentials' });
        }
        else {
            user.lastLogin = user.lastAccess = decaf.timestamp();
            Users.putOne(user);
            res.setCookie('blog_username', params.email);
            res.setCookie('blog_password', params.password);
            res.send(200, { success : true, user : Users.clean(Users.decorate(user)) });
        }
    },
    logout : function (params) {
        res.unsetCookie('blog_username');
        res.unsetCookie('blog_password');
        res.send(200, { success : true });
    }
};

var method = methods[req.data.method];
if (method) {
    method(req.params);
}
else {
    res.send(400, { message : 'Bad request' });
}
