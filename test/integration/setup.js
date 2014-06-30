'use strict';

var webdriver = require('selenium-webdriver');
var assert = require('assert');
var chromeDriver = require('selenium-chromedriver');
var chrome = require('selenium-webdriver/chrome');
var port = process.env.__TEST_PORT;
var chromeOptions = new chrome.Options();
var proxy = require('selenium-webdriver/proxy');

var createProxy = require('./proxy/create');
chromeOptions.setChromeBinaryPath(chromeDriver.path);
global.assert = assert;

before(function() {
  return createProxy().then(function(proxyServer) {
    this.proxyServer = proxyServer;
  }.bind(this));
});

beforeEach(function() {
  var selectors = this.selectors = require('./selectors.json');
  var timeout = 20000;
  var proxyAddress = 'localhost:' + this.proxyServer.address().port;
  var driver = this.driver = new webdriver.Builder()
    .setChromeOptions(chromeOptions)
    .withCapabilities(webdriver.Capabilities.chrome())
    .setProxy(proxy.manual({ http: proxyAddress }))
    .build();

  this.timeout(timeout);

  driver.manage().timeouts().implicitlyWait(timeout);
  driver.implicitlyWait = timeout;

  return driver.get('http://localhost:' + port)
    .then(function() {
      return driver.wait(function() {
        return driver.isElementPresent(webdriver.By.css(selectors.homeHeader));
      }, 3000);
    });
});

afterEach(function() {
  return this.driver.quit();
});
