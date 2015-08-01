/**
 * Created by mschwartz on 6/4/15.
 */
/**
 * Created by mschwartz on 5/6/15.
 */

/*global require, module */
var Config          = require('Config'),
    TemplateManager = require('decaf-hoganjs').TemplateManager,
    viewManager     = new TemplateManager('views'),
    Users           = require('Stores/Users');

function Page(req, res) {
    this.req = req;
    this.res = res;

    // add url of style sheets to be added to page
    this._css = [
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/fuelux/dist/css/fuelux.min.css',
        'bower_components/font-awesome/css/font-awesome.min.css'
    ];
    // add url to scripts to be added to page
    this._scripts = [
        'bower_components/bootstrap/dist/js/bootstrap.min.js'
    ];

    this.renderTemplate = sync(function (tpl, o) {
            return viewManager[ tpl ].render(o, viewManager);
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
        o.blogUser = Users.clean(decaf.extend({}, this.req.user));
        o.css = this._css.concat(o.css || []);
        o.scripts = this._scripts.concat(o.scripts || []);
        if (!o.title) {
            o.title = '';
        }
        console.dir(o);
        var html = this.renderTemplate(tpl, o);
        this.res.send(html);
    }
});
function AdminPage(req, res) {
    var page = new Page(req, res);
    page.addStylesheet('bower_components/startbootstrap-sb-admin-2/dist/css/sb-admin-2.css');
    page.addStylesheet('/css/admin.css');
    return page;
}
function BlogPage(req, res) {
    var page = new Page(req, res);
    page.addStylesheet('/css/blog.css');
    return page;
}
decaf.extend(exports, {
    Page      : Page,
    AdminPage : AdminPage,
    BlogPage  : BlogPage
});
