var Page = require('Page'),
    page = new Page(req, res);

page.render('compose', {
    title: 'Compose Blog Post',
    webComponents: [
        'iron-form',
        'iron-selector',
        'paper-input',
        'paper-toggle-button',
        'paper-menu'
    ],
    appComponents: [
        'markdown-editor'
    ]
});
