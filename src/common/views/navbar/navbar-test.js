(function() {
	"use strict";

	describe("navbarCtrl", function() {
		var $scope;

		beforeEach(function() {
			module("navbarModule");
			inject(function($rootScope, $controller) {
				$scope = $rootScope.$new();
				$controller("navbarCtrl", {
					$scope: $scope
				});
			});
		});


		describe("$scope.appName", function() {
			it("is defined", function() {
				expect($scope.appName).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof $scope.appName).toEqual("string");
			});

			it("equals 'KANBAN'", function() {
				expect($scope.appName).toEqual("KANBAN");
			});
		});


		describe("$scope.jpAppName", function() {
			it("is defined", function() {
				expect($scope.jpAppName).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof $scope.jpAppName).toEqual("string");
			});

			it("equals '看板'", function() {
				expect($scope.jpAppName).toEqual("看板");
			});
		});


		describe("$scope.menuLinks", function() {
			it("is defined", function() {
				expect($scope.menuLinks).toBeDefined();
			});

			it("is an array of objects", function() {
				expect(Object.prototype.toString.call($scope.menuLinks)).toEqual("[object Array]");
				expect(Object.prototype.toString.call($scope.menuLinks[0])).toEqual("[object Object]");
			});

			it("is not empty", function() {
				expect($scope.menuLinks.length).toBeGreaterThan(0);
			});
		});
	});
})();
