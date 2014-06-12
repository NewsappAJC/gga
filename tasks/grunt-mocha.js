module.exports = function(grunt) {
  'use strict';

  grunt.config.set('mochaTest' , {
    options: {
      reporter: 'spec'
    },
    files: ['test/integration/my_first_test.js']
  });

  grunt.loadNpmTasks('grunt-mocha-test');
};