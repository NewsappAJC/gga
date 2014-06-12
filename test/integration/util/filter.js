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

var classNames = {
  republicans: '#filter-Republican',
  democrats: '#filter-Democrat',
  independents: '#filter-Independent'
};

module.exports = function(driver, criteria) {
  var filterButton;
  var buttonClass = classNames[criteria];

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
