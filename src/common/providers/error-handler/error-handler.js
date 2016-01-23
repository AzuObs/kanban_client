(function() {
	"use strict";

	var module = angular.module("errorHandlerModule", ["ui.router"]);


	module.factory("errorHandler", ["$log", "$state", function($log, $state) {
		var error = {
			value: undefined,
			counter: 0
		};

		return {
			getError: function() {
				return error;
			},
			handleHttpError: function(err) {
				error.value = err;
				error.counter++;
				$state.go("kanban.error");
			},
			handleAppError: function(err) {
				error.value = err;
				error.counter++;
				$state.go("kanban.error");
			}
		};
	}]);
})();
