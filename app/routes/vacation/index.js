let app = new require('express').Router();

let Vacation = require('../../model/Vacation');

app.get('/init', function(req, res) {
    console.log('init');
    Vacation.find(function(err, vacations) {
        if(err) {
            return res.render('500', {
                'msg': 'error in db',
            });
        }
        if(!vacations.length) {
            new Vacation({
                'name': 'Hood River Day',
                'slug': 'hood-river-day-trip',
                'category': 'Day Trip',
                'sku': 'HR199',
                'description': 'Spend a day sailing on the Columbia and ' +
                            'enjoying craft beers in Hood River',
                'priceInCents': 9995,
                'tags': ['day trip', 'hood river', 'sailing', 'windsurfing', 'breweries'],
                'inSeason': true,
                'available': true,
                'maximumGuests': 16,
                'packagesSold': 0,
            }).save();

            new Vacation({
                'name': 'Oregon Coast Getaway',
                'slug': 'oregon-coast-getaway',
                'category': 'Weekend Getaway',
                'sku': 'OC39',
                'description': 'Enjoy the ocean air and quaint coastal towns!',
                'priceInCents': 269995,
                'tags': ['weekend getaway', 'oregon coast', 'beachcombing'],
                'inSeason': true,
                'available': true,
                'maximumGuests': 8,
                'packagesSold': 0,
            }).save();

            new Vacation({
                'name': 'Rock Climbing in Bend',
                'slug': 'rock-climbing-in-bend',
                'category': 'Adventure',
                'sku': 'B99',
                'description': 'Experience the thrill of climbing in the high desert.',
                'priceInCents': 289995,
                'tags': ['weekend getaway', 'bend', 'high desert', 'rock climbing'],
                'inSeason': true,
                'requireWaiver': true,
                'available': false,
                'maximumGuests': 4,
                'packagesSold': 0,
            }).save();
        }
        res.set('Content-Type', 'text/plain');
        res.send('vacations initialized');
    });
});

function SimpleVacationMap(vacation)
{
    return {
        'name': vacation.name,
        'slug': vacation.slug,
        'category': vacation.category,
        'available': vacation.available,
        'price': vacation.GetDisplayPrice(),
        'notes': vacation.notes ,
    };
}

app.get('/', function(req, res) {
    console.log('list');
    Vacation.find(function(err, vacations) {
        res.render('vacation/list.handlebars', {
            'vacations': vacations.map(SimpleVacationMap),
        });
    });
});

app.get('/:slug', function(req, res) {    
    let slug = req.params.slug;
    if(typeof(slug) === 'undefined') {
        console.log('param slug undefined');
        return res.status(404).render('404');
    }
    slug = require('escape-html')(slug);    
    console.log('get vacation by slug: ' + slug);

    Vacation.findOne({'slug': slug}, function(err, vacation) {
        if(err || !vacation) {
            console.log('vacation not found');
            return res.status(404).render('404');
        }
        else {
            return res.render('vacation/vacation', {
                'vacation': SimpleVacationMap(vacation),
            });
        }
    });
});

module.exports = app;