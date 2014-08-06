/* jshint globalstrict: true */
/* global module, require */
'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    bowerPkg: grunt.file.readJSON('bower.json'),
    jshint: {
      options: {
        jshintrc: './.jshintrc',
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
      options: {
        banner: '/*\n\t<%= bowerPkg.name %> v<%= bowerPkg.version %>\n\t<%= bowerPkg.homepage %>\n\n\t(c) <%= grunt.template.today("yyyy") %> <%= bowerPkg.authors.join("- ") %>\n*/\n\n'
      },
      dist: {
        files: {
          'dist/ngRouteWizard.min.js': 'src/ngRouteWizard.js'
        }
      }
    }
  });

  grunt.registerTask('default', [
    'jshint:all'
  ]);

  grunt.registerTask('build', [
    'jshint:all',
    'uglify:dist'
  ]);
};
