function navLinks() {
    return [
        { 'name': 'Home', 'link': "/",  },
        { 'name': 'About', 'link': "/about", },
        { 'name': 'Newsletter', 'link': "/newsletter", },
        { 'name': 'Tours', 'links': [
            { 'name': 'Tours', 'link': "/tour", },
            { 'name': 'Hood River', 'link': "/tour/hood-river", },
            { 'name': 'Taipei', 'link': "/tour/taipei", },
            { 'name': 'Request Group Rate', 'link': "/tour/request-group-rate", },
        ]},
        { 'name': 'Vacation', 'link': "/vacations"},
        { 'name': 'Photo Contest', 'links': [
            { 'name': 'Photo Contest', 'link': "/contest/vacation-photo", },
            { 'name': 'Photo Contest Ex', 'link': "/contest/vacation-photo-ex", },
        ]},
        
        { 'name': 'Playground', 'links': [
            { 'name': 'header', 'link': "/playground/header", },
            { 'name': 'header-inspect', 'link': "/playground/header-inspect", },
            { 'name': 'jquery-test', 'link': "/playground/jquerytest", },
            { 'name': 'Nursery Rhyme', 'link': "/playground/nursery-rhyme", },
            { 'name': 'cookie-test', 'link': "/playground/cookietest", },
            { 'name': '來個錯誤', 'link': "/playground/throw-error",},
            { 'name': '來個錯誤在 setTimeout', 'link': "/playground/throw-error-in-timeout",},
            { 'name': '關機', 'link': "/playground/close-server",},
            { 'name': 'Spin', 'link': "/playground/spin/2000",},
        ]},
        { 'name': '連絡我們', 'link': '/contact'},
    ]
}

function nav(req, res, next) {
    res.locals._nav = navLinks();
    next();
}

module.exports = nav;