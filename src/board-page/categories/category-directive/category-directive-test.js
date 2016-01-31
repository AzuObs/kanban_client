(function() {
	"use strict";

	describe("kbCategory directive", function() {
		var $scope, $compile;

		beforeEach(function() {
			module("categoryDirectiveModule");
			module("html2JsModule");

			inject(function($rootScope, _$compile_) {
				$scope = $rootScope.$new();
				$scope.category = {
					name: "Foobar"
				};
				$compile = _$compile_;
			});
		});

		it("is defined and is not empty", function() {
			var dom;

			$scope.$apply(function() {
				dom = $compile("<kb-category ng-model='category'></kb-category>")($scope);
			});

			expect(dom.html().length).not.toEqual(0);
		});

		it("replaces the dom", function() {
			var dom;

			$scope.$apply(function() {
				dom = $compile("<kb-category ng-model='category'></kb-category>")($scope);
			});

			expect(angular.element(dom).find("kb-category").length).toEqual(0);
		});

		it("throws without an ng-model attribute", function() {
			var dom;
			var fn = function() {
				$scope.$apply(function() {
					dom = $compile("<kb-category></kb-category>")($scope);
				});
			};

			expect(fn).toThrow();
		});

		it("is limited to be an element only", function() {
			var dom;

			$scope.$apply(function() {
				dom = $compile("<kb-category ng-model='category'></kb-category>")($scope);
			});
			expect(dom.html().length).toBeGreaterThan(0);

			$scope.$apply(function() {
				dom = $compile("<div kb-category ng-model='category'></div>")($scope);
			});
			expect(dom.html().length).toEqual(0);
		});

		it("contains a header section", function() {
			var dom;

			$scope.$apply(function() {
				dom = $compile("<kb-category ng-model='category'></kb-category>")($scope);
			});
			expect($(dom).find(".category-header").length).toEqual(1);
		});

		it("contains a close button", function() {
			var dom;

			$scope.$apply(function() {
				dom = $compile("<kb-category ng-model='category'></kb-category>")($scope);
			});

			expect($(dom).find(".close-category").length).toEqual(1);
		});

		it("contains a task view", function() {
			var dom;

			$scope.$apply(function() {
				dom = $compile("<kb-category ng-model='category'></kb-category>")($scope);
			});

			expect($(dom).find(".task-view").length).toEqual(1);
		});
	});


	describe("kbCategoryController", function() {
		var dom, scope;

		beforeEach(function() {
			module("categoryDirectiveModule");
			module("html2JsModule");

			inject(function($rootScope, $compile) {
				var $scope = $rootScope.$new();
				$scope.category = {
					name: "Foobar"
				};
				dom = angular.element("<kb-category ng-model='category'></kb-category>");
				$scope.$apply(function() {
					dom = $compile(dom)($scope);
				});

				scope = dom.isolateScope();
			});
		});


		describe("scope.deleteCategory", function() {
			var apiCalled, apiCallArgs;

			beforeEach(inject(function(boardFactory) {
				spyOn(boardFactory, "deleteCategory").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
				});
			}));

			it("is defined", function() {
				expect(scope.deleteCategory).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof scope.deleteCategory).toEqual("function");
			});

			it("calls boardFactory.deleteCategory", function() {
				apiCalled = false;

				scope.deleteCategory();
				expect(apiCalled).toEqual(true);
			});

			it("calls boardFactory.deleteCategory with params [category]", function() {
				apiCallArgs = [];

				scope.deleteCategory();
				expect(apiCallArgs[0]).toEqual(scope.category);
			});
		});


		describe("scope.categoryName", function() {
			it("is defined", function() {
				expect(scope.categoryName).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof scope.categoryName).toEqual("string");
			});

			it("is equal to $scope.category.name", function() {
				expect(scope.categoryName).toEqual(scope.category.name);
			});
		});


		describe("scope.category", function() {
			it("is defined", function() {
				expect(dom.scope().category).toBeDefined();
			});

			it("is an object", function() {
				expect(Object.prototype.toString.call(dom.scope().category)).toEqual("[object Object]");
			});
		});
	});
})();
