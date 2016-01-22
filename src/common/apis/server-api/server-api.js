(function() {
	"use strict";

	var module = angular.module("serverAPIModule", ["ngResource", "globalConstantsModule"]);

	module.service("serverAPI", [
		"$rootScope", "$q", "$http", "ENV",
		function($rootScope, $q, $http, ENV) {
			var endPoint = ENV.apiEndpoint;

			this.getBoard = function(boardId) {
				var q = $q.defer();

				$http
					.get(endPoint + "/board/" + boardId)
					.success(function(res) {
						q.resolve(res);
					})
					.error(function(err) {
						q.reject(err);
					});

				return q.promise;
			};

			this.getUser = function(userId) {
				var defer = $q.defer();

				$http
					.get(endPoint + "/user/" + userId)
					.success(function(res) {
						defer.resolve(res);
					})
					.error(function(err) {
						defer.reject(err);
					});

				return defer.promise;
			};

			this.createBoard = function(userId, name) {
				var body = {
					userId: userId,
					name: name
				};

				var defer = $q.defer();

				$http
					.post(endPoint + "/board", body)
					.success(function(res) {
						defer.resolve(res);
					})
					.error(function(err) {
						defer.reject(err);
					});

				return defer.promise;
			};

			this.getUserBoards = function(userId) {
				var q = $q.defer();

				$http
					.get(endPoint + "/board/user/" + userId)
					.success(function(res) {
						q.resolve(res);
					})
					.error(function(err) {
						q.reject(err);
					});

				return q.promise;
			};

			this.deleteBoard = function(boardId) {
				var defer = $q.defer();

				$http
					.delete(endPoint + "/board/" + boardId)
					.success(function(res) {
						defer.resolve(res);
					})
					.error(function(err) {
						defer.reject(err);
					});

				return defer.promise;
			};

			this.addMemberToUserSelection = function(board, userEmail) {
				var q = $q.defer();

				var body = {
					boardId: board._id,
					userEmail: userEmail
				};

				$http
					.put(endPoint + "/board/members", body)
					.success(function(res) {
						q.resolve(res);
					})
					.error(function(err) {
						q.reject(err);
					});

				return q.promise;
			};

			this.createComment = function(content, username, userPicUrl, taskId, catId, boardId) {
				var body = {
					content: content,
					username: username,
					userPicUrl: userPicUrl,
					boardId: boardId,
					catId: catId,
					taskId: taskId
				};

				var q = $q.defer();

				$http
					.post(endPoint + "/comment", body)
					.success(function(res) {
						q.resolve(res);
					})
					.error(function(err) {
						q.reject(err);
					});

				return q.promise;
			};

			this.createTask = function(name, categoryId, boardId) {
				var body = {
					boardId: boardId,
					categoryId: categoryId,
					name: name
				};

				var defer = $q.defer();

				$http
					.post(endPoint + "/task/", body)
					.success(function(res) {
						defer.resolve(res);
					})
					.error(function(err) {
						defer.reject(err);
					});

				return defer.promise;
			};

			this.createCategory = function(boardId, name) {
				var body = {
					boardId: boardId,
					name: name
				};

				var defer = $q.defer();

				$http
					.post(endPoint + "/category", body)
					.success(function(res) {
						defer.resolve(res);
					})
					.error(function(err) {
						defer.reject(err);
					});

				return defer.promise;
			};

			this.deleteTask = function(boardId, cId, tId) {
				var defer = $q.defer();

				$http
					.delete(endPoint + "/task/" + boardId + "/" + cId + "/" + tId)
					.success(function(res) {
						defer.resolve(res);
					})
					.error(function(err) {
						defer.reject(err);
					});

				return defer.promise;
			};

			this.deleteCategory = function(boardId, catId) {
				var defer = $q.defer();

				$http
					.delete(endPoint + "/category/" + boardId + "/" + catId)
					.success(function(res) {
						defer.resolve(res);
					})
					.error(function(err) {
						defer.reject(err);
					});

				return defer.promise;
			};

			this.updateBoard = function(board) {
				var defer = $q.defer();

				$http
					.put(endPoint + "/board", {
						board: board
					})
					.success(function(res) {
						defer.resolve(res);
					})
					.error(function(err) {
						defer.reject(err);
					});

				return defer.promise;
			};

			this.createUser = function(username, pwd) {
				var body = {
					username: username,
					pwd: pwd
				};

				var defer = $q.defer();
				$http
					.post(endPoint + "/user", body)
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
					.post(endPoint + "/user/login", body)
					.success(function(res) {
						defer.resolve(res);
					}, function(err) {
						defer.reject(err);
					});

				return defer.promise;
			};
		}
	]);
})();
