(function() {
	"use strict";

	describe("errorHandler factory", function() {
		var errorHandler;

		beforeEach(function() {
			module("errorHandlerModule");
			inject(function(_errorHandler_) {
				errorHandler = _errorHandler_;
			});
		});

		describe("errorHandler.getError()", function() {
			it("is defined", function() {
				expect(errorHandler.getError).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof errorHandler.getError).toEqual("function");
			});

			it("returns the error object", function() {
				var error = {
					value: "Not Found",
					counter: 0
				};

				expect(errorHandler.getError()).toEqual(error);
			});
		});


		describe("errorHandler.handleHttpError", function() {
			var apiCalled, apiCallArgs;

			beforeEach(inject(function($state) {
				spyOn($state, "go").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
				});
			}));

			it("is defined", function() {
				expect(errorHandler.handleHttpError).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof errorHandler.handleHttpError).toEqual("function");
			});

			it("assigns the argument to the error variable", function() {
				expect(errorHandler.getError().value).toEqual("Not Found");
				errorHandler.handleHttpError("error");
				expect(errorHandler.getError().value).toEqual("error");
			});

			it("increments the error counter", function() {
				expect(errorHandler.getError().counter).toEqual(0);
				errorHandler.handleHttpError("error");
				expect(errorHandler.getError().counter).toEqual(1);
			});

			it("$logs an error", inject(function($log) {
				$log.reset();
				errorHandler.handleHttpError("error");
				expect($log.error.logs[0][0]).toEqual("error");
			}));

			it("calls $state.go()", function() {
				apiCalled = false;
				errorHandler.handleHttpError("error");
				expect(apiCalled).toEqual(true);
			});

			it("calls $state with args ['kanban.error']", function() {
				apiCallArgs = [];
				errorHandler.handleHttpError("error");
				expect(apiCallArgs.length).toEqual(1);
				expect(apiCallArgs[0]).toEqual("kanban.error");
			});
		});


		describe("errorHandler.handleAppError", function() {
			var apiCalled, apiCallArgs;

			beforeEach(inject(function($state) {
				spyOn($state, "go").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
				});
			}));

			it("is defined", function() {
				expect(errorHandler.handleAppError).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof errorHandler.handleAppError).toEqual("function");
			});

			it("assigns the argument to the error variable", function() {
				expect(errorHandler.getError().value).toEqual("Not Found");
				errorHandler.handleAppError("error");
				expect(errorHandler.getError().value).toEqual("error");
			});

			it("increments the error counter", function() {
				expect(errorHandler.getError().counter).toEqual(0);
				errorHandler.handleAppError("error");
				expect(errorHandler.getError().counter).toEqual(1);
			});

			it("$logs an error", inject(function($log) {
				$log.reset();
				errorHandler.handleAppError("error");
				expect($log.error.logs[0][0]).toEqual("error");
			}));

			it("calls $state.go()", function() {
				apiCalled = false;
				errorHandler.handleAppError("error");
				expect(apiCalled).toEqual(true);
			});

			it("calls $state with args ['kanban.error']", function() {
				apiCallArgs = [];
				errorHandler.handleAppError("error");
				expect(apiCallArgs.length).toEqual(1);
				expect(apiCallArgs[0]).toEqual("kanban.error");
			});
		});
	});
})();
