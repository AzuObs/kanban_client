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

    //grunt build 
    useminPrepare: {
      html: "src/index.html",
      options: {
        dest: "release"
      }
    },

    usemin: {
      html: "release/index.html"
    },

    copy: {
      favicon: {
        src: "src/favicon.png",
        dest: "release/favicon.png"
      },
      html: {
        expand: true,
        cwd: "src/",
        src: "**/*.html",
        dest: "release/"
      }
    },

    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          "release/index.html": "release/index.html",
          "release/oauth/oauth.html": "release/oauth/oauth.html",
          "release/common/views/footer/footer.html": "release/common/views/footer/footer.html",
          "release/common/views/navbar/navbar.html": "release/common/views/navbar/navbar.html",
          "release/common/views/state-info/state-info.html": "release/common/views/state-info/state-info.html",
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
    },

    replace: {
      html: {
        options: {
          patterns: [{
            match: /src\/bower-components\/bootstrap\/dist\/css\/bootstrap.css/,
            replacement: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
          }, {
            match: /src\/bower-components\/jquery\/dist\/jquery.js/,
            replacement: "https://code.jquery.com/jquery-2.1.4.min.js"
          }, {
            match: /src\/bower-components\/angular\/angular.js/,
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
            match: /debugApp:true/,
            replacement: "debugApp:false"
          }, {
            match: /apiEndpoint:"http:\/\/localhost:8000\/api"/,
            replacement: 'apiEndpoint:"http://kanban.heroku-app.com"'
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
  grunt.loadNpmTasks("grunt-karma-jasmine");
  grunt.loadNpmTasks("grunt-protractor-runner");

  grunt.registerTask("serve", ["exec:serve"]);
  grunt.registerTask("unit-test", ["karma:unit"]);
  grunt.registerTask("e2e-test", ["exec:selenium", "exec:sleep5", "protractor"]);
  grunt.registerTask("build", [
    "copy",
    "useminPrepare",
    "concat:generated",
    "uglify:generated",
    "cssmin:generated",
    "usemin",
    "exec:rmTmp",
    "replace",
    "htmlmin",
    "compress:archive"
  ]);
};
