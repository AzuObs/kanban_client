(function() {
	"use strict";

	var kanbanMod = angular.module("kanbanBoardListModule", ["userServiceModule"]);

	kanbanMod.config(function($stateProvider) {
		$stateProvider.state("kanban.boardList", {
			url: "/user/:username",
			templateUrl: "kanban/templates/kanban.list.html",
			controller: "kanbanBoardListCtrl",
			resolve: {
				user: function($q, userService) {
					var q = $q.defer();
					userService
						.getUser()
						.then(function(res) {
							q.resolve(res);
						}, function(err) {
							q.reject(err);
						});
					return q.promise;
				}
			}
		});
	});

	kanbanMod.controller("kanbanBoardListCtrl", function($scope, user) {
		$scope.user = user;
	});

})();
