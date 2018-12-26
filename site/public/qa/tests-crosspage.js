let browserMod = require('zombie');
let assert = require('chai').assert;

let browser;

suite('Crosspage Tests', function(){
    setup(function(){
        browser = new browserMod();
    });

    test('requesting group rate from hood river tour page should populate the referred field.',
        function(done){
            let referrer = 'http://localhost:3000/tours/hood-river';
            browser.visit(referrer, function(){
                browser.clickLink('.requestGroupRate', function(){
                    console.log('browser: [' + browser + ']');
                    console.log('browser.field(name): [' + browser.field('name') + ']');
                    console.log('browser.field(referrer): [' + browser.field('referrer') + ']');
                    for (const key in browser.field('referrer')) {
                        console.log('browser.field(referrer): key: [' +key + ']');

                        if (object.hasOwnProperty(key)) {
                            const element = object[key];
                            console.log('browser.field(referrer): element: [' + element + ']');
                        }
                        else
                        {
                            console.log('browser.field(referrer): no element');
                        }
                    }
                    console.log('browser.field(referrer).value: [' + browser.field('referrer').value + ']');
                    console.log('value: [' + browser.field('name').value + ']');
                    assert(browser.field('referrer').value === referrer)                    
                    done();
                });
            });
    });

    test('requesting group rate from taipei tour page should populate the referred field',
        function(done){
            let referrer = 'http://localhost:3000/tours/taipei';
            browser.visit(referrer, function(){
                browser.clickLink('.requestGroupRate', function(){
                    assert(browser.field('referrer').value === referrer);
                    done();
                });
            });
    });

    test('requesting group rate directly should result in an empty referred field',
        function(done){
            let url = 'http://localhost:3000/tours/request-group-rate';
            browser.visit(url, function(){
                assert(browser.field('referrer').value === '');
                done();
            });
    });
});