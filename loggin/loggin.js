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

		service.createUser = function(params) {
			var defer = $q.defer();
			$http
				.post($rootScope.endPoint + "/user", params)
				.success(function(res) {
					defer.resolve(res);
				})
				.error(function(err) {
					defer.reject(err);
				});

			return defer.promise;
		};

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
		$scope.newAccUsr = "";
		$scope.newAccPwd = "";
		$scope.newAccPwdVerify = "";

		$scope.logginUsername = "daniel";
		$scope.logginPwd = "123";

		$scope.createUser = function() {
			logginService
				.createUser({
					username: $scope.newAccUsr,
					pwd: $scope.newAccPwd
				})
				.then(function(res) {
					$state.go("kanban.boardList", {
						username: $scope.newAccUsr
					});
				}, function(err) {
					console.log(err);
				});
		};


		$scope.authenticate = function() {
			logginService
				.authenticate({
					username: $scope.logginUsername,
					pwd: $scope.logginPwd
				})
				.then(function(res) {
					sessionStorage.token = res.token;
					$state.go("kanban.boardList", {
						username: $scope.logginUsername
					});
				}, function(err) {
					console.log(err);
				});
		};
	});
})();
