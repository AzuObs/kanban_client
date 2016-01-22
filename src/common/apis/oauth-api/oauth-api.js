(function() {
	"user strict";

	var module = angular.module("oauthAPIModule", ["serverAPIModule", "ui.router"]);


	module.service("oauthAPI", [
		"$q", "serverAPI", "$state",
		function($q, serverAPI, $state) {
			this.onSuccessfulLoginSync = function(res) {
				sessionStorage.userId = res.user._id;
				sessionStorage.token = res.token;
				$state.go("kanban.boardList", {
					username: res.user.username
				});
			};

			this.createUser = function(username, pwd) {
				var defer = $q.defer();
				serverAPI
					.createUser(username, pwd)
					.then(function(res) {
						this.onSuccessfulLoginSync(res);
					}, function(err) {
						$log.error(err);
					});

				return defer.promise;
			};

			this.authenticate = function(username, pwd) {
				var body = {
					username: username,
					pwd: pwd
				};

				var defer = $q.defer();
				serverAPI
					.authenticate(username, pwd)
					.then(function(res) {
						this.onSuccessfulLoginSync(res);
					}, function(err) {
						$log.error(err);
					});

				return defer.promise;
			};

			return this;
		}
	]);
})();
