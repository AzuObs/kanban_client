(function() {
	"use strict";

	describe("JP_APP_NAME constant", function() {
		var constant;

		beforeEach(function() {
			module("navbarModule");
			inject(function(JP_APP_NAME) {
				constant = JP_APP_NAME;
			});
		});

		it("is defined", function() {
			expect(constant).toBeDefined();
		});

		it("is a string", function() {
			expect(typeof constant).toEqual("string");
		});

		it("is equal to 'kanban'", function() {
			expect(constant).toEqual("看板");
		});
	});


	describe("APP_NAME constant", function() {
		var APP_NAME;

		beforeEach(function() {
			module("navbarModule");
			inject(function(_APP_NAME_) {
				APP_NAME = _APP_NAME_;
			});
		});

		it("is defined", function() {
			expect(APP_NAME).toBeDefined();
		});

		it("is a string", function() {
			expect(typeof APP_NAME).toEqual("string");
		});

		it("is equal to 'kanban'", function() {
			expect(APP_NAME).toEqual("kanban");
		});
	});


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

			it("equals 'kanban'", function() {
				expect($scope.appName).toEqual("kanban");
			});
		});


		describe("$scope.jpAppName", function() {
			it("is defined", function() {
				expect($scope.jpAppName).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof $scope.jpAppName).toEqual("string");
			});

			it("equals 'Kanban'", function() {
				expect($scope.jpAppName).toEqual("看板");
			});
		});
	});
})();
