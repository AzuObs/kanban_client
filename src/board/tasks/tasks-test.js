(function() {
	"use strict";

	describe("taskCtrl", function() {
		var $scope;

		beforeEach(function() {
			module("taskModule");

			inject(function($rootScope, $controller) {
				$scope = $rootScope.$new();

				$controller("taskCtrl", {
					$scope: $scope
				});
			});
		});

		describe("$scope.resetTaskName()", function() {
			it("is defined", function() {
				expect($scope.resetTaskName).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.resetTaskName).toEqual("function");
			});

			it("resets the task name input", function() {
				$scope.taskName = "foo";

				$scope.resetTaskName();
				expect($scope.taskName).toEqual("");
			});
		});


		describe("$scope.addTask()", function() {
			it("is defined", function() {
				expect($scope.addTask).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.addTask).toEqual("function");
			});

			it("checks for invalid input", inject(function($log) {
				$log.reset();
				$scope.addTask();
				expect($log.error.logs[0][0]).toBeDefined();

				$log.reset();
				$scope.addTask("foo");
				expect($log.error.logs[0][0]).toBeDefined();
			}));

			it("adds a task to the board", function() {
				var category = {
					tasks: []
				};

				$scope.addTask(category, "foo");
				expect(category.tasks.length).toEqual(1);
			});
		});


		describe("$scope.createTask()", function() {
			beforeEach(function() {
				$scope.board = {
					_id: 123,
					categories: {
						_id: 123,
						tasks: []
					}
				};
			});

			it("is defined", function() {
				expect($scope.createTask).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.createTask).toEqual("function");
			});

			it("checks for invalid input", inject(function($log) {
				var e;

				$log.reset();
				$scope.createTask();
				expect($log.error.logs[0][0]).toBeDefined();

				$log.reset();
				$scope.createTask($scope.board.categories);
				expect($log.error.logs[0][0]).toBeDefined();

				$log.reset();
				e = {
					type: "click"
				};
				$scope.createTask($scope.board.categories, e);
				expect($log.error.logs[0][0]).toBeDefined();
			}));

			it("it resets taskName on keypress enter", function() {
				var called, e;

				spyOn($scope, "resetTaskName").and.callFake(function() {
					called = true;
				});

				called = false;
				e = {
					type: "keypress",
					which: 13
				};
				$scope.createTask($scope.board.categories, e);
				expect(called).toEqual(true);
			});

			it("it adds task to server on keypress enter", inject(function(serverAPI, $q) {
				var called, e;

				spyOn(serverAPI, "createTask").and.callFake(function() {
					called = true;
					return $q.defer().promise;
				});

				called = false;
				e = {
					type: "keypress",
					which: 13
				};
				$scope.createTask($scope.board.categories, e);
				expect(called).toEqual(true);
			}));

			it("it adds task locally on resolve", inject(function(serverAPI, $q) {
				var task, addTaskArg, e, defer;

				spyOn(serverAPI, "createTask").and.callFake(function() {
					defer = $q.defer();
					return defer.promise;
				});

				spyOn($scope, "addTask").and.callFake(function() {
					addTaskArg = arguments[1];
				});

				e = {
					type: "keypress",
					which: 13
				};
				$scope.createTask($scope.board.categories, e);
				task = "foo";
				$scope.$apply(function() {
					defer.resolve(task);
				});
				expect(addTaskArg).toEqual(task);
			}));

			it("logs an error on reject", inject(function(serverAPI, $q, $log) {
				var e, defer, msg;

				spyOn(serverAPI, "createTask").and.callFake(function() {
					defer = $q.defer();
					return defer.promise;
				});

				e = {
					type: "keypress",
					which: 13
				};
				$scope.createTask($scope.board.categories, e);
				msg = "error";
				$scope.$apply(function() {
					defer.reject(msg);
				});
				expect($log.error.logs[0][0]).toEqual(msg);
			}));
		});


		describe("$scope.openTaskModal()", function() {
			it("is defined", function() {
				expect($scope.openTaskModal).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.openTaskModal).toEqual("function");
			});

			it("doesn't open a modal if no event or no mouse click event is received", inject(function($modal) {
				var modalCalled, e;

				spyOn($modal, "open").and.callFake(function() {
					modalCalled = true;
				});

				modalCalled = false;
				$scope.openTaskModal();
				expect(modalCalled).toEqual(false);

				modalCalled = false;
				e = {
					type: "keypress"
				};
				$scope.openTaskModal(e);
				expect(modalCalled).toEqual(false);
			}));

			it("doesn't open a modal if user wants to delete task", inject(function($modal) {
				var modalCalled, e;

				spyOn($modal, "open").and.callFake(function() {
					modalCalled = true;
				});

				modalCalled = false;
				e = {
					type: "click",
					target: angular.element("<div class='glyphicon-remove'></div>")
				};

				$scope.openTaskModal(e);
				expect(modalCalled).toEqual(false);
			}));

			it("opens a modal", inject(function($modal) {
				var modalCalled, e;

				modalCalled = false;
				spyOn($modal, "open").and.callFake(function() {
					modalCalled = true;
				});

				modalCalled = false;
				e = {
					type: "click",
					target: angular.element("<div class='foobar'></div>")
				};

				$scope.openTaskModal(e);
				expect(modalCalled).toEqual(true);
			}));
		});


		describe("$scope.taskSortOpts", function() {
			it("is defined", function() {
				expect($scope.taskSortOpts).toBeDefined();
			});

			it("is an object", function() {
				expect(Object.prototype.toString.call($scope.taskSortOpts)).toEqual("[object Object]");
			});

			it("is not empty", function() {
				expect(Object.keys($scope.taskSortOpts).length).toBeGreaterThan(0);
			});
		});


		describe("$scope.taskName", function() {
			it("is defined", function() {
				expect($scope.taskName).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof $scope.taskName).toEqual("string");
			});

			it("is empty", function() {
				expect($scope.taskName.length).toEqual(0);
			});
		});
	});
})();
