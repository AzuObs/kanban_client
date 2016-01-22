(function() {
	"user strict";

	var module = angular.module("userFactoryModule", ["serverAPIModule", "ui.router"]);


	module.factory("userFactory", [
		"$q", "serverAPI", "$state",
		function($q, serverAPI, $state) {
			var user, boards;

			return {
				getUser: function(userId) {
					var defer = $q.defer();

					serverAPI
						.getUser(userId)
						.then(function(res) {
							user = res;
							defer.resolve(res);
						}, function(err) {
							defer.reject(err);
						});

					return defer.promise;
				},

				getUserBoards: function(userId) {
					var defer = $q.defer();

					serverAPI
						.getUserBoards(userId)
						.then(function(res) {
							boards = res;
							defer.resolve(res);
						}, function(err) {
							defer.reject(err);
						});

					return defer.promise;
				},

				createUser: function(username, pwd) {
					var that = this;
					var defer = $q.defer();
					serverAPI
						.createUser(username, pwd)
						.then(function(res) {
							that.onSuccessfulLoginSync(res);
						}, function(err) {
							$log.error(err);
						});

					return defer.promise;
				},

				createBoard: function(name) {
					var defer = $q.defer();

					serverAPI
						.createBoard(user._id, name)
						.then(function(res) {
							if (boards) {
								boards.unshift(res);
							}
							defer.resolve(res);
						}, function(err) {
							$log.error(err);
							defer.reject(err);
						});

					return defer.promise;
				},

				deleteBoard: function(boardId) {
					var defer = $q.defer();

					serverAPI
						.deleteBoard(boardId)
						.then(function(res) {
							for (var i = 0; i < boards.length; i++) {
								if (boards[i]._id === boardId) {
									boards.splice(i, 1);
								}
							}
							defer.resolve(res);
						}, function(err) {
							$log.error(err);
							defer.reject(err);
						});

					return defer.promise;
				},


				authenticate: function(username, pwd) {
					var that = this;
					var defer = $q.defer();

					serverAPI
						.authenticate(username, pwd)
						.then(function(res) {
							that.onSuccessfulLoginSync(res);
						}, function(err) {
							$log.error(err);
						});

					return defer.promise;
				},

				onSuccessfulLoginSync: function(res) {
					sessionStorage.userId = res.user._id;
					sessionStorage.token = res.token;
					$state.go("kanban.boardList", {
						username: res.user.username
					});
				}
			};
		}
	]);
})();
