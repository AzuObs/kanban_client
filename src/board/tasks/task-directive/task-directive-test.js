(function() {
	"use strict";


	describe("taskDirectiveModule", function() {
		beforeEach(function() {
			module("taskDirectiveModule");
			module("html2JsModule");
		});


		describe("kbTask directive", function() {
			var $compile, $scope;

			beforeEach(inject(function(_$compile_, $rootScope) {
				$scope = $rootScope.$new();
				$compile = _$compile_;
			}));

			it("is defined and isn't empty", function() {
				var dom;

				$scope.$apply(function() {
					dom = $compile("<div><kb-task></kb-task></div>")($scope);
				});

				expect(dom.html()).not.toEqual("<kb-task></kb-task>");
			});

			it("is restrict to be an element", function() {
				var dom;

				$scope.$apply(function() {
					dom = $compile("<span><div kb-task=''></div></span>")($scope);
				});
				expect(dom.html()).toEqual("<div kb-task=\"\"></div>");

				$scope.$apply(function() {
					dom = $compile("<kb-task></kb-task>")($scope);
				});
				expect(dom.html()).not.toEqual("<span><kb-task></kb-task></span>");
			});

			it("doesn't translude the DOM", function() {
				var dom;

				$scope.$apply(function() {
					dom = $compile("<kb-task>foobar</kb-task>")($scope);
				});

				expect(dom.text().search("foobar")).toEqual(-1);
			});

			it("replaces the DOM", function() {
				var dom;

				$scope.$apply(function() {
					dom = $compile("<div><kb-task></kb-task></div>")($scope);
				});

				expect(dom.find("kb-task").length).toEqual(0);
			});

			it("contains a close button", function() {
				var dom;

				$scope.$apply(function() {
					dom = $compile("<kb-task></kb-task>")($scope);
				});

				expect(angular.element(dom).find(".close-task").length).toEqual(1);
			});

			it("contains a user list", function() {
				var dom;

				$scope.$apply(function() {
					dom = $compile("<kb-task></kb-task>")($scope);
				});

				expect(angular.element(dom).find(".user-list-container").length).toEqual(1);
			});

			it("contains a comments icon", function() {
				var dom;

				$scope.$apply(function() {
					dom = $compile("<kb-task></kb-task>")($scope);
				});

				expect(angular.element(dom).find(".glyphicon-comment").length).toEqual(1);
			});
		});


		describe("kbTaskCtrl", function() {
			var $scope, defer, apiCalled;

			beforeEach(inject(function($rootScope, $controller, $q, boardAPI) {
				$scope = $rootScope.$new();
				$scope.board = {
					_id: "foo"
				};

				$controller("kbTaskCtrl", {
					$scope: $scope
				});

				spyOn(boardAPI, "deleteTask").and.callFake(function() {
					apiCalled = true;
					defer = $q.defer();
					return defer.promise;
				});
				apiCalled = false;
			}));

			describe("$scope.deleteTask", function() {
				it("is defined", function() {
					expect($scope.deleteTask).toBeDefined();
				});

				it("is a function", function() {
					expect(typeof $scope.deleteTask).toEqual("function");
				});

				it("calls delete task on the server", function() {
					$scope.deleteTask({
						_id: "foo"
					});
					expect(apiCalled).toEqual(true);
				});

				it("removes task locally on resolve", function() {
					var category = {
						tasks: [{
							_id: 123
						}, {
							_id: 234
						}]
					};

					$scope.deleteTask(category, category.tasks[0]._id);
					$scope.$apply(function() {
						defer.resolve();
					});

					expect(category.tasks[0]._id).toEqual(234);
				});

				it("logs an error on reject", inject(function($log) {
					var msg = "error";

					$scope.deleteTask({
						_id: "foo"
					});
					$log.reset();
					$scope.$apply(function() {
						defer.reject(msg);
					});

					expect($log.error.logs[0][0]).toEqual(msg);
				}));
			});
		});
	});
})();
