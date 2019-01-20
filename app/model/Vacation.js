let mongoose = require('mongoose');

let schema = mongoose.Schema({
    'name': String,
    'slug': String,
    'category': String,
    'sku': String,
    'description': String,
    'priceInCents': Number,
    'tags': [String],
    'inSeason': Boolean,
    'available': Boolean,
    'requiresWaiver': Boolean,
    'maximumGuests': Number,
    'notes': String,
    'packageSold': Number,
});

schema.methods.GetDisplayPrice = function() {
    return '$' + (this.priceInCents / 100).toFixed(2);
}

let model = mongoose.model('Vacation', schema);

module.exports = model;