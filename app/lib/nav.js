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
        ]},
    ]
}

module.exports = navLinks;