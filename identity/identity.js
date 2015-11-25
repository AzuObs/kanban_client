(function() {
	"use strict";

	var identityMod = angular.module("identityModule", ["ngResource"]);

	identityMod.config(function($httpProvider, $stateProvider) {
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

		$stateProvider.state("identity", {
			url: "/identity",
			templateUrl: "identity/identity.html",
			controller: "identityCtrl"
		});
	});


	identityMod.service("identityService", function($http, $rootScope, $q) {
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


	identityMod.controller("identityCtrl", function($scope, identityService, $state) {
		$scope.newAccUsr = "";
		$scope.newAccPwd = "";
		$scope.newAccPwdVerify = "";

		$scope.logginUsername = "daniel";
		$scope.logginPwd = "123";

		$scope.createUser = function() {
			identityService
				.createUser({
					username: $scope.newAccUsr,
					pwd: $scope.newAccPwd
				})
				.then(function(res) {
					sessionStorage.userId = res.user._id;
					sessionStorage.token = res.token;
					$state.go("kanban.boardList", {
						username: res.user.username
					});
				}, function(err) {
					console.log(err);
				});
		};


		$scope.authenticate = function() {
			identityService
				.authenticate({
					username: $scope.logginUsername,
					pwd: $scope.logginPwd
				})
				.then(function(res) {
					sessionStorage.userId = res.user._id;
					sessionStorage.token = res.token;

					$state.go("kanban.boardList", {
						username: res.user.username
					});
				}, function(err) {
					console.log(err);
				});

		};
	});
})();
