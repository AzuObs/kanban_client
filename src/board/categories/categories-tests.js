(function() {
	"use strict";

	describe("categoryCtrl", function() {
		var $scope;

		beforeEach(module("categoryModule"));
		beforeEach(inject(function($rootScope, $controller) {
			$scope = $rootScope.$new();
			$controller("categoryCtrl", {
				$scope: $scope
			});
			$scope.board = {
				_id: 123
			};
		}));


		describe("$scope.categorySortOpts", function() {
			it("is defined", function() {
				expect($scope.categorySortOpts).toBeDefined();
			});

			it("is an object", function() {
				expect(Object.prototype.toString.call($scope.categorySortOpts)).toEqual("[object Object]");
			});

			it("is not empty", function() {
				expect(Object.keys($scope.categorySortOpts).length).toBeGreaterThan(0);
			});

		});


		describe("$scope.deleteLocalCategory", function() {
			it("is defined", function() {
				expect($scope.deleteLocalCategory).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.deleteLocalCategory).toEqual("function");
			});

			it("deletes a category locally", function() {
				$scope.board.categories = [{
					_id: 123
				}];
				$scope.deleteLocalCategory(123);

				expect($scope.board.categories.length).toEqual(0);
			});
		});


		describe("$scope.deleteCategory", function() {
			var apiCalled, defer;

			beforeEach(inject(function(boardAPI, $q) {
				apiCalled = false;
				spyOn(boardAPI, "deleteCategory").and.callFake(function() {
					apiCalled = true;
					defer = $q.defer();
					return defer.promise;
				});
			}));

			it("is defined", function() {
				expect($scope.deleteCategory).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.deleteCategory).toEqual("function");
			});

			it("makes a call to delete a category on the server", function() {
				$scope.deleteCategory();
				expect(apiCalled).toEqual(true);
			});

			it("deletes the category locally on resolve", function() {
				var localDeleteCalled = false;
				spyOn($scope, "deleteLocalCategory").and.callFake(function() {
					localDeleteCalled = true;
				});

				$scope.deleteCategory();
				$scope.$apply(function() {
					defer.resolve();
				});
				expect(localDeleteCalled).toEqual(true);
			});

			it("logs an error on reject", inject(function($log) {
				var msg = "error";

				$scope.deleteCategory();
				$log.reset();
				$scope.$apply(function() {
					defer.reject(msg);
				});

				expect($log.error.logs[0][0]).toEqual(msg);
			}));
		});


		describe("$scope.createCategory", function() {
			var apiCalled, defer;

			beforeEach(inject(function(boardAPI, $q) {
				apiCalled = false;
				spyOn(boardAPI, "createCategory").and.callFake(function() {
					apiCalled = true;
					defer = $q.defer();
					return defer.promise;
				});
			}));

			it("is defined", function() {
				expect($scope.newCat).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.createCategory).toEqual("function");
			});

			it("resets the new category name input", function() {
				$scope.newCat = "foo";
				$scope.createCategory();
				expect($scope.newCat).toEqual("");
			});

			it("makes a call to create a category on the server", function() {
				$scope.createCategory();
				expect(apiCalled).toEqual(true);
			});

			it("creates the category locally on resolve", function() {
				var category = "foo";
				$scope.board.categories = [];

				$scope.createCategory();
				$scope.$apply(function() {
					defer.resolve(category);
				});

				expect($scope.board.categories[0]).toEqual(category);
			});

			it("logs an error on reject", inject(function($log) {
				var msg = "error";

				$scope.createCategory();
				$log.reset();
				$scope.$apply(function() {
					defer.reject(msg);
				});

				expect($log.error.logs[0][0]).toEqual(msg);
			}));
		});


		describe("$scope.newCat", function() {
			it("is defined", function() {
				expect($scope.newCat).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof $scope.newCat).toEqual("string");
			});

			it("is an empty string", function() {
				expect($scope.newCat).toEqual("");
			});
		});

	});
})();
