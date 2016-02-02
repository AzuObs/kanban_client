(function() {
	"use strict";

	describe("editableText directive", function() {
		var scope, elem;

		beforeEach(function() {
			module("editableTextDirectiveModule");
			module("html2JsModule");

			inject(function($rootScope, $compile) {
				$rootScope.title = "title";
				$rootScope.update = function() {
					return;
				};

				elem = "<div editable-text='title' update='update'></div>";
				$rootScope.$apply(function() {
					elem = $compile(elem)($rootScope);
				});
				scope = elem.isolateScope();
			});
		});


		describe("scope.setEditing()", function() {
			it("is defined", function() {
				expect(scope.setEditing).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof scope.setEditing).toEqual("function");
			});

			it("sets isEditing to the value passed as first arg", function() {
				scope.isEditing = false;
				scope.setEditing(false);
				expect(scope.isEditing).toEqual(false);

				scope.isEditing = false;
				scope.setEditing(true);
				expect(scope.isEditing).toEqual(true);
			});
		});


		describe("scope.stopEditing()", function() {
			it("is defined", function() {
				expect(scope.stopEditing).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof scope.stopEditing).toEqual("function");
			});

			it("calls scope.update()", function() {
				var called = false;
				spyOn(scope, "update").and.callFake(function() {
					called = true;
				});

				scope.stopEditing();
				expect(called).toEqual(true);
			});
		});


		describe("scope.validate()", function() {
			it("is defined", function() {
				expect(scope.validate).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof scope.validate).toEqual("function");
			});

			it("calls scope.setEditing to false after a keypress enter", function() {
				var e, called;
				e = {
					type: "keypress",
					which: 13
				};
				called = false;

				spyOn(scope, "setEditing").and.callFake(function() {
					called = true;
				});

				scope.validate(e);
				expect(called).toEqual(true);
			});
		});


		describe("scope.watch(isEditing)", function() {
			it("calls scope.startEditing when isEditing becomes true", function() {
				var called = false;
				spyOn(scope, "startEditing").and.callFake(function() {
					called = true;
				});

				expect(scope.isEditing).toEqual(false);
				scope.$apply(function() {
					scope.isEditing = true;
				});
				expect(called).toEqual(true);
			});

			it("calls scope.stopEditing when isEditing becomes false", function() {
				var called = false;
				spyOn(scope, "stopEditing").and.callFake(function() {
					called = true;
				});

				expect(scope.isEditing).toEqual(false);
				scope.$apply(function() {
					scope.isEditing = true;
				});
				scope.$apply(function() {
					scope.isEditing = false;
				});

				expect(called).toEqual(true);
			});
		});


		describe("element.$on(destroy)", function() {
			it("removes the scope's only watch", function() {
				var called = false;

				spyOn(scope, "unregisterWatch").and.callFake(function() {
					called = true;
				});

				scope.$destroy();
				expect(called).toEqual(true);
			});
		});


		describe("scope.isEditing", function() {
			it("is defined", function() {
				expect(scope.isEditing).toBeDefined();
			});

			it("is a boolean", function() {
				expect(typeof scope.isEditing).toEqual("boolean");
			});

			it("is false", function() {
				expect(scope.isEditing).toEqual(false);
			});
		});
	});
})();
