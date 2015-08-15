/*global req. res, require */

/*global require, res, req */

var Config = require('Config'),
    Page   = require('Page').BlogPage,
    page   = new Page(req, res);

if ( !req.user ) {
    res.redirect('/');
    return;
}

page.addStylesheet('/bower_components/summernote/dist/summernote.css');
page.addScript('/bower_components/summernote/dist/summernote.min.js');

page.render('compose', {
    title      : 'Compose Blog Post',
    baseUrl    : Config.baseUrl,
    categories : [
        { value : 'default', text : 'Default', selected : true },
        { value : 'default2', text : 'Default2' }
    ]
});
