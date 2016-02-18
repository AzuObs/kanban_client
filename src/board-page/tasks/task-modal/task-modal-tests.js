(function() {
  "use strict";

  describe("taskModalCtrl", function() {
    var $scope, $modalInstance, user, board;

    beforeEach(function() {
      module("taskModalModule");

      inject(function($rootScope, $controller, $modal, boardFactory) {
        // SPIES 
        spyOn(boardFactory, "getBoardSync").and.callFake(function() {
          return board;
        });

        spyOn(boardFactory, "getBoardUsersSync").and.callFake(function() {
          return board.admins.concat(board.members);
        });


        // VARIABLE INIT
        board = {
          _id: "foobar Board",
          admins: [{
            _id: "foobar Admin"
          }],
          members: [{
            _id: "foobar Member"
          }],
          categories: [{
            _id: "foobar Category",
            tasks: [{
              _id: "foobar Task",
              name: "foobar Task name",
              users: [{
                _id: "foobar Admin"
              }],
              comments: []
            }]
          }]
        };

        user = {
          pictureUrl: "http://foobar.com",
          username: "foobar"
        };
        $modalInstance = $modal.open({
          template: "<h1></h1>"
        });
        $scope = $rootScope.$new();


        // CONTROLLER INIT
        $controller("taskModalCtrl", {
          $scope: $scope,
          $modalInstance: $modalInstance,
          catId: board.categories[0]._id,
          taskId: board.categories[0].tasks[0]._id,
          user: user
        });
      });
    });


    // TESTING
    describe("$scope.getAddableUsers()", function() {
      it("is defined", function() {
        expect($scope.getAddableUsers).toBeDefined();
      });

      it("is a function", function() {
        expect(typeof $scope.getAddableUsers).toEqual("function");
      });

      it("gets the users that can be added to the task", function() {
        $scope.board.admins = [{
          _id: 123
        }];
        $scope.board.members = [{
          _id: 234
        }];
        $scope.task.users = [{
          _id: 123
        }];

        $scope.getAddableUsers();
        expect($scope.addableUsers.length).toEqual(1);
        expect($scope.addableUsers[0].keys).toEqual($scope.board.members[0].keys);
      });
    });


    describe("$scope.getChangeableCategories()", function() {
      it("is defined", function() {
        expect($scope.getChangeableCategories).toBeDefined();
      });

      it("is a function", function() {
        expect(typeof $scope.getChangeableCategories).toEqual("function");
      });

      it("gets the categories that the task can be changed to", function() {
        var categories = [{
          _id: "bar",
          name: "bar"
        }, {
          _id: "foo",
          name: "foo"
        }];

        $scope.board.categories.unshift(categories[0]);
        $scope.board.categories.push(categories[1]);

        $scope.getChangeableCategories();
        expect($scope.changeableCategories).toEqual(categories);
      });
    });


    describe("$scope.getTaskIndex()", function() {
      it("is defined", function() {
        expect($scope.getTaskIndex).toBeDefined();
      });

      it("is a function", function() {
        expect(typeof $scope.getTaskIndex).toEqual("function");
      });

      it("returns the index of the task in the category", function() {
        $scope.board.categories[0].tasks.push({
          _id: 123
        });
        $scope.board.categories[0].tasks.unshift({
          _id: 123
        });
        expect($scope.getTaskIndex()).toEqual(1);
      });
    });


    describe("$scope.getCatIndex()", function() {
      it("is defined", function() {
        expect($scope.getCatIndex).toBeDefined();
      });

      it("is a function", function() {
        expect(typeof $scope.getCatIndex).toEqual("function");
      });

      it("returns the index of the category in the board", function() {
        $scope.board.categories.push({
          _id: "foo"
        });
        $scope.board.categories.unshift({
          _id: "bar"
        });

        expect($scope.getCatIndex()).toEqual(1);
      });
    });


    describe("$scope.ageOfPost()", function() {
      var t, intervals;

      intervals = {
        year: 1000 * 3600 * 24 * 30 * 12,
        month: 1000 * 3600 * 24 * 30,
        day: 1000 * 3600 * 24,
        hour: 1000 * 3600,
        minute: 1000 * 60,
        second: 1000 * 1,
        milliseconds: 1
      };

      beforeEach(function() {
        t = Date.now();
      });

      it("is defined", function() {
        expect($scope.ageOfPost).toBeDefined();
      });

      it("is a function", function() {
        expect(typeof $scope.ageOfPost).toEqual("function");
      });

      it("returns 'just now' when date is less than one second old", function() {
        expect($scope.ageOfPost(t)).toEqual("just now");
      });

      it("returns 1 second ago when date is one second old", function() {
        t -= 1 * intervals.second;
        expect($scope.ageOfPost(t)).toEqual("1 second ago");
      });

      it("returns x 'seconds' ago when date is several seconds old", function() {
        t -= 5 * intervals.second;
        expect($scope.ageOfPost(t)).toEqual("5 seconds ago");
      });

      it("returns 1 minute ago when date is one minute old", function() {
        t -= 1 * intervals.minute;
        expect($scope.ageOfPost(t)).toEqual("1 minute ago");
      });

      it("returns x 'minutes' ago when date is several minutes old", function() {
        t -= 5 * intervals.minute;
        expect($scope.ageOfPost(t)).toEqual("5 minutes ago");
      });

      it("returns 1 hour ago when date is one hour old", function() {
        t -= 1 * intervals.hour;
        expect($scope.ageOfPost(t)).toEqual("1 hour ago");
      });

      it("returns x 'hours' ago when date is several hours old", function() {
        t -= 5 * intervals.hour;
        expect($scope.ageOfPost(t)).toEqual("5 hours ago");
      });

      it("returns 1 day ago when date is one day old", function() {
        t -= 1 * intervals.day;
        expect($scope.ageOfPost(t)).toEqual("1 day ago");
      });

      it("returns x 'days' ago when date is several days old ", function() {
        t -= 5 * intervals.day;
        expect($scope.ageOfPost(t)).toEqual("5 days ago");
      });

      it("returns 1 month ago when date is one month old", function() {
        t -= 1 * intervals.month;
        expect($scope.ageOfPost(t)).toEqual("1 month ago");
      });

      it("returns x 'months' ago when date is several months old ", function() {
        t -= 5 * intervals.month;
        expect($scope.ageOfPost(t)).toEqual("5 months ago");
      });

      it("returns 1 year ago when date is one year old", function() {
        t -= 1 * intervals.year;
        expect($scope.ageOfPost(t)).toEqual("1 year ago");
      });

      it("returns x 'years' ago when date is several years old ", function() {
        t -= 5 * intervals.year;
        expect($scope.ageOfPost(t)).toEqual("5 years ago");
      });
    });


    describe("$scope.createComment()", function() {
      var apiCalled, apiCallArgs, defer;

      beforeEach(inject(function($q, boardFactory) {
        spyOn(boardFactory, "createComment").and.callFake(function() {
          apiCalled = true;
          apiCallArgs = arguments;
          defer = $q.defer();
          return defer.promise;
        });
      }));

      it("is defined", function() {
        expect($scope.createComment).toBeDefined();
      });

      it("is a function", function() {
        expect(typeof $scope.createComment).toEqual("function");
      });

      it("calls boardFactory.createComment", function() {
        apiCalled = false;
        $scope.createComment();
        expect(apiCalled).toEqual(true);
      });

      it("calls boardFactory with args [category, task, user, commentInput]", function() {
        $scope.commentInput = "commentInput";
        $scope.task = "task";
        $scope.category = "category";

        $scope.createComment();

        expect(apiCallArgs[0]).toEqual("category");
        expect(apiCallArgs[1]).toEqual("task");
        expect(apiCallArgs[2]).toEqual(user);
        expect(apiCallArgs[3]).toEqual("commentInput");
      });

      it("calls $scope.resetCommentInput on resolve", function() {
        var called = false;

        spyOn($scope, "resetCommentInput").and.callFake(function() {
          called = true;
        });

        $scope.createComment();
        $scope.$apply(function() {
          defer.resolve();
        });

        expect(called).toEqual(true);
      });
    });


    describe("$scope.resetCommentInput", function() {
      it("is defined", function() {
        expect($scope.resetCommentInput).toBeDefined();
      });

      it("is a function", function() {
        expect(typeof $scope.resetCommentInput).toEqual("function");
      });

      it("reset $scope.commentInput", function() {
        $scope.commentInput = "foobar";
        $scope.resetCommentInput();

        expect($scope.commentInput).toEqual("");
      });
    });


    describe("$scope.deleteTask()", function() {
      var defer, apiCalled, apiCallArgs;

      beforeEach(inject(function($q, boardFactory) {
        spyOn(boardFactory, "deleteTask").and.callFake(function() {
          apiCalled = true;
          apiCallArgs = arguments;
          defer = $q.defer();
          return defer.promise;
        });
      }));

      it("is defined", function() {
        expect($scope.deleteTask).toBeDefined();
      });

      it("is a function", function() {
        expect(typeof $scope.deleteTask).toEqual("function");
      });

      it("calls boardFactory.deleteTask", function() {
        apiCalled = false;
        $scope.deleteTask();
        expect(apiCalled).toEqual(true);
      });

      it("calls boardFactory.deleteTask with args [category, task]", function() {
        apiCallArgs = [];
        $scope.category = "category";
        $scope.task = "task";

        $scope.deleteTask();
        expect(apiCallArgs.length).toEqual(2);
        expect(apiCallArgs[0]).toEqual("category");
        expect(apiCallArgs[1]).toEqual("task");
      });

      it("calls $scope.closeModal on resolve", function() {
        var closeModalCalled = false;
        spyOn($scope, "closeModal").and.callFake(function() {
          closeModalCalled = true;
        });

        $scope.deleteTask();
        $scope.$apply(function() {
          defer.resolve();
        });

        expect(closeModalCalled).toEqual(true);
      });
    });


    describe("$scope.closeModal()", function() {
      it("is defined", function() {
        expect($scope.closeModal).toBeDefined();
      });

      it("is a function", function() {
        expect(typeof $scope.closeModal).toEqual("function");
      });

      it("calls $modalInstance.dismiss()", function() {
        var dismissCalled = false;
        spyOn($modalInstance, "dismiss").and.callFake(function() {
          dismissCalled = true;
        });
        $scope.closeModal();

        expect(dismissCalled).toEqual(true);
      });
    });


    describe("$scope.addUserToTask", function() {
      var defer, apiCalled, apiCallArgs;

      beforeEach(inject(function($q, boardFactory) {
        spyOn(boardFactory, "addUserToTask").and.callFake(function() {
          apiCalled = true;
          apiCallArgs = arguments;
          defer = $q.defer();
          return defer.promise;
        });
      }));

      it("is defined", function() {
        expect($scope.addUserToTask).toBeDefined();
      });

      it("is a function", function() {
        expect(typeof $scope.addUserToTask).toEqual("function");
      });

      it("calls boardFactory.addUserToTask", function() {
        apiCalled = false;
        $scope.addUserToTask();
        expect(apiCalled).toEqual(true);
      });

      it("calls boardFactory.addUserToTask with args [task, user]", function() {
        apiCallArgs = [];
        $scope.task = "task";

        $scope.addUserToTask("user");
        expect(apiCallArgs.length).toEqual(2);
        expect(apiCallArgs[0]).toEqual("task");
        expect(apiCallArgs[1]).toEqual("user");
      });


      it("calls $scope.getAddableUsers on resolve", function() {
        var getAddbleUsersCalled = false;
        spyOn($scope, "getAddableUsers").and.callFake(function() {
          getAddbleUsersCalled = true;
        });

        $scope.addUserToTask();
        $scope.$apply(function() {
          defer.resolve();
        });

        expect(getAddbleUsersCalled).toEqual(true);
      });
    });


    describe("$scope.moveTaskToCategoryLocally", function() {
      it("is defined", function() {
        expect($scope.moveTaskToCategoryLocally).toBeDefined();
      });

      it("is a function", function() {
        expect(typeof $scope.moveTaskToCategoryLocally).toEqual("function");
      });

      it("moves task from one category to another locally", function() {
        var category = {
          _id: "foo",
          tasks: []
        };

        $scope.board.categories.push(category);
        expect($scope.board.categories[0].tasks.length).toEqual(1);
        $scope.moveTaskToCategoryLocally(category);
        expect($scope.board.categories[0].tasks.length).toEqual(0);
        expect($scope.board.categories[1].tasks.length).toEqual(1);
      });
    });


    describe("$scope.moveTaskToCategory", function() {
      var defer, apiCalled;

      beforeEach(inject(function(boardFactory, $q) {
        apiCalled = false;
        spyOn(boardFactory, "updateBoard").and.callFake(function() {
          apiCalled = true;
          defer = $q.defer();
          return defer.promise;
        });
      }));

      it("is defined", function() {
        expect($scope.moveTaskToCategory).toBeDefined();
      });

      it("is a function", function() {
        expect(typeof $scope.moveTaskToCategory).toEqual("function");
      });

      it("updates the local board first", function() {
        var called = false;
        spyOn($scope, "moveTaskToCategoryLocally").and.callFake(function() {
          called = true;
        });
        $scope.moveTaskToCategory();
        expect(called).toEqual(true);
      });

      it("calls boardFactory.updateBoard", function() {
        apiCalled = false;
        $scope.moveTaskToCategory($scope.board.categories[0]);
        expect(apiCalled).toEqual(true);
      });


      it("calls $scope.getChangeableCategories() on resolve", function() {
        var called = false;

        spyOn($scope, "getChangeableCategories").and.callFake(function() {
          called = true;
        });


        $scope.moveTaskToCategory($scope.board.categories[0]);
        $scope.$apply(function() {
          defer.resolve();
        });

        expect(called).toEqual(true);
      });
    });


    describe("$scope.toggleIsEditingTitle", function() {
      it("is defined", function() {
        expect($scope.toggleIsEditingTitle).toBeDefined();
      });

      it("is a function", function() {
        expect(typeof $scope.toggleIsEditingTitle).toEqual("function");
      });

      it("toggle isEditingTitle", function() {
        $scope.isEditingTitle = false;
        $scope.toggleIsEditingTitle();
        expect($scope.isEditingTitle).toEqual(true);

        $scope.isEditingTitle = true;
        $scope.toggleIsEditingTitle();
        expect($scope.isEditingTitle).toEqual(false);
      });
    });


    describe("$scope.removeUserFromTask()", function() {
      var defer, apiCalled, apiCallArgs;

      beforeEach(inject(function($q, boardFactory) {
        spyOn(boardFactory, "removeUserFromTask").and.callFake(function() {
          apiCalled = true;
          apiCallArgs = arguments;
          defer = $q.defer();
          return defer.promise;
        });
      }));

      it("is defined", function() {
        expect($scope.removeUserFromTask).toBeDefined();
      });

      it("is a function", function() {
        expect(typeof $scope.removeUserFromTask).toEqual("function");
      });

      it("calls boardFactory.removeUserFromTask", function() {
        apiCalled = false;
        $scope.removeUserFromTask();
        expect(apiCalled).toEqual(true);
      });

      it("calls boardFactory.removeUserFromTask with args [task,user]", function() {
        apiCallArgs = [];
        $scope.task = "task";
        $scope.removeUserFromTask("user");
        expect(apiCallArgs.length).toEqual(2);
        expect(apiCallArgs[0]).toEqual("task");
        expect(apiCallArgs[1]).toEqual("user");
      });

      it("calls $scope.getAddableUsers on resolve", function() {
        var called = false;

        spyOn($scope, "getAddableUsers").and.callFake(function() {
          called = true;
        });

        $scope.removeUserFromTask({});
        $scope.$apply(function() {
          defer.resolve();
        });
        expect(called).toEqual(true);
      });
    });


    describe("$scope.updateTitle", function() {
      it("is defined", function() {
        expect($scope.updateTitle).toBeDefined();
      });

      it("is a function", function() {
        expect(typeof $scope.updateTitle).toEqual("function");
      });

      it("calls boardFactory.updateBoard", inject(function(boardFactory) {
        var called = false;

        spyOn(boardFactory, "updateBoard").and.callFake(function() {
          called = true;
        });

        $scope.updateTitle();
        expect(called).toEqual(true);
      }));
    });


    describe("$scope.board", function() {
      it("is defined", function() {
        expect($scope.board).toBeDefined();
      });

      it("is an object", function() {
        expect(Object.prototype.toString.call($scope.board)).toEqual("[object Object]");
      });

      it("equals the board injected into the controller", function() {
        expect($scope.board).toEqual(board);
      });
    });


    describe("$scope.category", function() {
      it("is defined", function() {
        expect($scope.category).toBeDefined();
      });

      it("is an object", function() {
        expect(Object.prototype.toString.call($scope.category)).toEqual("[object Object]");
      });

      it("is not empty", function() {
        expect(Object.keys($scope.category).length).toBeGreaterThan(0);
      });
    });


    describe("$scope.task", function() {
      it("is defined", function() {
        expect($scope.task).toBeDefined();
      });

      it("is an object", function() {
        expect(Object.prototype.toString.call($scope.task)).toEqual("[object Object]");
      });

      it("is not empty", function() {
        expect(Object.keys($scope.task).length).toBeGreaterThan(0);
      });
    });


    describe("$scope.isEditingTitle", function() {
      it("is defined", function() {
        expect($scope.isEditingTitle).toBeDefined();
      });

      it("is a boolean", function() {
        expect(typeof $scope.isEditingTitle).toEqual("boolean");
      });

      it("is false", function() {
        expect($scope.isEditingTitle).toEqual(false);
      });
    });


    describe("$scope.commentInput", function() {
      it("is defined", function() {
        expect($scope.commentInput).toBeDefined();
      });

      it("is a string", function() {
        expect(typeof $scope.commentInput).toEqual("string");
      });

      it("is empty", function() {
        expect($scope.commentInput).toEqual("");
      });
    });


    describe("$scope.addableUsers", function() {
      it("is defined", function() {
        expect($scope.addableUsers).toBeDefined();
      });

      it("is an array", function() {
        expect(Object.prototype.toString.call($scope.addableUsers)).toEqual("[object Array]");
      });

      it("is empty", function() {
        expect($scope.addableUsers.length).toEqual(1);
      });
    });


    describe("$scope.changeableCategories", function() {
      it("is defined", function() {
        expect($scope.changeableCategories).toBeDefined();
      });

      it("is an array", function() {
        expect(Object.prototype.toString.call($scope.changeableCategories)).toEqual("[object Array]");
      });

      it("is empty", function() {
        expect($scope.changeableCategories.length).toEqual(0);
      });
    });
  });
})();
