(function() {
	"use strict";

	var module = angular.module("identityModule", ["ngResource"]);

	module.config(["$httpProvider", "$stateProvider", function($httpProvider, $stateProvider) {
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
	}]);


	module.service("identityService", ["$http", "$rootScope", "$q", function($http, $rootScope, $q) {
		var service = this;

		service.createUser = function(username, pwd) {
			var body = {
				username: username,
				pwd: pwd
			};

			var defer = $q.defer();
			$http
				.post($rootScope.endPoint + "/user", body)
				.success(function(res) {
					defer.resolve(res);
				})
				.error(function(err) {
					defer.reject(err);
				});

			return defer.promise;
		};

		service.authenticate = function(username, pwd) {
			var body = {
				username: username,
				pwd: pwd
			};

			var defer = $q.defer();
			$http
				.post($rootScope.endPoint + "/user/loggin", body)
				.success(function(res) {
					defer.resolve(res);
				})
				.error(function(err) {
					defer.reject(err);
				});


			return defer.promise;
		};

		return service;
	}]);


	module.controller("identityCtrl", ["$scope", "identityService", "$state", function($scope, identityService, $state) {
		$scope.newAccUsr = "";
		$scope.newAccPwd = "";
		$scope.newAccPwdVerify = "";

		$scope.logginUsername = "sheldon";
		$scope.logginPwd = "123";

		$scope.createUser = function() {
			identityService
				.createUser($scope.newAccUsr, $scope.newAccPwd)
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
				.authenticate($scope.logginUsername, $scope.logginPwd)
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
	}]);

})();
