/**
 * Created by mschwartz on 6/1/15.
 */

/*global require, global */

require.paths.unshift('lib');

var Config = require('Config'),
    Application = require('decaf-jolt').Application,
    StaticServer = require('decaf-jolt-static').StaticServer,
    StaticFile = require('decaf-jolt-static').StaticFile,
    SjsServer = require('decaf-jolt-sjs').SjsServer,
    SjsFile = require('decaf-jolt-sjs').SjsFile,
    app = new Application(),
    //SessionManager = require('Sessions').SessionManager,
    md5 = require('support').md5,
    process = require('process');


require('models');

function main() {
    app.verb('bower_components', new StaticServer('bower_components'));
    app.verb('html', new StaticServer('html'));
    app.verb('rpc', new SjsServer('rpc'));
    app.verb('/', new StaticFile('html/index.html'));
    app.listen(Config.http.port, Config.http.address, 10);
    console.log('listening on http://127.0.0.1:'+Config.http.port)
}
