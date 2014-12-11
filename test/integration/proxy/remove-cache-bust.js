/**
 * @file A middleware function for Connect.js that strips query parameters from
 * requests that are intended to subvert the web browser cache. These
 * parameters are generally composed of psuedorandom data, making the resultant
 * requests difficult to recognize between test executions.
 */
'use strict';

var url = require('url');

module.exports = function(options) {

  var paramNames = options && options.paramNames || ['_'];

  return function(req, res, next) {
    var parts = url.parse(req.url, true);

    // Remove cache busting parameters in order to stabilize requests
    paramNames.forEach(function(paramName) {
      delete parts.query[paramName];
    });
    delete parts.search;

    req.url = url.format(parts);
    next();
  };
};
