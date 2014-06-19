'use strict';

var webdriver = require('selenium-webdriver');

describe('bills index', function(){
  var driver, selectors;

  beforeEach(function() {
    driver = this.driver;
    selectors = this.selectors;

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

    describe('bill search', function() {
      var billId = '1151';

      it('correctly returns requested house bill', function() {
        return driver.findElement(
          webdriver.By.css(selectors.layouts.bills.search.documentType)
        ).then(function(selectElement) {
          return selectElement.sendKeys('house bills');
        }).then(function() {
          return driver.findElement(
            webdriver.By.css(selectors.layouts.bills.search.searchform)
          );
        }).then(function(numberInput) {
          return numberInput.sendKeys(billId)
            .then(function() {
              return numberInput.submit();
            });
        }).then(function() {
          return driver.wait(function() {
            return driver.isElementPresent(
              webdriver.By.css(selectors.layouts.bill.region)
            );
          }, 3000);
        }).then(function() {
          return driver.findElement(
            webdriver.By.css(selectors.layouts.bill.title)
          );
        }).then(function(element) {
          return element.getText();
        }).then(function(text) {
          assert(
            text.indexOf(billId) > -1, 'Expected bill ID present on page.'
          );
        });
      });

      it('does not return house bills when searching senate bills');
    });

    it('every category displays a positive number of watched bills', function() {
      var countRe = /\b(\d+)\s*bills?\b/i;

      return driver.findElements(
        webdriver.By.css(selectors.layouts.bills.thumbnail)
      ).then(function(elements) {
        assert.equal(elements.length, 10);

        return webdriver.promise.all(elements.map(function(element) {
          return element.getText();
        })).then(function(texts) {
          texts.forEach(function(text) {
            var match = text.match(countRe);

            assert(match, 'Displays some number of bills');
            assert(parseInt(match[0], 10) > 0, 'Displays a positive number of bills');
          });
        });
      });
    });
  });
});
