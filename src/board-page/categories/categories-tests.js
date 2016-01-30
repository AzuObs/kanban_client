(function() {
	"use strict";


	describe("categoryCtrl", function() {
		var $scope, defer, board = {
			name: "foobar"
		};

		beforeEach(function() {
			module("categoryModule");
			inject(function($rootScope, $controller) {
				$scope = $rootScope.$new();
				$controller("categoryCtrl", {
					$scope: $scope
				});
			});
		});


		describe("$scope.categorySortOpts", function() {
			it("is defined", function() {
				expect($scope.categorySortOpts).toBeDefined();
			});

			it("is an object", function() {
				expect(Object.prototype.toString.call($scope.categorySortOpts)).toEqual("[object Object]");
			});

			it("is equal to an instance of CategorySortOpts", inject(function(CategorySortOpts) {
				var sortOpts = new CategorySortOpts();
				expect($scope.categorySortOpts.keys).toEqual(sortOpts.keys);
			}));
		});


		describe("$scope.createCategory", function() {
			var apiCalled, apiCallArgs, defer;

			beforeEach(inject(function(boardFactory, $q) {
				apiCalled = false;
				spyOn(boardFactory, "createCategory").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
					defer = $q.defer();
					return defer.promise;
				});
			}));

			it("is defined", function() {
				expect($scope.createCategory).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.createCategory).toEqual("function");
			});

			it("calls boardFactory.createCategory", function() {
				$scope.createCategory();
				expect(apiCalled).toEqual(true);
			});

			it("calls boardFactory.createCategory with args [$scope.newCat]", function() {
				$scope.newCat = "foobar";
				$scope.createCategory();
				expect(apiCallArgs[0]).toEqual($scope.newCat);
			});

			it("calls $scope.resetNewCat on resolve", function() {
				var resetNewCatCalled = false;

				spyOn($scope, "resetNewCat").and.callFake(function() {
					resetNewCatCalled = true;
				});

				$scope.createCategory();
				$scope.$apply(function() {
					defer.resolve();
				});

				expect(resetNewCatCalled).toEqual(true);
			});
		});


		describe("$scope.resetNewCat()", function() {
			it("is defined", function() {
				expect($scope.resetNewCat).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.resetNewCat).toEqual("function");
			});

			it("reset $scope.newCat", function() {
				$scope.newCat = "foobar";
				$scope.resetNewCat();
				expect($scope.newCat).toEqual("");
			});
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
