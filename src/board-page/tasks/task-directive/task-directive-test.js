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
				$scope.task = {
					comments: ["foo"]
				};
				$scope.$apply(function() {
					dom = $compile("<kb-task ng-model='task'></kb-task>")($scope);
				});

				expect(angular.element(dom).find(".glyphicon-comment").length).toEqual(1);
			});
		});


		describe("kbTaskCtrl", function() {
			var dom, scope;

			beforeEach(inject(function($rootScope, $compile, boardFactory) {
				var $scope = $rootScope.$new();
				$scope.task = {
					name: "foobar task",
					users: [{
						_id: "foobar"
					}],
					comments: [1]
				};
				$scope.category = {
					name: "foobar category",
					tasks: [$scope.task]
				};

				spyOn(boardFactory, "getBoardSync").and.callFake(function() {
					return {
						name: "foobar"
					};
				});

				dom = "<kb-task ng-model='task' category-model='category'></kb-task>";
				$scope.$apply(function() {
					dom = $compile(dom)($scope);
				});

				scope = dom.isolateScope();
			}));


			describe("scope.deleteTask", function() {
				var apiCalled, apiCallArgs;

				beforeEach(inject(function(boardFactory) {
					spyOn(boardFactory, "deleteTask").and.callFake(function() {
						apiCalled = true;
						apiCallArgs = arguments;
					});
				}));

				it("is defined", function() {
					expect(scope.deleteTask).toBeDefined();
				});

				it("is a function", function() {
					expect(typeof scope.deleteTask).toEqual("function");
				});

				it("calls boardFactory.deleteTask", function() {
					apiCalled = false;
					scope.deleteTask();
					expect(apiCalled).toEqual(true);
				});

				it("calls boardFactory.deleteTask with args [category, task]", function() {
					apiCallArgs = [];
					scope.deleteTask();
					expect(apiCallArgs.length).toEqual(2);
					expect(apiCallArgs[0].name).toEqual("foobar category");
					expect(apiCallArgs[1].name).toEqual("foobar task");
				});
			});


			describe("scope.board", function() {
				it("is defined", function() {
					expect(scope.board).toBeDefined();
				});

				it("is an object", function() {
					expect(Object.prototype.toString.call(scope.board)).toEqual("[object Object]");
				});

				it("is equal to boardFactory.getBoardSync()", inject(function(boardFactory) {
					expect(scope.board).toEqual(boardFactory.getBoardSync());
				}));
			});


			describe("scope.userSortOpts", function() {
				it("is defined", function() {
					expect(scope.userSortOpts).toBeDefined();
				});

				it("is an object", function() {
					expect(Object.prototype.toString.call(scope.userSortOpts)).toEqual("[object Object]");
				});

				it("is equal to a new UserSortOpts()", inject(function(UserSortOpts) {
					expect(scope.userSortOpts.keys).toEqual(new UserSortOpts().keys);
				}));
			});

			describe("scope.showUserList", function() {
				it("is defined", function() {
					expect(scope.showUserList).toBeDefined();
				});

				it("is a boolean", function() {
					expect(Object.prototype.toString.call(scope.showUserList)).toEqual("[object Object]");
				});

				it("is equal to a scope.userSortOpts.showUserList", inject(function(UserSortOpts) {
					expect(scope.showUserList).toEqual(scope.userSortOpts.getShowUserLists());
				}));
			});
		});
	});
})();
