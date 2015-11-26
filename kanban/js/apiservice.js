(function() {
	"use strict";

	var apiModule = angular.module("APIServiceModule", ["ngResource"]);


	apiModule.service("APIService", function($log, $rootScope, $q, $http) {


		this.addMemberToBoard = function(board, userEmail) {
			var q = $q.defer();

			var params = {
				boardId: board._id,
				userEmail: userEmail
			};

			$http
				.put($rootScope.endPoint + "/board/members", params)
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

		this.createComment = function(params) {
			var defer = $q.defer();

			$http
				.post($rootScope.endPoint + "/comment", params)
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
	});
})();
