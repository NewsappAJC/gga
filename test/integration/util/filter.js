var webdriver = require('selenium-webdriver');
var all = webdriver.promise.all;

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
  var buttonClass = '#filter-' + criteria[0].toUpperCase() + criteria.slice(1, criteria.length - 1);

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
      return driver.findElements(webdriver.By.css('.member'));
    })
    .then(function(memberElements) {
      return all(memberElements.map(function(element) {
        return hasClass(element, 'Republican Democrat Independent');
      })).then(function(vals) {
        var result = {
          republicans: 0,
          democrats: 0,
          independents: 0
        };

        vals.forEach(function(classNames) {
          if (classNames.Democrat) {
            result.democrats++;
          }
          if (classNames.Independent) {
            result.independents++;
          }
          if (classNames.Republican) {
            result.republicans++;
          }
        });

        return result;
      });
    });
};
