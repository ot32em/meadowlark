let diceMod = require('../lib/rolldice');
let expect = require('chai').expect

suite('Unit tests', function() {
    test('test dice value', function() {
        let dice = diceMod.rollDice();
        expect(1 <= dice && dice <= 6);
        expect(typeof dice === 'Number');
    });
});