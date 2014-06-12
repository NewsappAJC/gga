'use strict';
var express = require('express');

module.exports = function(grunt) {
  grunt.registerTask('server', 'serve the project\'s static assets', function() {
    var app = express();
    var port = process.env.__TEST_PORT = process.env.NODE_PORT || 8080;

    app.use(express.static('src'));

    app.listen(port);
    grunt.log.writeln('Now running server on port ' + port);

    if (this.flags.hang) {
      this.async();
    }
  });
};