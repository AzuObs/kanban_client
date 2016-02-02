(function() {
	"use strict";

	describe("errorPageModule Controller", function() {
		var $scope, error;

		beforeEach(function() {
			module("errorPageModule");
			inject(function($rootScope, $controller, errorHandler) {
				spyOn(errorHandler, "getError").and.callFake(function() {
					return error;
				});

				error = {
					value: "Unauthorized",
					counter: 0
				};
				$scope = $rootScope.$new();
				$controller("errorPageCtrl", {
					$scope: $scope
				});
			});
		});


		describe("$scope.redirectClick()", function() {
			var apiCalled, apiCallArgs;

			beforeEach(inject(function($state) {
				spyOn($state, "go").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
				});
			}));

			it("is defined", function() {
				expect($scope.redirectClick).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.redirectClick).toEqual("function");
			});

			it("calls $state.go", function() {
				apiCalled = false;
				$scope.redirectClick();
				expect(apiCalled).toEqual(true);
			});

			it("calls $state.go with args [redirectState]", function() {
				apiCallArgs = [];
				$scope.redirectClick();
				expect(apiCallArgs.length).toEqual(1);
				expect(apiCallArgs[0]).toEqual($scope.redirectState);
			});
		});


		describe("$scope.error", function() {
			it("is defined", function() {
				expect($scope.error).toBeDefined();
			});

			it("is an object", function() {
				expect(Object.prototype.toString.call($scope.error)).toEqual("[object Object]");
			});

			it("is equal to errorHandler.getError()", inject(function(errorHandler) {
				expect($scope.error).toEqual(errorHandler.getError());
			}));
		});


		describe("$scope.title", function() {
			it("is defined", function() {
				expect($scope.title).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof $scope.title).toEqual("string");
			});

			it("has a default value of 'Error - Undefined Error'", function() {
				expect($scope.title).toEqual("Error - Undefined Error");
			});
		});


		describe("$scope.subtitle", function() {
			it("is defined", function() {
				expect($scope.subtitle).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof $scope.subtitle).toEqual("string");
			});

			it("has a default value of 'An unexpected error occured.'", function() {
				expect($scope.subtitle).toEqual("An unexpected error occured.");
			});
		});


		describe("$scope.redirectMsg", function() {
			it("is defined", function() {
				expect($scope.redirectMsg).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof $scope.redirectMsg).toEqual("string");
			});

			it("has a default value of 'GO TO LOGIN'", function() {
				expect($scope.redirectMsg).toEqual("GO TO LOGIN");
			});
		});


		describe("$scope.redirectState", function() {
			it("is defined", function() {
				expect($scope.redirectMsg).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof $scope.redirectMsg).toEqual("string");
			});

			it("has a default value of 'kanban.oauth'", function() {
				expect($scope.redirectMsg).toEqual("GO TO LOGIN");
			});
		});


		describe("$scope.$watch(error)", function() {

			it("sets title to '401 - Unauthorized Access' when error is 'Unauthorized'", function() {
				expect($scope.title).toEqual("Error - Undefined Error");
				$scope.$apply(function() {
					error.value = "Unauthorized";
					error.counter++;
				});

				expect($scope.title).toEqual("401 - Unauthorized Access");
			});


			it("sets title to '404 - Not found' when error is 'Not Found'", function() {
				expect($scope.title).toEqual("Error - Undefined Error");
				$scope.$apply(function() {
					error.value = "Not Found";
					error.counter++;
				});

				expect($scope.title).toEqual("404 - Not Found");
			});


			it("sets title to '500 - Internal Server Error' when error is 'Internal Server Error'", function() {
				expect($scope.title).toEqual("Error - Undefined Error");
				$scope.$apply(function() {
					error.value = "Internal Server Error";
					error.counter++;
				});

				expect($scope.title).toEqual("500 - Internal Server Error");
			});


			it("sets title to '500 - Internal Server Error' when error is 'State Change Error'", function() {
				expect($scope.title).toEqual("Error - Undefined Error");
				$scope.$apply(function() {
					error.value = "State Change Error";
					error.counter++;
				});

				expect($scope.title).toEqual("500 - Internal Server Error");
			});


			it("sets title to 'Error - Unrecognized Error' when error is unrecognized", function() {
				expect($scope.title).toEqual("Error - Undefined Error");
				$scope.$apply(function() {
					error.value = "foobar";
					error.counter++;
				});

				expect($scope.title).toEqual("Error - Unrecognized Error");
			});
		});
	});
})();
