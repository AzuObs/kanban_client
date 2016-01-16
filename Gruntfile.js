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
        dest: "release/main.css",
        stripBanners: true
      },
      js: {
        src: [
          "src/**/*.js",
          "!src/**/*test.js",
          "!src/bower_components/**/*.js"
        ],
        dest: "release/main.js",
        stripBanners: true

      }
    },
    uglify: {
      src: "release/main.js",
      dest: "release/main.js"
    },
    cssmin: {
      target: {
        src: "release/main.css",
        dest: "release/main.css"
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
  grunt.registarTask("build", ["concat", "uglify", "cssmin"]);
};
