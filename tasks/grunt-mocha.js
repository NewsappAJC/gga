module.exports = function(grunt) {
  'use strict';

  grunt.config.set('mochaTest' , {
    options: {
      reporter: 'spec'
    },
    files: [
      'test/integration/setup.js',
      'test/integration/tests/*'
    ]
  });

  grunt.loadNpmTasks('grunt-mocha-test');
};
