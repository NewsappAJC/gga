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
        mangle: { except: ['d3', '_','$','Bootstrap','Marionette'] },
        compress: true,
        report: 'gzip'
      },
      my_target: {
        files: {
          'build/scripts/require_main.js'       : ['src/scripts/require_main.js'],
          'build/scripts/require_main.built.js' : ['src/scripts/require_main.built.js'],
          'build/scripts/app.js'                : ['src/scripts/app.js'],
          'build/scripts/entities/*'            : ['src//scripts/entities/*'],

          'build/scripts/apps/bills/bills_app.js' : ['src/scripts/apps/bills/bills_app.js'],
          'build/scripts/apps/bills/show/*'       : ['src/scripts/apps/bills/show/*'],

          'build/scripts/apps/members/members_app.js' : ['src/scripts/apps/members/members_app.js'],
          'build/scripts/apps/members/show/*'         : ['src/scripts/apps/members/show/*'],
          'build/scripts/apps/members/list/*'         : ['src/scripts/apps/members/list/*'],

          'build/scripts/apps/watched_bills/watched_bills_app.js' : ['src/scripts/apps/watched_bills/watched_bills_app.js'],
          'build/scripts/apps/watched_bills/show/*'               : ['src/scripts/apps/watched_bills/show/*'],
          'build/scripts/apps/watched_bills/list/*'               : ['src/scripts/apps/watched_bills/list/*'],
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

