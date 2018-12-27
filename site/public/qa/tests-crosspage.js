let { Builder, By, Key, until } = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
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

            (async () => {
                await browser.get(referrer);
                await browser.findElement(By.className('requestGroupRate')).click();

                let referrerValue = await browser.findElement(By.name('referrer')).getAttribute('value');
                assert(referrerValue === referrer);
                done();
            })();
    });

    test('requesting group rate from taipei tour page should populate the referred field',
        function(done){
            let referrer = 'http://localhost:3000/tours/taipei';
            (async () => {
                await browser.get(referrer);
                await browser.findElement(By.className('requestGroupRate')).click();

                let referrerValue = await browser.findElement(By.name('referrer')).getAttribute('value');
                assert(referrerValue === referrer);
                done();
            })().catch ( (reason) => {} );
    });

    test('requesting group rate directly should result in an empty referred field',
        function(done){
            let url = 'http://localhost:3000/tours/request-group-rate';
            (async () => {
                await browser.get(url);
                let referrerValue = await browser.findElement(By.name('referrer')).getAttribute('value');
                assert(referrerValue === '');
                done();
            })();
    });
});