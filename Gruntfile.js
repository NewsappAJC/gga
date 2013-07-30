module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('config/aws.json'),
    copy: {
      target: {
        files: [
          { expand: true, flatten: true, src: ['src/scripts/lib/*.js'], dest: 'build/scripts/lib/' },
          { expand: true, flatten: true, src: ['src/data/*'], dest: 'build/data/' }
        ]
      }
    },
    jshint: {
      files: [
        'Grintfile.js',
        'src/scripts/*.js'
      ],
      options: {
        browser: true,
        curly: true,
        eqeqeq: true,
        latedef: true,
        //quotmark: true,
        undef: true,
        unused: true,
        strict: true,
        trailing: true,
        smarttabs: true,
        indent: 2,
        globals: {
          JQuery: true,
          $: true
        }
      }
    },
    uglify: {
      options: {
        mangle: { except: ['d3', '_','$'] },
        compress: true,
        report: 'gzip'
      },
      my_target: {
        files: {
          'build/scripts/my_js_file.js'   : ['src/scripts/my_js_file.js']
        }
      }
    },
    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapsWhitespace: true,
          useShortDoctype: true
        },
        files: {
          'build/index.html'    : 'src/index.html'
        }
      }
    },
    cssmin: {
      compress: {
        options: {
          report: 'gzip'
        },
        files: {
          'build/style/app.css': ['src/style/app.css'],
          'build/style/skeleton.css': ['src/style/skeleton.css']
        }
      }
    },
    s3: {
      key: "<%= aws.key %>",
      secret: "<%= aws.secret %>",
      bucket: "<%= aws.bucket %>",
      access: "public-read",
      gzip: true,
      debug: false,
      upload: [
        { src: 'build/*.html', dest: '.' },
        { src: 'build/scripts/*', dest: 'scripts/' },
        { src: 'build/scripts/lib/*', dest: 'scripts/lib/' },
        { src: 'build/data/*', dest: 'data/' },
        { src: 'build/style/*', dest: 'style/' }
      ]
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-s3');

  grunt.registerTask('default', ['copy','uglify','htmlmin','cssmin','s3']);
};

