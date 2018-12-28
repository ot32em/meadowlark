let { Builder, By, Key, until } = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
//let { suite, test} = require('mocha');
let assert = require('chai').assert;


let chromeOptions = new chrome.Options();
chromeOptions.addArguments('--disable-gpu');
chromeOptions.addArguments('--headless');

// @type {WebDriver}
let browser;

suite('Crosspage Tests', function(){
    setup(function(){
         browser = new Builder()
                .forBrowser('chrome')
                .setChromeOptions(chromeOptions)
                .build();
    });

    teardown(function(){
        browser.quit();
        browser = undefined;
    });

    test('requesting group rate from hood river tour page should populate the referred field.',
        function(done){
            let referrer = 'http://localhost:3000/tours/hood-river';
            browser.get(referrer).then( _ => {
                console.log('get(referrer)');
                done();
                return browser.findElement(By.className('requestGroupRate')).click();
            }).then( _ => {
                console.log('findElement(.requestGroupRate)');
                return browser.findElement(By.name('referrer')).getAttribute('value');
            }).then( referrerVal => {
                console.log('findElement(.referrer)');
                console.log(referrerVal);
                assert(referrerVal === referrer);
                done();
            }).catch( e => {});
    });

    test('requesting group rate from taipei tour page should populate the referred field',
        function(done){
            let referrer = 'http://localhost:3000/tours/taipei';
            browser.get(referrer).then( _ => {
                return browser.findElement(By.className('requestGroupRate')).click();
            }).then( _ => {
                return browser.findElement(By.name('referrer')).getAttribute('value');
            }).then( referrerVal => {
                assert(referrerVal === referrer);
                done();
            }).catch ( e => {} );
    });

    test('requesting group rate directly should result in an empty referred field',
        function(done){
            let url = 'http://localhost:3000/tours/request-group-rate';
            browser.get(url).then( _ => {
                return browser.findElement(By.name('referrer')).getAttribute('value');
            }).then( referrerVal => {
                assert(referrerVal === '');
                done();
            }).catch ( e => {} );
    });
});