module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    karma: {
      unit: {
        configFile: "karma.conf.js",
        // background: true, //uncomment once I have contrib-watch figured out
        // singleRun: true
        autoWatch: true
      }
    },
    concat: {
      css: {
        src: [
          "src/**/*.css",
          "!src/bower_components/**/*.css"
        ],
        dest: "release/main.css"
      },
      js: {
        src: [
          "src/**/*.js",
          "!src/**/*test.js",
          "!src/bower_components/**/*.js"
        ],
        dest: "release/main.js"
      }
    },
    uglify: {
      js: {
        src: "release/main.js"
      },
      css: {
        src: "release/main.css"
      }
    }
  });

  grunt.loadNpmTasks("grunt-karma");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("unit-test", ["karma"]);
};
