module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: ['src/lib/**/*', 'src/client/**/*'],
        tasks: ['browserify', 'uglify']
      },
      node_modules: {
        files: 'package.json',
        tasks: ['browserify']
      },
      style: {
        files: 'style/**/*',
        tasks: ['concat', 'sass', 'cssmin']
      },
      assets: {
        files: 'assets/**/*',
        tasks: ['copy']
      }
    },

    concat: {
      vendor_style: {
        src: [
          'node_modules/bootstrap/dist/css/bootstrap.min.css',
          'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        dest: 'public/style/vendor.css'
      }
    },

    browserify: {
      options: {
        transform: [ require('grunt-react').browserify ],
      },
      app: {
        src: ['src/client/main.jsx'],
        dest: 'public/scripts/app.js'
      }
    },

    sass: {
      dist: {
        files: {
          'public/style/app.css': 'style/app.scss',
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'public/scripts/app.min.js': 'public/scripts/app.js'
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          'public/style/app.min.css': 'public/style/app.css',
          'public/style/vendor.min.css': 'public/style/vendor.css',
        }
      }
    },

    copy: {
      assets: {
        expand: true,
        cwd: 'assets/',
        src: '**',
        dest: 'public/assets/'
      },
      fonts: {
        expand: true,
        cwd: 'node_modules/font-awesome/',
        src: 'fonts/**',
        dest: 'public/assets/'
      }
    }

  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', [
    'concat', 'browserify', 'uglify', 'sass', 'cssmin', 'copy'
  ]);
  grunt.registerTask('heroku', [
    'concat', 'browserify', 'uglify', 'sass', 'cssmin', 'copy'
  ]);
};