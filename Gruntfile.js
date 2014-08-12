/* jshint globalstrict: true */
/* global module, require */
'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    meta: {
      bower: grunt.file.readJSON('bower.json'),
      banner: '/*\n\t<%= meta.bower.name %> v<%= meta.bower.version %>\n\t<%= meta.bower.homepage %>\n\n\t(c) <%= grunt.template.today("yyyy") %> <%= meta.bower.authors.join("- ") %>\n*/\n'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        ignores: [
          'dist/'
        ]
      },
      all: [
        'Gruntfile.js',
        'src/**/*.js'
      ]
    },
    uglify: {
      dist: {
        files: {
          'dist/angular-route-wizard.min.js': 'dist/angular-route-wizard.js'
        }
      }
    },
    clean: {
      dist: ['dist/']
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['angular-route-wizard.js'],
            dest: 'dist/'
          }
        ]
      }
    },
    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= meta.banner %>'
        },
        files: {
          src: ['dist/**.*js']
        }
      }
    }
  });

  grunt.registerTask('default', [
    'jshint:all'
  ]);

  grunt.registerTask('build', [
    'jshint:all',
    'clean:dist',
    'copy:dist',
    'uglify:dist',
    'usebanner:dist'
  ]);
};
