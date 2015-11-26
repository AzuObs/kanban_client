(function() {
	"use strict";

	var apiModule = angular.module("APIServiceModule", ["ngResource"]);


	apiModule.service("APIService", function($log, $rootScope, $q, $http) {

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


		this.createComment = function(params) {
			var q = $q.defer();

			$http
				.post($rootScope.endPoint + "/comment", params)
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

		this.createCategory = function(params) {
			var defer = $q.defer();

			$http
				.post($rootScope.endPoint + "/category", params)
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

		this.createTask = function(params) {
			var defer = $q.defer();

			$http
				.post($rootScope.endPoint + "/task/", params)
				.success(function(res) {
					defer.resolve(res);
				})
				.error(function(err) {
					defer.reject(err);
				});

			return defer.promise;
		};

		this.deleteTask = function(cId, tId) {
			var defer = $q.defer();
			var userId = User.user._id;
			var boardId = User.user.boards[0]._id;

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
				.put($rootScope.endPoint + "/board", board)
				.success(function(res) {
					defer.resolve(res);
				})
				.error(function(err) {
					defer.reject(err);
				});

			return defer.promise;
		};

		this.createComment = function(params) {
			var defer = $q.defer();

			$http
				.post($rootScope.endPoint + "/comments", params)
				.success(function(res) {
					defer.resolve(res);
				})
				.error(function(err) {
					defer.reject(err);
				});

			return defer.promise;
		};

		this.createBoard = function(params) {
			var defer = $q.defer();

			$http
				.post($rootScope.endPoint + "/board", params)
				.success(function(res) {
					defer.resolve(res);
				})
				.error(function(err) {
					defer.reject(err);
				});

			return defer.promise;
		};

		this.deleteBoard = function(params) {
			var defer = $q.defer();

			$http
				.delete($rootScope.endPoint + "/board/" + params.userId + "/" + params.boardId)
				.success(function(res) {
					defer.resolve(res);
				})
				.error(function(err) {
					defer.reject(err);
				});

			return defer.promise;
		};
	});
})();
