'use strict';

var webdriver = require('selenium-webdriver');

var filter = require('./util/filter');

describe('homepage', function() {
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

  describe('members index', function() {

    beforeEach(function() {
      return driver.findElement(webdriver.By.css(selectors.nav.members))
        .then(function(membersElement) {
          return membersElement.click();
        })
        .then(function() {
          return driver.isElementPresent(webdriver.By.css(selectors.layouts.members.region));
        });
    });

    it('lists all members from both chambers when the user clicks on the "members" element', function() {
      return driver.findElements(webdriver.By.css(selectors.layouts.members.thumbnail))
        .then(function(memberEls) {
          assert.equal(memberEls.length, 236);
        });
    });

    describe('filtering', function() {
      this.timeout(8000);

      it('republicans', function() {
        return filter(driver, 'republicans').then(function(result) {
          assert.equal(result.republicans, 157);
          assert.equal(result.democrats, 0);
          assert.equal(result.independents, 0);
        });
      });

      it('democrats', function() {
        return filter(driver, 'democrats').then(function(result) {
          assert.equal(result.republicans, 0);
          assert.equal(result.democrats, 78);
          assert.equal(result.independents, 0);
        });
      });

      it('independents', function() {
        return filter(driver, 'independents').then(function(result) {
          assert.equal(result.republicans, 0);
          assert.equal(result.democrats, 0);
          assert.equal(result.independents, 1);
        });
      });

      it('democrats in the senate', function() {
        return filter(driver, 'senate').then(function() {
          return filter(driver, 'democrats');
        }).then(function(result) {
          assert.equal(result.republicans, 0);
          assert.equal(result.democrats, 18);
          assert.equal(result.independents, 0);
        });
      });

      it('republicans in the house', function() {
        return filter(driver, 'house').then(function() {
          return filter(driver, 'republicans');
        }).then(function(result) {
          assert.equal(result.republicans, 119);
          assert.equal(result.democrats, 0);
          assert.equal(result.independents, 0);
        });
      });
    });
  });

  describe('bills index', function(){
    beforeEach(function() {
      return driver.findElement(webdriver.By.css(selectors.nav.bills))
        .then(function(billsElement) {
          return billsElement.click();
        })
        .then(function() {
          return driver.isElementPresent(webdriver.By.css(selectors.layouts.bills.region));
        });
    });

    it('lists all bill categories when user clickes on bills homepage element', function() {
      return driver.findElements(webdriver.By.css(selectors.layouts.bills.thumbnail))
        .then(function(billCatEls) {
          assert.equal(billCatEls.length, 10);
        });
    });

    describe('search bills from bill category page', function(){

      it('searches for HB1', function() {
        return driver.findElement(webdriver.By.css(selectors.layouts.bills.search.searchform))
          .then(function(billSearch) {
            return billSearch.click()
              .then(function() {
                return billSearch.sendKeys('1');
              });
          })
          .then(function() {
            return driver.findElement(webdriver.By.css(selectors.layouts.bills.search.searchbutton))
              .then(function(button) {
                return button.click();
              })
              .then(function() {
                return driver.isElementPresent(webdriver.By.css(selectors.layouts.bills.billpage));
              });
          });
      });
    });
  });
});
