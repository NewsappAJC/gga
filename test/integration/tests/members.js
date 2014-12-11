'use strict';
var webdriver = require('selenium-webdriver');
var filter = require('../util/filter');

describe('members index', function() {
  var driver, selectors;

  beforeEach(function() {
    driver = this.driver;
    selectors = this.selectors;
  });

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

  describe('member page', function() {
    beforeEach(function() {
      var firstMemberThumbnail;

      // TODO: Conditionally increase test timeout only when web requests
      // are not being mocked.
      this.timeout(10000);

      return driver
        .findElement(webdriver.By.css(selectors.layouts.members.thumbnail))
        .then(function(el) {
          firstMemberThumbnail = el;
          return driver.wait(function() {
            return firstMemberThumbnail.isDisplayed();
          });
        }).then(function() {
          // TODO: Remove this workaround when application is fixed
          // to not scroll in response to the "members" route.
          return driver.executeScript(function() {
            scrollTo(0, 0);
          });
        }).then(function() {
          return firstMemberThumbnail.click();
        })
        .then(function() {
          return driver.wait(function() {
            return driver.isElementPresent(
              webdriver.By.css(selectors.layouts.member.region)
            );
          });
        });
    });

    it('Bills Sponsored area expands when link is clicked', function() {
      return driver
        .findElement(webdriver.By.css(selectors.layouts.member.accordian))
        .then(function(el) {
          return el.click();
        })
        .then(function() {
          return driver.wait(function() {
            return driver.findElement(webdriver.By.css(selectors.layouts.member.billList))
              .then(function(el) {
                return el.isDisplayed();
              });
          });
        });
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
