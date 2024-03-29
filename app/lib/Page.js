/**
 * Created by mschwartz on 6/4/15.
 */

/*global require, module, sync */
var Config          = require('Config'),
    TemplateManager = require('decaf-hoganjs').TemplateManager,
    blogViewManager     = new TemplateManager('app/views/blog'),
    adminViewManager     = new TemplateManager('app/views/admin'),
    Users           = require('Stores/Users');

function Page(req, res) {
    var me = this;

    me.req = req;
    me.res = res;

    // add url of style sheets to be added to page
    me._css = [
        '/bower_components/bootstrap/dist/css/bootstrap.min.css',
        '/bower_components/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css',
        '/bower_components/fuelux/dist/css/fuelux.min.css',
        '/bower_components/bootstrap3-dialog/dist/css/bootstrap-dialog.min.css',
        '/bower_components/font-awesome/css/font-awesome.min.css',
        '/bower_components/bootstrap-social/bootstrap-social.css'
    ];
    // add url to scripts to be added to page
    me._scripts = [
        '/bower_components/bootstrap/dist/js/bootstrap.min.js',
        '/bower_components/bootstrap-switch/dist/js/bootstrap-switch.min.js',
        '/bower_components/fuelux/dist/js/fuelux.js',
        '/bower_components/bootstrap3-dialog/dist/js/bootstrap-dialog.min.js',
        '/bower_components/blockUI/jquery.blockUI.js',
        '/bower_components/moment/min/moment.min.js',
        '/md5.js'
    ];

    me.renderTemplate = sync(function (tpl, o) {
            return me.viewManager[ tpl ].render(o, me.viewManager);
        }
    );
}
decaf.extend(Page.prototype, {
    addStylesheet : function (path) {
        var me    = this,
            paths = Array.prototype.slice.call(arguments, 0);
        decaf.each(paths, function (path) {
            me._css.push(path);
        });
    },
    addScript     : function (path) {
        var me    = this,
            paths = Array.prototype.slice.call(arguments, 0);
        decaf.each(paths, function (path) {
            me._scripts.push(path);
        })
    },
    render        : function (tpl, o) {
        o.blogName = Config.blogName;
        o.blogUser = this.req.user ? Users.clean(decaf.extend({}, this.req.user)) : null;
        o.css = this._css.concat(o.css || []);
        o.scripts = this._scripts.concat(o.scripts || []);
        if (!o.title) {
            o.title = '';
        }
        //console.dir(o);
        var html = this.renderTemplate(tpl, o);
        this.res.send(html);
    }
});
function AdminPage(req, res) {
    var page = new Page(req, res);
    page.viewManager = adminViewManager;
    page.addStylesheet('bower_components/startbootstrap-sb-admin-2/dist/css/sb-admin-2.css');
    page.addStylesheet('/css/admin.css');
    return page;
}
function BlogPage(req, res) {
    var page = new Page(req, res);
    page.viewManager = blogViewManager;
    page.addStylesheet('/css/blog.css');
    return page;
}
decaf.extend(exports, {
    Page      : Page,
    AdminPage : AdminPage,
    BlogPage  : BlogPage
});
