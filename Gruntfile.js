module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: 'client/scripts/**/*',
        tasks: ['browserify']
      },
      style: {
        files: 'client/style/**/*',
        tasks: ['sass']
      },
      assets: {
        files: ['client/assets/**/*', 'client/html/**/*'],
        tasks: ['copy']
      }
    },

    concat: {
      vendor_scripts: {
        src: [
          'client/bower_components/jquery/dist/jquery.js',
          'client/bower_components/react/react-with-addons.js'
        ],
        dest: 'client/public/scripts/vendor.js'
      },
      vendor_style: {
        src: [
          'client/bower_components/bootstrap/dist/css/bootstrap.min.css',
          'client/bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        dest: 'client/public/style/vendor.css'
      }
    },

    browserify: {
      options: {
        transform: [ require('grunt-react').browserify ]
      },
      app: {
        src: ['client/scripts/main.js'],
        dest: 'client/public/scripts/app.js'
      }
    },

    sass: {
      dist: {
        files: {
          'client/public/style/app.css': 'client/style/app.scss',
        }
      }
    },

    copy: {
      index: {
        src: 'client/html/index.html',
        dest: 'client/public/index.html',
      },
      assets: {
        expand: true,
        cwd: 'client/assets/',
        src: '**',
        dest: 'client/public/assets/'
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
};