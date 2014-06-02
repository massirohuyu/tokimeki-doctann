module.exports = function(grunt) {
	var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'scss',
          src: ['*.scss'],
          dest: './css',
          ext: '.css'
        }]
      }
    },
    connect: {
      livereload: {
        options: {
          port: 8000
        }
      }
    },
    watch: {
      sass: {
        files: ['./scss/*.scss'],
        tasks: ['sass']
      },
      css: {
        files: ['./css/*.css', '!./css/min.css'],
        tasks: []
      },
      html: {
        files: ['./*.html'],
        tasks: []
      },
      js: {
        files: ['./js/*.js'],
        tasks: []
      },
      options: {
        livereload: true,
        nospawn: true
      }
    }
  });

  // loadNpmTasksを変更
  var taskName;
  for(taskName in pkg.devDependencies) {
    if(taskName.substring(0, 6) == 'grunt-') {
      grunt.loadNpmTasks(taskName);
    }
  }

  grunt.registerTask('default', ['connect', 'sass', 'watch']);
};