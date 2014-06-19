'use strict';
var webdriver = require('selenium-webdriver');

describe('index', function() {
  var driver, selectors;

  beforeEach(function() {
    driver = this.driver;
    selectors = this.selectors;
  });

  it('displays the header', function() {
    return this.driver.findElement(webdriver.By.css(selectors.homeHeader)).then(function(head) {
      return head.getText().then(function(headText) {
        assert.equal(headText, 'Georgia Legislative Navigator');
      });
    });
  });
});
