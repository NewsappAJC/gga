var webdriver = require('selenium-webdriver');
var assert = require('assert');
var path = require('path');
var chromeDriver = require('selenium-chromedriver');
var chrome = require('selenium-webdriver/chrome');
var chromeService = new chrome.ServiceBuilder(chromeDriver.path);
var port = process.env.__TEST_PORT;

describe('homepage', function() {
  var driver;

  beforeEach  (function() {
    var timeout = 5000;

    this.timeout(timeout);

    driver = chrome.createDriver(null, chromeService.build());
    driver.get('http://localhost:' + port);
    driver.manage().timeouts().implicitlyWait(timeout);
    return driver.wait(function() {
      return driver.isElementPresent(webdriver.By.css('.home-head'));
    }, 3000);
  });

  afterEach(function() {
    return driver.quit();
  });

  it('displays the header', function() {
    return driver.findElement(webdriver.By.css('.home-head')).then(function(head) {
      return head.getText().then(function(headText) {
        assert.equal(headText, 'Georgia Legislative Navigator');
      });
    });
  });
});