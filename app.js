/**
 * Created by mschwartz on 6/1/15.
 */

/*global require, global */

require.paths.unshift('lib');

function main() {
    var Config       = require('Config'),
        Application  = require('decaf-jolt').Application,
        StaticServer = require('decaf-jolt-static').StaticServer,
        //StaticFile   = require('decaf-jolt-static').StaticFile,
        SjsServer    = require('decaf-jolt-sjs').SjsServer,
        SjsFile      = require('decaf-jolt-sjs').SjsFile,
        app          = new Application(),
        //SessionManager = require('Sessions').SessionManager,
        md5          = require('support').md5,
        BCrypt       = require('support').BCrypt,
        Users        = require('Stores/Users'),
        process      = require('process');

    require('models');

    app.verb('css', new StaticServer('css'));
    app.verb('js', new StaticServer('js'));
    app.verb('bower_components', new StaticServer('bower_components'));

    app.verb('md5.js', function (req, res) {
        res.writeHead(200, {
            'Content-Type' : 'application/javascript'
        });
        res.end(md5.toString());
    });

    // RPC
    app.verb('rpc', new SjsServer('rpc'));
    // pages
    app.verb('/', new SjsFile('controllers/home.sjs'));
    app.verb('post', new SjsFile('controllers/post.sjs'));
    app.verb('login', new SjsFile('controllers/login.sjs'));
    app.verb('compose', new SjsFile('controllers/compose.sjs'));

    app.on('beginRequest', function (req, res) {
        req.user = null;
        if (req.data.blog_username && req.data.blog_password) {
            var user = Users.findOne({ email : req.data.blog_username });
            if (user.userId && BCrypt.checkpw(req.data.blog_password, user.password)) {
                req.user = user;
                Users.updateLastAccess(user.userId);
            }
        }
        if (req.verb === 'rpc') {
            req.params = req.data.params || {};
        }
    });

    app.listen(Config.http.port, Config.http.address, 10);
    console.log('listening on http://127.0.0.1:' + Config.http.port)
}
