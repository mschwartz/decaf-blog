/**
 * Created by mschwartz on 6/4/15.
 */
/**
 * Created by mschwartz on 5/6/15.
 */

/*global require, module */
var TemplateManager = require('decaf-hoganjs').TemplateManager,
    viewManager     = new TemplateManager('views');

function Page(req, res) {
    this.req = req;
    this.res = res;

    // add url of style sheets to be added to page
    this._css = [
        '/css/blog.css'
    ];
    // add url to scripts to be added to page
    this._scripts = [
        '/bower_components/webcomponentsjs/webcomponents-lite.min.js'
    ];

    // add name of web component within bower_components/ to be added to page
    this._webComponents = [
        'polymer',       // translates to /bower_components/polymer/polymer.html
        'paper-styles',
        'iron-flex-layout',
        'iron-icons',
        'paper-dialog',
        'paper-scroll-header-panel',
        'paper-toolbar',
        'paper-material',
        'paper-button',
        'paper-icon-button'
    ];
    // add name of project web components within app_components/ to be added to the page
    this._appComponents = [];
    this.renderTemplate = sync(function (tpl, o) {
            return viewManager[ tpl ].render(o, viewManager);
        }
    );
}
decaf.extend(Page.prototype, {
    addStylesheet   : function (path) {
        var me    = this,
            paths = Array.prototype.slice.call(arguments, 0);
        decaf.each(paths, function (path) {
            me._css.push(path);
        });
    },
    addScript       : function (path) {
        var me    = this,
            paths = Array.prototype.slice.call(arguments, 0);
        decaf.each(paths, function (path) {
            me._scripts.push(path);
        })
    },
    addWebComponent : function (name) {
        var me    = this,
            paths = Array.prototype.slice.call(arguments, 0);
        decaf.each(paths, function (path) {
            me._webComponents.push(path);
        })
    },
    addAppComponent : function (name) {
        var me    = this,
            paths = Array.prototype.slice.call(arguments, 0);
        decaf.each(paths, function (path) {
            me._appComponents.push(path);
        })
    },
    render          : function (tpl, o) {
        o.css = this._css.concat(o.css || []);
        o.scripts = this._scripts.concat(o.scripts || []);
        o.appComponents = this._appComponents.concat(o.appComponents || []);
        o.webComponents = this._webComponents.concat(o.webComponents || []);
        if (!o.title) {
            o.title = '';
        }
        console.dir(o);
        var html = this.renderTemplate(tpl, o);
        this.res.send(html);
    }
});
module.exports = Page;
