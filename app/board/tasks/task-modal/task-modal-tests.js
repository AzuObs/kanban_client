(function() {
	"use strict";

	describe("taskModalCtrl", function() {
		var $scope, $modalInstance;

		beforeEach(function() {
			module("taskModalModule");

			inject(function($rootScope, $controller, $modal) {
				$modalInstance = $modal.open({
					template: "<h1></h1>"
				});

				$scope = $rootScope.$new();
				$scope.board = {
					_id: 123,
					categories: [{
						_id: 456,
						tasks: [{
							_id: 789,
							name: "foo",
							users: [{
								_id: 123
							}],
							comments: []
						}]
					}]
				};
				$scope.users = [{
					_id: 123
				}];

				$controller("taskModalCtrl", {
					$scope: $scope,
					$modalInstance: $modalInstance,
					catId: $scope.board.categories[0]._id,
					taskId: $scope.board.categories[0].tasks[0]._id
				});
			});
		});

		///
		// TESTS BEGIN HERE 
		///

		describe("$scope.getAddableUsers()", function() {
			it("is defined", function() {
				expect($scope.getAddableUsers).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.getAddableUsers).toEqual("function");
			});

			it("gets the users that can be added to the task", function() {
				var users = [{
					_id: "bar"
				}, {
					_id: "foo"
				}];
				$scope.users = (users);

				$scope.getAddableUsers();
				expect($scope.addableUsers).toEqual(users);
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

			it("checks for invalid input", function() {
				expect($scope.ageOfPost()).toEqual("no timestamp");
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
			var defer, apiCalled;
			beforeEach(inject(function($q, boardAPI) {
				$scope.user = {
					username: "foo",
					pictureUrl: "foo"
				};
				spyOn(boardAPI, "createComment").and.callFake(function() {
					apiCalled = true;
					defer = $q.defer();
					return defer.promise;
				});

				apiCalled = false;
			}));

			it("is defined", function() {
				expect($scope.createComment).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.createComment).toEqual("function");
			});

			it("makes a server call to create comment", function() {
				$scope.createComment();
				expect(apiCalled).toEqual(true);
			});

			it("unshifts comment on resolve", function() {
				var comment = "foo";
				$scope.task.comments = ["bar"];
				$scope.createComment();
				$scope.$apply(function() {
					defer.resolve(comment);
				});

				expect($scope.task.comments.length).toEqual(2);
				expect($scope.task.comments[0]).toEqual(comment);
			});

			it("logs an error on reject", inject(function($log) {
				var msg = "error";

				$scope.createComment();
				$log.reset();
				$scope.$apply(function() {
					defer.reject(msg);
				});

				expect($log.error.logs[0][0]).toEqual(msg);
			}));
		});


		describe("$scope.editTaskName()", function() {
			var defer, apiCalled;

			beforeEach(inject(function(boardAPI, $q) {
				apiCalled = false;

				spyOn(boardAPI, "updateBoard").and.callFake(function() {
					apiCalled = true;
					defer = $q.defer();
					return defer.promise;
				});
			}));

			it("is defined", function() {
				expect($scope.editTaskName).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.editTaskName).toEqual("function");
			});

			it("checks for valid event input", function() {
				var e;

				e = {
					type: "click"
				};
				$scope.isEditingTaskName = false;
				$scope.editTaskName(e);
				expect($scope.isEditingTaskName).toEqual(true);

				e = {
					type: "keypress",
					which: 13
				};
				$scope.isEditingTaskName = false;
				$scope.editTaskName(e);
				expect($scope.isEditingTaskName).toEqual(true);
			});

			it("starts editing if editing wasn't already happening", function() {
				var e;

				e = {
					type: "click"
				};
				$scope.isEditingTaskName = false;
				$scope.editTaskName(e);
				expect($scope.isEditingTaskName).toEqual(true);
			});

			it("ends editing and updates the board on the server", function() {
				var e;

				e = {
					type: "click"
				};
				$scope.isEditingTaskName = true;
				$scope.editTaskName(e);
				expect($scope.isEditingTaskName).toEqual(false);
				expect(apiCalled).toEqual(true);
			});

			it("increments board version on resolve", function() {
				var e;

				e = {
					type: "click"
				};
				$scope.isEditingTaskName = true;
				$scope.board._v = 0;
				$scope.editTaskName(e);
				$scope.$apply(function() {
					defer.resolve();
				});

				expect($scope.board._v).toEqual(1);
			});

			it("logs an error on reject", inject(function($log) {
				var e, msg;

				msg = "error";
				e = {
					type: "click"
				};
				$scope.isEditingTaskName = true;
				$scope.board._v = 0;
				$scope.editTaskName(e);
				$log.reset();
				$scope.$apply(function() {
					defer.reject(msg);
				});

				expect($log.error.logs[0][0]).toEqual(msg);
			}));
		});


		describe("$scope.stopDeletingTask()", function() {
			it("is defined", function() {
				expect($scope.stopDeletingTask).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.stopDeletingTask).toEqual("function");
			});

			it("stops deleting the task", function() {
				$scope.isDeletingTask = true;
				$scope.repeatTaskName = "foo";

				$scope.stopDeletingTask();

				expect($scope.isDeletingTask).toEqual(false);
				expect($scope.repeatTaskName).toEqual("");
			});
		});


		describe("$scope.stopEditingTaskName()", function() {
			it("is defined", function() {
				expect($scope.stopEditingTaskName).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.stopEditingTaskName).toEqual("function");
			});

			it("stops deleting the task", function() {
				var e = {
					type: "click",
					target: angular.element("<div></div>")
				};
				$scope.isEditingTaskName = true;
				$scope.stopEditingTaskName(e);

				expect($scope.isEditingTaskName).toEqual(false);
			});
		});

		describe("$scope.endAllEditing()", function() {
			it("is defined", function() {
				expect($scope.endAllEditing).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.endAllEditing).toEqual("function");
			});

			it("logs an error if invalid arguments are passed", inject(function($log) {
				var e = {
					type: "keypress"
				};

				$log.reset();
				$scope.endAllEditing();
				expect($log.error.logs[0][0]).toBeDefined();

				$log.reset();
				$scope.endAllEditing(e);
				expect($log.error.logs[0][0]).toBeDefined();
			}));

			it("stops editing task name", function() {
				var e, called;

				e = {
					type: "click",
					target: angular.element("<div></div>")
				};
				called = false;
				$scope.isEditingTaskName = true;
				spyOn($scope, "stopEditingTaskName").and.callFake(function() {
					called = true;
				});

				$scope.endAllEditing(e);
				expect(called).toEqual(true);
			});

			it("stops deleting", function() {
				var e, called;

				e = {
					type: "click",
					target: angular.element("<div></div>")
				};
				called = false;
				$scope.isDeletingTask = true;
				spyOn($scope, "stopDeletingTask").and.callFake(function() {
					called = true;
				});

				$scope.endAllEditing(e);
				expect(called).toEqual(true);
			});
		});


		describe("$scope.deleteTask()", function() {
			var defer, apiCalled;

			beforeEach(inject(function($q, boardAPI) {
				spyOn(boardAPI, "updateBoard").and.callFake(function() {
					apiCalled = true;
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

			it("toggles isDeleting when clicked", function() {
				$scope.isDeletingTask = false;

				var e = {
					type: "click",
					target: undefined
				};

				$scope.deleteTask(e);
				expect($scope.isDeletingTask).toEqual(true);
			});

			it("deletes task locally if repeat-input is equal to task and and keypress is equal to enter", function() {
				var e = {
					type: "keypress",
					which: 13
				};
				$scope.repeatTaskName = $scope.task.name;

				expect($scope.category.tasks.length).toEqual(1);
				$scope.deleteTask(e);
				expect($scope.category.tasks.length).toEqual(0);
			});

			it("deletes task on server", function() {
				var e = {
					type: "keypress",
					which: 13
				};
				$scope.repeatTaskName = $scope.task.name;

				$scope.deleteTask(e);
				expect(apiCalled).toEqual(true);
			});

			it("increments board version on resolve", function() {
				var e = {
					type: "keypress",
					which: 13
				};
				$scope.board._v = 0;
				$scope.repeatTaskName = $scope.task.name;

				$scope.deleteTask(e);
				$scope.$apply(function() {
					defer.resolve();
				});

				expect($scope.board._v).toEqual(1);
			});

			it("closes modal on resolve", function() {
				var e, called;

				e = {
					type: "keypress",
					which: 13
				};
				spyOn($scope, "closeModal").and.callFake(function() {
					called = true;
				});
				called = false;
				$scope.repeatTaskName = $scope.task.name;

				$scope.deleteTask(e);
				$scope.$apply(function() {
					defer.resolve();
				});

				expect(called).toEqual(true);
			});

			it("logs error on reject", inject(function($log) {
				var e, msg;

				e = {
					type: "keypress",
					which: 13
				};
				msg = "error";
				$scope.repeatTaskName = $scope.task.name;

				$scope.deleteTask(e);
				$scope.$apply(function() {
					defer.reject(msg);
				});
				expect($log.error.logs[0][0]).toEqual(msg);
			}));
		});


		describe("$scope.closeModal()", function() {
			it("is defined", function() {
				expect($scope.closeModal).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.closeModal).toEqual("function");
			});

			it("closes the modal", function() {
				var called = false;
				spyOn($modalInstance, "dismiss").and.callFake(function() {
					called = true;
				});
				$scope.closeModal();

				expect(called).toEqual(true);
			});
		});


		describe("$scope.addUserToTask", function() {
			var defer, apiCalled;

			beforeEach(inject(function($q, boardAPI) {
				apiCalled = false;
				spyOn(boardAPI, "updateBoard").and.callFake(function() {
					apiCalled = true;
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

			it("adds a user to the task", function() {
				expect($scope.task.users.length).toEqual(1);
				$scope.addUserToTask();
				expect($scope.task.users.length).toEqual(2);
			});

			it("updates the server's board model", function() {
				$scope.addUserToTask();
				expect(apiCalled).toEqual(true);
			});

			it("increments board on resolve", function() {
				$scope.board._v = 0;
				$scope.addUserToTask();
				$scope.$apply(function() {
					defer.resolve();
				});
				expect($scope.board._v).toEqual(1);
			});

			it("logs an error on reject", inject(function($log) {
				var msg = "error";

				$scope.addUserToTask();
				$log.reset();
				$scope.$apply(function() {
					defer.reject(msg);
				});

				expect($log.error.logs[0][0]).toEqual(msg);
			}));
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

			beforeEach(inject(function(boardAPI, $q) {
				apiCalled = false;
				spyOn(boardAPI, "updateBoard").and.callFake(function() {
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

			it("updates the server board", function() {
				$scope.moveTaskToCategory($scope.board.categories[0]);
				expect(apiCalled).toEqual(true);
			});

			it("increment board version on api resolve", function() {
				$scope.board._v = 0;
				$scope.moveTaskToCategory($scope.board.categories[0]);
				$scope.$apply(function() {
					defer.resolve();
				});
				expect($scope.board._v).toEqual(1);
			});

			it("logs an error on api reject", inject(function($log) {
				var msg = "error";
				$scope.moveTaskToCategory($scope.board.categories[0]);
				$log.reset();
				$scope.$apply(function() {
					defer.reject(msg);
				});
				expect($log.error.logs[0][0]).toEqual(msg);
			}));
		});


		describe("$scope.removeUserFromTask()", function() {
			var defer, boardApiCalled;

			beforeEach(inject(function($q, boardAPI) {
				boardApiCalled = false;

				spyOn(boardAPI, "updateBoard").and.callFake(function() {
					defer = $q.defer();
					boardApiCalled = true;
					return defer.promise;
				});
			}));

			it("is defined", function() {
				expect($scope.removeUserFromTask).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.removeUserFromTask).toEqual("function");
			});

			it("updates the local version of the board", function() {
				var called = false;
				spyOn($scope, "removeUserFromLocalTask").and.callFake(function() {
					called = true;
				});

				$scope.removeUserFromTask("foo");
				expect(called).toEqual(true);
			});

			it("updates the server version of the board", function() {
				$scope.removeUserFromTask("foo");
				expect(boardApiCalled).toEqual(true);
			});

			it("increments local board verson on resolve", function() {
				$scope.board._v = 0;
				$scope.removeUserFromTask("foo");
				$scope.$apply(function() {
					defer.resolve();
				});

				expect($scope.board._v).toEqual(1);
			});

			it("updates the possible users that can be added to the task on resolve", function() {
				expect($scope.task.users.length).toEqual(1);

				var user = {
					_id: 123
				};
				$scope.removeUserFromTask(user);
				$scope.$apply(function() {
					defer.resolve();
				});
				expect($scope.task.users.length).toEqual(0);
			});

			it("logs an error on reject", inject(function($log) {
				var msg = "error";

				$scope.removeUserFromTask("foo");
				$scope.$apply(function() {
					defer.reject(msg);
				});
				expect($log.error.logs[0][0]).toEqual(msg);
			}));
		});


		describe("$scope.removeUserFromLocalTask", function() {
			it("is defined", function() {
				expect($scope.removeUserFromLocalTask).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.removeUserFromLocalTask).toEqual("function");
			});

			it("removes a user from the task", function() {
				var user = {
					_id: 123
				};

				expect($scope.task.users.length).toEqual(1);
				expect($scope.task.users[0]._id).toEqual(123);

				$scope.removeUserFromLocalTask(user);
				expect($scope.task.users.length).toEqual(0);
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


		describe("$scope.categoryIndex", function() {
			it("is defined", function() {
				expect($scope.categoryIndex).toBeDefined();
			});

			it("is an object", function() {
				expect(typeof($scope.categoryIndex)).toEqual("number");
			});

			it("is equal to the index of $scope.category in $scope.board.categories", function() {
				expect($scope.categoryIndex).toEqual(0);
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


		describe("$scope.taskIndex", function() {
			it("is defined", function() {
				expect($scope.taskIndex).toBeDefined();
			});

			it("is an object", function() {
				expect(typeof($scope.taskIndex)).toEqual("number");
			});

			it("is equal to the index of $scope.task in $scope.board.categories.task", function() {
				expect($scope.taskIndex).toEqual(0);
			});
		});

		describe("$scope.isEditingTaskName", function() {
			it("is defined", function() {
				expect($scope.isEditingTaskName).toBeDefined();
			});

			it("is a boolean", function() {
				expect(typeof $scope.isEditingTaskName).toEqual("boolean");
			});

			it("is false", function() {
				expect($scope.isEditingTaskName).toEqual(false);
			});
		});


		describe("$scope.isDeletingTask", function() {
			it("is defined", function() {
				expect($scope.isDeletingTask).toBeDefined();
			});

			it("is a boolean", function() {
				expect(typeof $scope.isDeletingTask).toEqual("boolean");
			});

			it("is false", function() {
				expect($scope.isDeletingTask).toEqual(false);
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


		describe("$scope.repeatTaskName", function() {
			it("is defined", function() {
				expect($scope.repeatTaskName).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof $scope.repeatTaskName).toEqual("string");
			});

			it("is empty", function() {
				expect($scope.repeatTaskName).toEqual("");
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
				expect($scope.addableUsers.length).toEqual(0);
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
