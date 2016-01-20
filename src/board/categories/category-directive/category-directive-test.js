(function() {
	"use strict";

	describe("kbCategory directive", function() {
		var $scope, $compile;

		beforeEach(function() {
			module("categoryDirectiveModule");
			module("html2JsModule");

			inject(function($rootScope, _$compile_) {
				$scope = $rootScope.$new();
				$compile = _$compile_;
			});
		});

		it("is defined and is not empty", function() {
			var dom;

			$scope.$apply(function() {
				dom = $compile("<kb-category></kb-category>")($scope);
			});

			expect(dom.html().length).not.toEqual(0);
		});

		it("replaces the dom", function() {
			var dom;

			$scope.$apply(function() {
				dom = $compile("<kb-category></kb-category>")($scope);
			});

			expect(angular.element(dom).find("kb-category").length).toEqual(0);
		});

		it("is limited to be an element only", function() {
			var dom;

			$scope.$apply(function() {
				dom = $compile("<kb-category></kb-category>")($scope);
			});
			expect(dom.html().length).toBeGreaterThan(0);

			$scope.$apply(function() {
				dom = $compile("<div kb-category></div>")($scope);
			});
			expect(dom.html().length).toEqual(0);
		});

		it("contains a header section", function() {
			var dom;

			$scope.$apply(function() {
				dom = $compile("<kb-category></kb-category>")($scope);
			});

			expect(dom.find(".category-header").length).toEqual(1);
		});

		it("contains a close button", function() {
			var dom;

			$scope.$apply(function() {
				dom = $compile("<kb-category></kb-category>")($scope);
			});

			expect(dom.find("button.close-category").length).toEqual(1);
		});

		it("contains a task view", function() {
			var dom;

			$scope.$apply(function() {
				dom = $compile("<kb-category></kb-category>")($scope);
			});

			expect(dom.find(".task-view").length).toEqual(1);
		});
	});

	describe("kbCategoryController", function() {
		var $scope;

		beforeEach(function() {
			module("categoryDirectiveModule");
			inject(function($controller, $rootScope) {
				$scope = $rootScope.$new();
				$scope.board = {
					_id: 123
				};

				$controller("kbCategoryController", {
					$scope: $scope
				});
			});
		});

		describe("$scope.deleteCategoryLocally", function() {
			it("is defined", function() {
				expect($scope.deleteCategoryLocally).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.deleteCategoryLocally).toEqual("function");
			});

			it("deletes a category locally", function() {
				$scope.board.categories = [{
					_id: 123
				}];
				$scope.deleteCategoryLocally(123);

				expect($scope.board.categories.length).toEqual(0);
			});
		});

		describe("$scope.deleteCategory", function() {
			var apiCalled, defer;

			beforeEach(inject(function(serverAPI, $q) {
				apiCalled = false;
				spyOn(serverAPI, "deleteCategory").and.callFake(function() {
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
				spyOn($scope, "deleteCategoryLocally").and.callFake(function() {
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
	});
})();
