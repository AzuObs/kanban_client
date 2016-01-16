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

    // CONCAT, UGLIFY, CSSMIN, AND MODIFY REFERENCES IN INDEX.HTML
    useminPrepare: {
      html: "src/index.html",
      options: {
        dest: "release"
      }
    },
    usemin: {
      html: "release/index.html"
    },

    // COPY
    copy: {
      html: {
        expand: true,
        cwd: "src/",
        src: "**/*.html",
        dest: "release/"
      },
      bower_components_min: {
        expand: true,
        cwd: "src/bower_components",
        src: [
          "angular/angular.min.js", //CDN
          "bootstrap/dist/css/bootstrap.min.css", //CDN
          "jquery/dist/jquery.min.js" //CDN
        ],
        dest: "release/bower_components"
      }
    },

    // MINIFICATION HTML
    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          "release/index.html": "release/index.html",
          "release/oauth/oauth.html": "release/oauth/oauth.html",
          "release/common/footer/footer.html": "release/common/footer/footer.html",
          "release/common/navbar/navbar.html": "release/common/navbar/navbar.html",
          "release/common/state-info/state-info.html": "release/common/state-info/state-info.html",
          "release/board-list/board-list.html": "release/board-list/board-list.html",
          "release/board-list/board-modal/board-modal.html": "release/board-list/board-modal/board-modal.html",
          "release/board/board.html": "release/board/board.html",
          "release/board/users/users.html": "release/board/users/users.html",
          "release/board/users/user-directive/user-directive.html": "release/board/users/user-directive/user-directive.html",
          "release/board/users/user-modal/user-modal.html": "release/board/users/user-modal/user-modal.html",
          "release/board/tasks/tasks.html": "release/board/tasks/tasks.html",
          "release/board/tasks/task-directive/task-directive.html": "release/board/tasks/task-directive/task-directive.html",
          "release/board/tasks/task-modal/task-modal.html": "release/board/tasks/task-modal/task-modal.html",
          "release/board/categories/categories.html": "release/board/categories/categories.html",
          "release/board/categories/category-directive/category-directive.html": "release/board/categories/category-directive/category-directive.html",
          "release/about/about.html": "release/about/about.html"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-karma");

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-usemin");
  grunt.loadNpmTasks("grunt-filerev");

  grunt.registerTask("unit-test", ["karma"]);
  grunt.registerTask("build", [
    "copy",
    "useminPrepare",
    "concat:generated",
    "uglify:generated",
    "cssmin:generated",
    "usemin"
    // "htmlmin"
  ]);
};
