(function() {
	"use strict";

	var module = angular.module("errorHandlerModule", ["ui.router"]);


	module.factory("errorHandler", ["$log", "$state", function($log, $state) {
		var error = {
			value: "Not Found",
			counter: 0
		};

		return {
			getError: function() {
				return error;
			},
			handleHttpError: function(err) {
				error.value = err;
				error.counter++;
				$log.error(err);
				$state.go("kanban.error");
			},
			handleAppError: function(err) {
				error.value = err;
				error.counter++;
				$log.error(err);
				$state.go("kanban.error");
			}
		};
	}]);
})();
