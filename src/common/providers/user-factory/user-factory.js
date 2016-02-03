(function() {
	"user strict";

	var module = angular.module("userFactoryModule", [
		"serverAPIModule",
		"errorHandlerModule",
		"ui.router"
	]);


	module.factory("userFactory", [
		"$q", "serverAPI", "errorHandler", "$state",
		function($q, serverAPI, errorHandler, $state) {
			var user, boards, userFactory;

			userFactory = {
				getUser: function(userId) {
					var defer = $q.defer();

					serverAPI
						.getUser(userId)
						.then(function(res) {
							user = res;
							defer.resolve(res);
						}, function(err) {
							errorHandler.handleHttpError(err);
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
							errorHandler.handleHttpError(err);
						});

					return defer.promise;
				},


				createUser: function(username, pwd) {
					var defer = $q.defer();
					serverAPI
						.createUser(username, pwd)
						.then(function(res) {
							userFactory.onSuccessfulLoginSync(res);
						}, function(err) {
							errorHandler.handleHttpError(err);
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
							errorHandler.handleHttpError(err);
						});

					return defer.promise;
				},


				deleteBoard: function(boardId) {
					var defer = $q.defer();

					var deleteBoardLocally = function(boadId) {
						for (var i = 0; i < boards.length; i++) {
							if (boards[i]._id === boardId) {
								boards.splice(i, 1);
							}
						}
					};

					serverAPI
						.deleteBoard(boardId)
						.then(function(res) {
							deleteBoardLocally(boardId);
							defer.resolve(res);
						}, function(err) {
							errorHandler.handleHttpError(err);
						});

					return defer.promise;
				},


				authenticate: function(username, pwd) {
					var defer = $q.defer();

					serverAPI
						.authenticate(username, pwd)
						.then(function(res) {
							userFactory.onSuccessfulLoginSync(res);
						}, function(err) {
							errorHandler.handleHttpError(err);
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

			return userFactory;
		}
	]);
})();
