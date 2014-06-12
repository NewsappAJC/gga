/**
 * @param {WebDriver.Element} element
 * @param {String} queryClassNames
 *
 * @return {Promise}
 */
module.exports = function(element, queryClassNames) {
  queryClassNames = queryClassNames.split(' ');

  return element.getAttribute('class').then(function(classAttr) {
    var classNames = classAttr.split(' ');
    var result = {};

    queryClassNames.forEach(function(className) {
      result[className] = classNames.indexOf(className) > -1;
    });

    return result;
  });
};
