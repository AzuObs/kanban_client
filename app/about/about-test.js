(function() {
	"use strict";

	describe("aboutModule", function() {
		describe("aboutCtrl", function() {
			var $scope;

			beforeEach(module("aboutModule"));
			beforeEach(inject(function($controller, $rootScope) {
				$scope = $rootScope.$new();
				$controller("aboutCtrl", {
					$scope: $scope
				});
			}));

			describe("$scope.resources", function() {
				it("is defined", function() {
					expect($scope.resources).toBeDefined();
				});

				it("is an array", function() {
					expect(Object.prototype.toString.call($scope.resources)).toEqual("[object Array]");
				});

				it("is not empty", function() {
					expect($scope.resources.length).toBeGreaterThan(0);
				});
			});
		});


		describe("$stateProvider", function() {
			var stateArgs;

			beforeEach(function() {
				module("boardModule", function($stateProvider) {
					stateArgs = undefined;
					spyOn($stateProvider, "state").and.callFake(function() {
						stateArgs = arguments;
					});
				});
				module("aboutModule");
			});
			beforeEach(inject());

			it("sets start to 'kanban.about'", function() {
				expect(stateArgs[0]).toEqual("kanban.about");
			});

			it("sets url to '/about'", function() {
				expect(stateArgs[1].url).toEqual("/about");
			});

			it("configures views", function() {
				expect(Object.keys(stateArgs[1].views).length).toBeGreaterThan(0);
			});
		});
	});
})();
