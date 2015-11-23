(function() {
	"use strict";

	var logginMod = angular.module("logginModule", ["ngResource"]);

	logginMod.config(function($httpProvider, $stateProvider) {
		$httpProvider.interceptors.push(function() {
			return {
				request: function(req) {
					if (sessionStorage.token) {
						req.headers.token = sessionStorage.token;
					}
					return req;
				}
			};
		});

		$stateProvider.state("loggin", {
			url: "/loggin",
			templateUrl: "loggin/loggin.html",
			controller: "logginCtrl"
		});
	});


	logginMod.service("logginService", function($http, $rootScope, $q) {
		var service = this;

		service.authenticate = function(params) {
			var defer = $q.defer();
			$http
				.post($rootScope.endPoint + "/user/loggin", params)
				.success(function(res) {
					defer.resolve(res);
				})
				.error(function(err) {
					defer.reject(err);
				});

			return defer.promise;
		};

		return service;
	});


	logginMod.controller("logginCtrl", function($scope, logginService, $state) {
		$scope.username = "daniel";
		$scope.pwd = "123";

		$scope.authenticate = function() {
			logginService
				.authenticate({
					username: $scope.username,
					pwd: $scope.pwd
				})
				.then(function(res) {
					sessionStorage.token = res.token;
					$state.go("kanban.boardList", {
						username: $scope.username
					});
				}, function(err) {
					console.log(err);
				});
		};
	});
})();
