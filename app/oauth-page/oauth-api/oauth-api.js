(function() {
	"user strict";

	var module = angular.module("oauthAPIModule", ["ngResource"]);


	module.service("oauthAPI", ["$http", "$rootScope", "$q", function($http, $rootScope, $q) {
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
})();
