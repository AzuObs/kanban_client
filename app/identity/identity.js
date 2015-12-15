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
			views: {
				"header@": {
					templateUrl: "app/common/header/header.html"
				},
				"state-info@": {
					templateUrl: "app/common/state-info/state-info.html",
					controller: "stateInfoCtrl"
				},
				"body@": {
					templateUrl: "app/identity/identity.html",
					controller: "identityCtrl"
				}
			},
			url: "/identity"
		});
	}]);


	module.service("identityService", ["$http", "$rootScope", "$q", function($http, $rootScope, $q) {
		this.createUser = function(username, pwd) {
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

		this.authenticate = function(username, pwd) {
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

		return this;
	}]);


	module.controller("identityCtrl", ["$scope", "identityService", "$state",
		function($scope, identityService, $state) {
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
		}
	]);

})();
