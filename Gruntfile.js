module.exports = function(grunt) {
	var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    cssmin: {
      compress: {
        files: {
          './css/min.css': ['./css/html5reset-1.6.1.css', './css/common.css']
        }
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
      css: {
        files: ['./css/*.css', '!./css/min.css'],
        tasks: ['cssmin']
      },
      html: {
        files: ['./*.html'],
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

  grunt.registerTask('default', ['connect', 'cssmin', 'watch']);
};