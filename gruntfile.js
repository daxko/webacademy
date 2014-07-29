module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      options: {
        outputStyle: 'nested',
        sourceMap: 'style.css.map',
        sourceComments: 'map'
      },
      dist: {
        files: {
          'css/slides.css': 'css/slides.scss'
        }
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      dist: {
        files: {
          'css/slides.min.css': ['css/normalize.css', 'css/slides.css', 'css/tomorrow.css'],
          'css/style.min.css': ['css/normalize.css', 'css/style.css']
        }
      }
    },

    uglify: {
      dist: {
        options: {
          sourceMap: true,
          sourceMapName: 'js/slides.map'
        },
        files: {
          'js/slides.min.js': ['js/reveal.js', 'js/highlight.min.js', 'js/slide.js']
        }
      }
    },

    watch: {
      files: ['css/*.{scss,sass}'],
      tasks: ['sass', 'cssmin']
    }

  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['sass', 'cssmin', 'uglify']);

};
