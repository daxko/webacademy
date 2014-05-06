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

    watch: {
      files: ['css/*.{scss,sass}'],
      tasks: ['sass', 'cssmin']
    }

  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['sass', 'cssmin']);

};
