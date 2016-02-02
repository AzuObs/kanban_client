(function() {
	"use strict";

	describe("deleteObject directive", function() {
		var $compile, $scope, scope, elem;

		beforeEach(function() {
			module("deletableObjectDirectiveModule");
			module("html2JsModule");

			inject(function(_$compile_, $rootScope) {
				$scope = $rootScope.$new();
				$compile = _$compile_;
			});

			$scope.objectName = "object name";
			$scope.objectType = "object type";
			$scope.deleteFn = function() {
				return;
			};

			elem = "<deletable-object object-name='objectName'" +
				"object-type='objectType' delete-fn='deleteFn()'></deletable-object>";

			$scope.$apply(function() {
				elem = $compile(elem)($scope);
			});

			scope = elem.isolateScope();
		});


		describe("scope.toggleDeleting()", function() {
			it("is defined", function() {
				expect(scope.toggleDeleting).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof scope.toggleDeleting).toEqual("function");
			});

			it("toggles scope.isDeleting", function() {
				expect(scope.isDeleting).toEqual(false);
				scope.toggleDeleting();
				expect(scope.isDeleting).toEqual(true);

				expect(scope.isDeleting).toEqual(true);
				scope.toggleDeleting();
				expect(scope.isDeleting).toEqual(false);
			});

			it("resets scope.repeatObjectName", function() {
				scope.repeatObjectName = "foobar";
				scope.isDeleting = false;
				scope.toggleDeleting();
				expect(scope.repeatObjectName).toEqual("");

				scope.repeatObjectName = "foobar";
				scope.isDeleting = true;
				scope.toggleDeleting();
				expect(scope.repeatObjectName).toEqual("");
			});
		});


		describe("scope.stopDeleting()", function() {
			it("is defined", function() {
				expect(scope.stopDeleting).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof scope.stopDeleting).toEqual("function");
			});

			it("resets scope.repeatObjectName", function() {
				scope.repeatObjectName = "foobar";
				scope.stopDeleting({});
				expect(scope.repeatObjectName).toEqual("");
			});

			it("does nothing if target element has the deletable-object-toggle class", function() {
				var e = {
					relatedTarget: angular.element("<h1 class='deletable-object-toggle'></h1>")
				};
				scope.isDeleting = true;

				scope.stopDeleting(e);
				expect(scope.isDeleting).toEqual(true);
			});

			it("otherwise it assigns false to scope.isDeleting", function() {
				var e = {
					relatedTarget: angular.element("<h1></h1>")
				};
				scope.isDeleting = true;

				scope.stopDeleting(e);
				expect(scope.isDeleting).toEqual(false);
			});
		});


		describe("scope.deleteObject()", function() {
			var deleteFnCalled;

			beforeEach(function() {
				spyOn(scope, "deleteFn").and.callFake(function() {
					deleteFnCalled = true;
				});
			});

			it("is defined", function() {
				expect(scope.deleteObject).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof(scope.deleteObject)).toEqual("function");
			});

			it("logs an error if object name and repeat object name do not match", inject(function($log) {
				var e = {
					type: "keypress",
					which: 13
				};

				scope.objectName = "name";
				scope.repeatObjectName = "";

				$log.reset();
				scope.deleteObject(e);
				expect($log.error.logs[0][0]).toBeDefined();
				expect(null).toBeDefined();
			}));

			it("calls scope.stopDeleting()", function() {
				var called, e;

				spyOn(scope, "stopDeleting").and.callFake(function() {
					called = true;
				});

				e = {
					type: "keypress",
					which: 13
				};
				called = false;

				scope.objectName = "name";
				scope.repeatObjectName = "name";
				scope.deleteObject(e);

				expect(called).toEqual(true);
			});

			it("calls scope.deleteFn()", function() {
				var e = {

					type: "keypress",
					which: 13
				};

				scope.objectName = "name";
				scope.repeatObjectName = "name";
				deleteFnCalled = false;

				scope.deleteObject(e);
				expect(deleteFnCalled).toEqual(true);
			});
		});


		describe("scope.isDeleting", function() {
			it("is defined", function() {
				expect(scope.isDeleting).toBeDefined();
			});

			it("is a boolean", function() {
				expect(typeof scope.isDeleting).toEqual("boolean");
			});

			it("is false", function() {
				expect(scope.isDeleting).toEqual(false);
			});
		});


		describe("scope.isDisabled", function() {
			it("is defined", function() {
				expect(scope.isDisabled).toBeDefined();
			});

			it("is a boolean", function() {
				expect(typeof scope.isDisabled).toEqual("boolean");
			});

			it("is false", function() {
				expect(scope.isDisabled).toEqual(false);
			});
		});


		describe("scope.repeateObjectName", function() {
			it("is defined", function() {
				expect(scope.repeatObjectName).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof scope.repeatObjectName).toEqual("string");
			});

			it("is empty", function() {
				expect(scope.repeatObjectName).toEqual("");
			});
		});
	});
})();
