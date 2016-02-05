module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // grunt unit-test
    karma: {
      options: {
        configFile: "karma.conf.js"
      },
      unit: {
        autoWatch: true,
      },
      watchUnit: {
        background: true,
        singleRun: true
      }
    },


    // grunt e2e-test
    protractor: {
      options: {
        configFile: "e2e/conf.js",
        keepAlive: true,
        noColor: false
      },
      navbar: {
        options: {
          args: {
            suite: "navbar"
          }
        }
      },
      footer: {
        options: {
          args: {
            suite: "footer"
          }
        }
      },
      error: {
        options: {
          args: {
            suite: "error"
          }
        }
      },
      about: {
        options: {
          args: {
            suite: "about"
          }
        }
      },
      oauth: {
        options: {
          args: {
            suite: "oauth"
          }
        }
      },
      boardList: {
        options: {
          args: {
            suite: "boardList"
          }
        }
      },
      boardModal: {
        options: {
          args: {
            suite: "boardModal"
          }
        }
      },
      board: {
        options: {
          args: {
            suite: "board"
          }
        }
      },
      taskModal: {
        options: {
          args: {
            suite: "taskModal"
          }
        }
      },
      userModal: {
        options: {
          args: {
            suite: "userModal"
          }
        }
      }
    },


    //grunt exec
    exec: {
      serve: "python -m SimpleHTTPServer 3000",
      rmTmp: "rm -r .tmp",
      selenium: "gnome-terminal -e 'bash -c \"webdriver-manager start; exec bash\"'",
      sleep5: "sleep 5"
    },


    //grunt release 
    useminPrepare: {
      html: "src/index.html",
      options: {
        dest: "release"
      }
    },

    usemin: {
      html: "release/index.html"
    },

    clean: {
      release: {
        files: {
          src: "release/**/*"
        }
      }
    },

    copy: {
      assets: {
        expand: true,
        cwd: "src/common/",
        src: "assets/**/*",
        dest: "release/common/"
      },
      html: {
        expand: true,
        cwd: "src/",
        src: "**/*.html",
        dest: "release/"
      }
    },

    htmlmin: {
      release: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          "release/index.html": "release/index.html",
          "release/about-page/about.html": "release/about-page/about.html",
          "release/board-list-page/board-list.html": "release/board-list-page/board-list.html",
          "release/board-list-page/board-modal/board-modal.html": "release/board-list-page/board-modal/board-modal.html",
          "release/board-page/board.html": "release/board-page/board.html",
          "release/board-page/users/users.html": "release/board-page/users/users.html",
          "release/board-page/users/user-directive/user-directive.html": "release/board-page/users/user-directive/user-directive.html",
          "release/board-page/users/user-modal/user-modal.html": "release/board-page/users/user-modal/user-modal.html",
          "release/board-page/tasks/tasks.html": "release/board-page/tasks/tasks.html",
          "release/board-page/tasks/task-directive/task-directive.html": "release/board-page/tasks/task-directive/task-directive.html",
          "release/board-page/tasks/task-modal/task-modal.html": "release/board-page/tasks/task-modal/task-modal.html",
          "release/board-page/categories/categories.html": "release/board-page/categories/categories.html",
          "release/board-page/categories/category-directive/category-directive.html": "release/board-page/categories/category-directive/category-directive.html",
          "release/oauth-page/oauth.html": "release/oauth-page/oauth.html",
          "release/common/directives/deletable-object/deletable-object.html": "release/common/directives/deletable-object/deletable-object.html",
          "release/common/directives/editable-text/editable-text.html": "release/common/directives/editable-text/editable-text.html",
          "release/common/directives/expandable-text/expandable-text.html": "release/common/directives/expandable-text/expandable-text.html",
          "release/common/views/footer/footer.html": "release/common/views/footer/footer.html",
          "release/common/views/navbar/navbar.html": "release/common/views/navbar/navbar.html"
        }
      }
    },

    replace: {
      html: {
        options: {
          patterns: [{
            match: /common\/bower-components\/bootstrap\/dist\/css\/bootstrap.css/,
            replacement: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
          }, {
            match: /common\/bower-components\/jquery\/dist\/jquery.js/,
            replacement: "https://code.jquery.com/jquery-2.1.4.min.js"
          }, {
            match: /common\/bower-components\/angular\/angular.js/,
            replacement: "https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"
          }]
        },
        files: [{
          src: "release/index.html",
          dest: "release/index.html"
        }]
      },
      js: {
        options: {
          patterns: [{
            match: /debugApp:!0/,
            replacement: "debugApp:!!0"
          }, {
            match: /apiEndpoint:"http:\/\/localhost:8000\/api"/,
            replacement: 'apiEndpoint:"https://bigbangkanban.herokuapp.com"'
          }]
        },
        files: [{
          src: "release/main.js",
          dest: "release/main.js"
        }]
      }
    },

    compress: {
      archive: {
        options: {
          archive: "archive.zip"
        },
        expand: true,
        src: "release/**/*",
        dest: ""
      }
    }
  });


  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-compress");
  grunt.loadNpmTasks("grunt-usemin");
  grunt.loadNpmTasks("grunt-replace");
  grunt.loadNpmTasks("grunt-exec");
  grunt.loadNpmTasks("grunt-karma");
  grunt.loadNpmTasks("grunt-protractor-runner");

  grunt.registerTask("serve", ["exec:serve"]);
  grunt.registerTask("unit-test", ["karma:unit"]);
  grunt.registerTask("e2e-test", ["exec:selenium", "exec:sleep5", "protractor"]);
  grunt.registerTask("release", [
    "clean:release",
    "copy:html",
    "copy:assets", //this must be after html otherwise it'll override it...
    "useminPrepare",
    "concat:generated",
    "uglify:generated",
    "cssmin:generated",
    "usemin",
    "exec:rmTmp",
    "replace:html",
    "replace:js",
    "htmlmin",
    "compress:archive"
  ]);
};
