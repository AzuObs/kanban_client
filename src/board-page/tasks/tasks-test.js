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


		describe("$scope.createTask()", function() {
			var apiCalled, apiCallArgs, defer;

			beforeEach(inject(function($q, boardFactory) {
				spyOn(boardFactory, "createTask").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;

					defer = $q.defer();
					return defer.promise;
				});
			}));

			it("is defined", function() {
				expect($scope.createTask).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.createTask).toEqual("function");
			});

			it("calls boardFactory.createTask on keypress enter", function() {
				apiCalled = false;
				var e = {
					type: "keypress",
					which: 13
				};

				$scope.createTask("category", e);
				expect(apiCalled).toEqual(true);
			});

			it("calls boardFactory.createTask with args [category, taskname]", function() {
				apiCallArgs = [];
				var e = {
					type: "keypress",
					which: 13
				};
				$scope.taskName = "task name";

				$scope.createTask("category", e);
				expect(apiCallArgs.length).toEqual(2);
				expect(apiCallArgs[0]).toEqual("category");
				expect(apiCallArgs[1]).toEqual("task name");
			});

			it("calls $scope.resetTaskName on resolve", function() {
				var e, called;

				e = {
					type: "keypress",
					which: 13
				};

				spyOn($scope, "resetTaskName").and.callFake(function() {
					called = true;
				});

				called = false;
				$scope.createTask("category", e);
				$scope.$apply(function() {
					defer.resolve();
				});

				expect(called).toEqual(true);
			});
		});


		describe("$scope.openTaskModal()", function() {
			var apiCalled;

			beforeEach(inject(function($modal) {
				spyOn($modal, "open").and.callFake(function() {
					apiCalled = true;
				});
			}));

			it("is defined", function() {
				expect($scope.openTaskModal).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.openTaskModal).toEqual("function");
			});

			it("doesn't call $modal.open if the element clicked has class .glyphicon-remove",
				inject(function($modal) {
					var e = {
						target: angular.element("<div class='glyphicon-remove'></div>")
					};

					apiCalled = false;
					$scope.openTaskModal(e);

					expect(apiCalled).toEqual(false);
				}));

			it("calls $modal.open", inject(function($modal) {
				var e = {
					target: angular.element("<div></div>")
				};

				apiCalled = false;
				$scope.openTaskModal(e);

				expect(apiCalled).toEqual(true);
			}));
		});


		describe("$scope.taskSortOpts", function() {
			it("is defined", function() {
				expect($scope.taskSortOpts).toBeDefined();
			});

			it("is an object", function() {
				expect(Object.prototype.toString.call($scope.taskSortOpts)).toEqual("[object Object]");
			});

			it("equals an instance of TaskSortOpts", inject(function(TaskSortOpts) {
				expect($scope.taskSortOpts.keys).toEqual(new TaskSortOpts().keys);
			}));
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
