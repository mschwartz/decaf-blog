/*global req, res, require */

var Users           = require('Stores/Users'),
    UserPreferences = require('Stores/UserPreferences'),
    UserStats       = require('Stores/UserStats'),
    BCrypt          = require('support').BCrypt;

var methods = {
    login    : function (params) {
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
    logout   : function (params) {
        res.unsetCookie('blog_username');
        res.unsetCookie('blog_password');
        res.send(200, { success : true });
    },
    register : function (params) {
        var errors = [],
            now    = decaf.timestamp(),
            user   = params.user;

        try {
            if (!user.email || !user.email.length) {
                errors.push('<li>Email Address is required</li>');
            }
            if (!user.password || !user.password.length) {
                errors.push('<li>Password is required</li>');
            }
            if (!user.displayName || !user.displayName.length) {
                errors.push('<li>Display Name is required</li>');
            }

            if (!errors.length) {
                var existing = Users.count({ email : user.email });
                if (existing) {
                    errors.push('<li>Account with that email address exists</li>');
                }
                existing = Users.count({ displayName : user.displayName });
                if (existing) {
                    errors.push('<li>Account with that display name exists</li>l');
                }
            }

            if (errors.length) {
                res.send(200, { success : false, message : errors.join('\n') });
                return;
            }

            user.password = BCrypt.hashpw(user.password);
            user.created = user.edited = now;
            user = Users.putOne(user);
            user.creator = user.userId;
            user.editor = user.userId;
            user = Users.putOne(user);
            UserPreferences.putOne({ userId : user.userId });
            UserStats.putOne({ userId : user.userId });
            res.send(200, { success : true, user : Users.clean(user) });
        }
        catch (e) {
            res.send(500, { success : false, message : e.message + '\n' + e.stack });
        }
    }
};

var method = methods[ req.data.method ];
if (method) {
    method(req.params);
}
else {
    res.send(400, { message : 'Bad request' });
}
