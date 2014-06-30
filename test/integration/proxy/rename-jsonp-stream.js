/**
 * A Transform stream that effectively renames the global callback function in
 * a JSONP response.
 *
 * @constructor
 * @extends stream.Transform
 *
 * @param {Object} options
 * @param {String} options.originalName - Name of the JavaScript callback
 *                                        function that exists in the global
 *                                        scope of the target environment.
 * @param {String} options.newName - Name of the JavaScript callback function
 *                                   that is referenced in the (un-transformed)
 *                                   stream.
 */
'use strict';

var util = require('util');
var Transform = require('stream').Transform;

function RenameJsonpStream(options) {
  Transform.apply(this, arguments);

  this._originalCallbackName = options.originalName;
  this._stubbedCallbackName = options.newName;
  this._didOpenClosure = false;
}
util.inherits(RenameJsonpStream, Transform);

module.exports = RenameJsonpStream;

RenameJsonpStream.prototype._transform = function(chunk, encoding, done) {
  if (!this._didOpenClosure) {
    this._didOpenClosure = true;
    this.push(
      '/* begin IIFE inserted by rename-jsonp-stream module */' +
      '(function() {' +
      'var ' + this._stubbedCallbackName + ' = ' + this._originalCallbackName + ';'
    );
  }
  this.push(chunk);
  done();
};

RenameJsonpStream.prototype._flush = function(done) {
  this.push(
    '}());/* end IIFE inserted by rename-jsonp-stream module */'
  );
  done();
};
