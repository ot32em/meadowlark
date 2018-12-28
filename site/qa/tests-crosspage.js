let { Builder, By, Key, until } = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
let assert = require('chai').assert;


let browser;

suite('Crosspage Tests', function(){
    setup(function(){
         browser = new Builder()
                .forBrowser('chrome')
                .setChromeOptions(new chrome.Options()
                    .headless()
                    .addArguments('--disable-gpu')
                    .addArguments('--disable-extensions')
                    .addArguments('--log-level=3')
                ).build();
    });

    teardown(function(){
        browser.quit();
    });

    test('requesting group rate from hood river tour page should populate the referred field.',
        function(done){
            let referrer = 'http://localhost:3000/tours/hood-river';
            browser.get(referrer).then( _ => {
                done();
                return browser.findElement(By.className('requestGroupRate')).click();
            }).then( _ => {
                return browser.findElement(By.name('referrer')).getAttribute('value');
            }).then( referrerVal => {
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