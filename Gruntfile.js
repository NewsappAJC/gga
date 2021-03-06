module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('config/aws.json'),
    copy: {
      target: {
        files: [
          { expand: true, flatten: true, src: ['src/images/cropped/*.jpg'], dest: 'build/images/cropped/' },
          { expand: true, flatten: true, src: ['src/images/mugs/*.jpg'], dest: 'build/images/mugs/' },
          { expand: true, flatten: true, src: ['src/images/datatables/*.png'], dest: 'build/images/datatables/' },
          { expand: true, flatten: true, src: ['src/images/*.jpg'], dest: 'build/images/' },
          { expand: true, flatten: true, src: ['src/images/*.png'], dest: 'build/images/' },
          { expand: true, flatten: true, src: ['src/images/*.svg'], dest: 'build/images/' },
          { expand: true, flatten: true, src: ['src/style/images/*.png'], dest: 'build/style/images/' },
          { expand: true, flatten: true, src: ['src/style/boomer/*.otf'], dest: 'build/style/boomer/' },
          { expand: true, flatten: true, src: ['src/style/boomer_cond/*.otf'], dest: 'build/style/boomer_cond/' },
          { expand: true, flatten: true, src: ['src/style/boomerslab/*.otf'], dest: 'build/style/boomerslab/' },
          { expand: true, flatten: true, src: ['src/style/boomerslab_cond/*.otf'], dest: 'build/style/boomerslab_cond/' },
          { expand: true, flatten: true, src: ['src/style/boomerslab_extracond/*.otf'], dest: 'build/style/boomerslab_extracond/' },
          { expand: true, flatten: true, src: ['src/style/publico/*.otf'], dest: 'build/style/publico/' },
          { expand: true, flatten: true, src: ['src/style/Scout/*.otf'], dest: 'build/style/Scout/' },
          { expand: true, flatten: true, src: ['src/map/*.*'], dest: 'build/map/' }
        ]
      }
    },
    jshint: {
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
        indent: 2
      },
      src: {
        options: {
          globals: {
            JQuery: true,
            $: true
          }
        },
        files: {
          src: [
            'src/scripts/*.js',
            'src/scripts/entities/*.js',
            'src/scripts/apps/bills/*.js',
            'src/scripts/apps/bills/show/*.js',
            'src/scripts/apps/members/*.js',
            'src/scripts/apps/members/list/*.js',
            'src/scripts/apps/members/show/*.js',
            'src/scripts/apps/watched_bills/*.js',
            'src/scripts/apps/watched_bills/list/*.js',
            'src/scripts/apps/watched_bills/show/*.js'
          ]
        }
      },
      build: {
        options: {
          node: true
        },
        files: {
          src: ['Gruntfile.js']
        }
      },
      test: {
        options: {
          node: true,
          globals: {
            describe: true,
            it: true,
            beforeEach: true,
            afterEach: true,
            before: true,
            after: true,
            assert: true
          }
        },
        files: {
          src: ['test/**/*.js']
        }
      }
    },
    uglify: {
      options: {
        // mangle: { except: ['d3', '_','$','Bootstrap','Marionette'] },
        mangle: false,
        compress: true,
        report: 'gzip'
      },
      my_target: {
        files: {
          'build/scripts/app.js'                : ['src/scripts/app.js'],
          'build/scripts/lib/require.js'        : ['src/scripts/lib/require.js'],

          'build/scripts/entities/bill.js'             : ['src/scripts/entities/bill.js'],
          'build/scripts/entities/common.js'           : ['src/scripts/entities/common.js'],
          'build/scripts/entities/member.js'           : ['src/scripts/entities/member.js'],
          'build/scripts/entities/top_contributors.js' : ['src/scripts/entities/top_contributors.js'],
          'build/scripts/entities/watched_bill.js'     : ['src/scripts/entities/watched_bill.js'],
          'build/scripts/entities/days_left.js'        : ['src/scripts/entities/days_left.js'],
          'build/scripts/entities/districts.js'        : ['src/scripts/entities/districts.js'],
          'build/scripts/entities/legislative_days.js' : ['src/scripts/entities/legislative_days.js'],
          'build/scripts/entities/events.js'           : ['src/scripts/entities/events.js'],
          'build/scripts/entities/votes.js'            : ['src/scripts/entities/votes.js'],

          'build/scripts/apps/bills/bills_app.js'            : ['src/scripts/apps/bills/bills_app.js'],
          'build/scripts/apps/bills/show/show_controller.js' : ['src/scripts/apps/bills/show/show_controller.js'],
          'build/scripts/apps/bills/show/show_view.js'       : ['src/scripts/apps/bills/show/show_view.js'],
          'build/scripts/apps/bills/list/list_controller.js' : ['src/scripts/apps/bills/list/list_controller.js'],
          'build/scripts/apps/bills/list/list_view.js'       : ['src/scripts/apps/bills/list/list_view.js'],

          'build/scripts/apps/members/members_app.js'          : ['src/scripts/apps/members/members_app.js'],
          'build/scripts/apps/members/show/show_controller.js' : ['src/scripts/apps/members/show/show_controller.js'],
          'build/scripts/apps/members/show/show_view.js'       : ['src/scripts/apps/members/show/show_view.js'],
          'build/scripts/apps/members/list/list_controller.js' : ['src/scripts/apps/members/list/list_controller.js'],
          'build/scripts/apps/members/list/list_view.js'       : ['src/scripts/apps/members/list/list_view.js'],

          'build/scripts/apps/watched_bills/watched_bills_app.js'    : ['src/scripts/apps/watched_bills/watched_bills_app.js'],
          'build/scripts/apps/watched_bills/show/show_controller.js' : ['src/scripts/apps/watched_bills/show/show_controller.js'],
          'build/scripts/apps/watched_bills/show/show_view.js'       : ['src/scripts/apps/watched_bills/show/show_view.js'],
          'build/scripts/apps/watched_bills/list/list_controller.js' : ['src/scripts/apps/watched_bills/list/list_controller.js'],
          'build/scripts/apps/watched_bills/list/list_view.js'       : ['src/scripts/apps/watched_bills/list/list_view.js'],

          'build/scripts/apps/welcome/welcome_app.js'        : ['src/scripts/apps/welcome/welcome_app.js'],
          'build/scripts/apps/welcome/welcome_controller.js' : ['src/scripts/apps/welcome/welcome_controller.js'],
          'build/scripts/apps/welcome/welcome_view.js'       : ['src/scripts/apps/welcome/welcome_view.js'],

          'build/scripts/apps/about/about_app.js'        : ['src/scripts/apps/about/about_app.js'],
          'build/scripts/apps/about/about_controller.js' : ['src/scripts/apps/about/about_controller.js'],
          'build/scripts/apps/about/about_view.js'       : ['src/scripts/apps/about/about_view.js'],

		  'build/scripts/apps/map/map_app.js'        : ['src/scripts/apps/map/map_app.js'],
          'build/scripts/apps/map/map_controller.js' : ['src/scripts/apps/map/map_controller.js'],
          'build/scripts/apps/map/map_view.js'       : ['src/scripts/apps/map/map_view.js'],

          'build/scripts/common/views.js' : ['src/scripts/common/views.js'],
          'build/scripts/common/app.js' : ['src/scripts/common/app.js']
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
          'build/style/bill_search_screen.css': ['src/style/bill_search_screen.css'],
          'build/style/bill_search_antiscreen.css': ['src/style/bill_search_antiscreen.css'],
          'build/style/fonts.css': ['src/style/fonts.css'],
          'build/style/bootstrap.css': ['src/style/bootstrap.css'],
          'build/style/jquery-ui-1.10.3.custom.css': ['src/style/jquery-ui-1.10.3.custom.css'],
          'build/style/jquery.dataTables.css': ['src/style/jquery.dataTables.css'],
          'build/style/dist/css/bootstrap.css': ['src/style/dist/css/bootstrap.css']
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "src/scripts",
          name: "require_main",
          mainConfigFile: "src/scripts/require_main.js",
          out: "build/scripts/require_main.js",
          optimize: "uglify2"
        }
      }
    },

    s3: {
      options: {
        accessKeyId: "<%= aws.key %>",
        secretAccessKey: "<%= aws.secret %>",
        bucket: "<%= aws.bucket %>",
        access: "public-read",
        gzip: true,
        cache: false
      },
      build: {
        cwd: "build/",
        src: "**"
      }
    },
    // s3: {
    //   options: {
    //     key: "<%= aws.key %>",
    //     secret: "<%= aws.secret %>",
    //     bucket: "<%= aws.bucket %>",
    //     access: "public-read",
    //     gzip: true,
    //     debug: false,
    //     maxOperations: 10
    //   },
    //   dev: {
    //     upload: [
    //       { src: 'build/index.html', dest: 'index.html' },
    //       { src: 'build/scripts/app.js', dest: 'scripts/app.js' },
    //       { src: 'build/scripts/require_main.built.js', dest: 'scripts/require_main.built.js' },
    //       { src: 'build/scripts/require_main.js', dest: 'scripts/require_main.js' },
    //       { src: 'build/scripts/underscore.js', dest: 'scripts/underscore.js' },
    //       { src: 'build/scripts/underscore-amd.js', dest: 'scripts/underscore-amd.js' },
    //       { src: 'build/scripts/lib/require.js', dest: 'scripts/lib/require.js' },
    //       { src: 'build/scripts/entities/*', dest: 'scripts/entities/' },
    //       { src: 'build/scripts/apps/bills/bills_app.js', dest: 'scripts/apps/bills/bills_app.js' },
    //       { src: 'build/scripts/apps/bills/show/*', dest: 'scripts/apps/bills/show/' },
    //       { src: 'build/scripts/apps/members/members_app.js', dest: 'scripts/apps/members/members_app.js' },
    //       { src: 'build/scripts/apps/members/list/*', dest: 'scripts/apps/members/list/' },
    //       { src: 'build/scripts/apps/members/show/*', dest: 'scripts/apps/members/show/' },
    //       { src: 'build/scripts/apps/watched_bills/watched_bills_app.js', dest: 'scripts/apps/watched_bills/watched_bills_app.js' },
    //       { src: 'build/scripts/apps/watched_bills/list/*', dest: 'scripts/apps/watched_bills/list/' },
    //       { src: 'build/scripts/apps/watched_bills/show/*', dest: 'scripts/apps/watched_bills/show/' },
    //       { src: 'build/scripts/apps/welcome/*', dest: 'scripts/apps/welcome/'},
    //       { src: 'build/scripts/apps/about/*', dest: 'scripts/apps/about/'},
    //       { src: 'build/scripts/common/*', dest: 'scripts/common/'},

    //       { src: 'build/images/cropped/*', dest: 'images/cropped/' },
    //       { src: 'build/images/datatables/*', dest: 'images/datatables/' },
    //       { src: 'build/images/mugs/*', dest: 'images/mugs/' },
    //       { src: 'build/style/*', dest: 'style/' },
    //       { src: 'build/style/images/*', dest: 'style/images/' },
    //       { src: 'build/style/dist/bootstrap.css', dest: 'style/dist/bootstrap.css' },
    //       { src: 'build/images/*', dest: 'images/' }
    //     ]
    //   }
    // },

    express: {
      dev: {
        options: {
          hostname: '*',
          port: 8000,
          bases: 'src',
          livereload: true,
          showStack: true
        }
      }
    },

    open: {
      dev: {
        path: 'http://localhost:<%= express.dev.options.port %>',
        app: 'Google Chrome'
      }
    },

    watch: {
      all: {
        files: ['src/index.html','src/scripts/**/*.js','src/style/**/*.css'],
        options: { livereload: true }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-aws');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');

  grunt.loadTasks('tasks');

  grunt.registerTask('test-integration', ['server', 'mochaTest']);

  grunt.registerTask('build', ['copy', 'requirejs', 'uglify', 'htmlmin', 'cssmin']);
  grunt.registerTask('default', ['build','s3']);
  grunt.registerTask('server', ['express:dev','open:dev','watch','express-keepalive']);
};

