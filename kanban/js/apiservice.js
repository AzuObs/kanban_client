(function() {
	"use strict";

	var module = angular.module("APIServiceModule", ["ngResource"]);


	module.service("APIService", ["$rootScope", "$q", "$http", function($rootScope, $q, $http) {


		this.removeUserFromBoard = function(board, user) {
			var q = $q.defer();

			$http
				.delete($rootScope.endPoint + "/board/" + board._id + "/user/" + user._id)
				.success(function(res) {
					q.resolve(res);
				})
				.error(function(err) {
					q.reject(err);
				});

			return q.promise;
		};


		this.addMemberToBoard = function(board, userEmail) {
			var q = $q.defer();

			var body = {
				boardId: board._id,
				userEmail: userEmail
			};

			$http
				.put($rootScope.endPoint + "/board/members", body)
				.success(function(res) {
					q.resolve(res);
				})
				.error(function(err) {
					q.reject(err);
				});

			return q.promise;
		};


		this.getBoard = function(boardId) {
			var q = $q.defer();

			$http
				.get($rootScope.endPoint + "/board/" + boardId)
				.success(function(res) {
					q.resolve(res);
				})
				.error(function(err) {
					q.reject(err);
				});

			return q.promise;
		};


		this.getBoardsForUser = function(userId) {
			var q = $q.defer();

			$http
				.get($rootScope.endPoint + "/board/user/" + userId)
				.success(function(res) {
					q.resolve(res);
				})
				.error(function(err) {
					q.reject(err);
				});

			return q.promise;
		};


		this.createComment = function(content, username, userPicUrl, boardId, catId, taskId) {
			var body = {
				content: content,
				username: username,
				userPicUrl: userPicUrl,
				catId: catId,
				boardId: boardId,
				taskId: taskId
			};

			var q = $q.defer();

			$http
				.post($rootScope.endPoint + "/comment", body)
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
				.get($rootScope.endPoint + "/user/" + userId)
				.success(function(res) {
					defer.resolve(res);
				})
				.error(function(err) {
					defer.reject(err);
				});

			return defer.promise;
		};


		this.createCategory = function(boardId, name, position) {
			var body = {
				boardId: boardId,
				name: name,
				position: position
			};

			var defer = $q.defer();

			$http
				.post($rootScope.endPoint + "/category", body)
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
				.delete($rootScope.endPoint + "/category/" + boardId + "/" + catId)
				.success(function(res) {
					defer.resolve(res);
				})
				.error(function(err) {
					defer.reject(err);
				});

			return defer.promise;
		};


		this.createTask = function(boardId, categoryId, name, position) {
			var body = {
				boardId: boardId,
				categoryId: categoryId,
				name: name,
				position: position
			};

			var defer = $q.defer();

			$http
				.post($rootScope.endPoint + "/task/", body)
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
				.delete($rootScope.endPoint + "/task/" + boardId + "/" + cId + "/" + tId)
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
				.put($rootScope.endPoint + "/board", {
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


		this.createBoard = function(userId, name) {
			var body = {
				userId: userId,
				name: name
			};

			var defer = $q.defer();

			$http
				.post($rootScope.endPoint + "/board", body)
				.success(function(res) {
					defer.resolve(res);
				})
				.error(function(err) {
					defer.reject(err);
				});

			return defer.promise;
		};


		this.deleteBoard = function(boardId) {
			var defer = $q.defer();

			$http
				.delete($rootScope.endPoint + "/board/" + boardId)
				.success(function(res) {
					defer.resolve(res);
				})
				.error(function(err) {
					defer.reject(err);
				});

			return defer.promise;
		};
	}]);
})();
