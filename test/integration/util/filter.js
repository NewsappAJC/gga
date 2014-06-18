var webdriver = require('selenium-webdriver');
var all = webdriver.promise.all;

var selectors = require('../selectors.json');
var hasClass = require('./has-class');

/**
 * @param {WebDriver} driver
 * @param {String} criteria - Filtering critera
 *
 * @returns {Promise} eventual value reflecting the result of the filtering
 *                    operation
 */

module.exports = function(driver, criteria) {
  var filterButton;
  var buttonClass = selectors.layouts.members.filters[criteria];

  return driver.findElement(webdriver.By.css(buttonClass))
    .then(function(_filterButton) {
      filterButton = _filterButton;
      return filterButton.click();
    })
    .then(function() {
      return driver.wait(function() {
        return hasClass(filterButton, 'btn-default')
          .then(function(result) {
            return result['btn-default'];
          });
      }, 1000);
    })
    .then(function() {
      return driver.findElements(webdriver.By.css(selectors.layouts.members.thumbnail));
    })
    .then(function(memberElements) {
      return driver.manage().timeouts().implicitlyWait(0);
    }).then(function() {
      var findAll = all([
        driver.findElements(
          webdriver.By.css(selectors.layouts.members.thumbnails.republican)
        ),
        driver.findElements(
          webdriver.By.css(selectors.layouts.members.thumbnails.democrat)
        ),
        driver.findElements(
          webdriver.By.css(selectors.layouts.members.thumbnails.independent)
        )
      ]);

      function restoreWait() {
        return driver.manage().timeouts()
          .implicitlyWait(driver.implicitlyWait);
      }

      findAll.then(restoreWait, restoreWait);

      return findAll;
    }).then(function(elems) {
      var counts = {
        republicans: elems[0].length,
        democrats: elems[1].length,
        independents: elems[2].length
      };

      return counts;
    });
};
