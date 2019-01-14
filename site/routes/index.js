function init(app) {
    app.use('/', require('./root'));
    app.use('/tour/', require('./tour'));
    app.use('/api/', require('./apis/'));
}

module.exports = {
    'init': init,
};
