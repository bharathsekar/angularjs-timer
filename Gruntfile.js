'use strict';

module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').srcPath || 'src',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        clean: {
            files:[
                'dist/**/*'
            ]
        },
        'uglify': {
            'options': {
                'mangle': false
            },
            'dist': {
                'files': {
                   'dist/js/timer.directive.min.js': ['src/js/timer.directive.js']
                }
            }
        }
  });

  grunt.registerTask('build', [
      'clean',
      'uglify'
  ]);
};
