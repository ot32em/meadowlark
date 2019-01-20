let loadtest = require('loadtest');
let expect = require('chai').expect;

suite('Stree test', function (){
    test('Homepage should handle 100 request in a second', function(done){
        let options = {
            'url': 'http://localhost:3000',
            'concurrentcy': 4,
            'maxRequests': 100,
        };
        loadtest.loadTest(options, function(err, result) {
            expect(!err);
            expect(result.totalTimeSeconds < 1);
            done();
        });
    });
});