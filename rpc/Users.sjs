/*global req, res, require */

var Users  = require('Stores/Users'),
    BCrypt = require('support').BCrypt,
    params = req.params;

switch (req.data.method) {
    case 'login':
        if (!params.email) {
            return res.send(200, { success : false, message : 'No email address specified' });
        }
        var user = Users.findOne({ email : params.email });
        if (!user.userId || !BCrypt.checkpw(params.password, user.password)) {
            res.send(200, { success : false, message : 'Invalid credentials' });
        }
        else {
            user.lastLogin = user.lastAccess = decaf.timestamp();
            Users.putOne(user);
            res.setCookie('blog_username', params.email);
            res.setCookie('blog_password', params.password);
            res.send(200, { success: true, user: Users.clean(Users.decorate(user))});
        }
        break;
    case 'logout':
        res.unsetCookie('blog_username');
        res.unsetCookie('blog_password');
        break;
    default:
        res.send(400, { message : 'Bad request' });
        break;
}
