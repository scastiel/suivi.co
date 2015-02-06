module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: 'src/**/*',
        tasks: ['browserify']
      },
      node_modules: {
        files: 'package.json',
        tasks: ['browserify']
      },
      bower_components: {
        files: 'bower.json',
        tasks: ['concat']
      },
      style: {
        files: 'style/**/*',
        tasks: ['concat', 'sass']
      },
      assets: {
        files: 'client/assets/**/*',
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
        transform: [ require('grunt-react').browserify ]
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

    copy: {
      assets: {
        expand: true,
        cwd: 'assets/',
        src: '**',
        dest: 'public/assets/'
      }
    }

  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', [
    'concat', 'browserify', 'sass', 'copy'
  ]);
  grunt.registerTask('heroku', [
    'concat', 'browserify', 'sass', 'copy'
  ]);
};