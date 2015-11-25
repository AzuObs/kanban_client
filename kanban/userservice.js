(function() {
	"use strict";

	var userService = angular.module("userServiceModule", ["ngResource"]);


	userService.service("userService", function($log, $rootScope, $q, $http) {
		var User = this;
		User.user = {};

		User.createComment = function(params) {
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

		User.getUser = function(userId) {
			var defer = $q.defer();

			$http
				.get($rootScope.endPoint + "/user/" + sessionStorage.userId)
				.success(function(res) {
					for (var i = 0; i < res.boards.length; i++) {
						for (var x = 0; x < res.boards[i].categories.length; x++) {
							for (var y = 0; y < res.boards[i].categories[x].tasks.length; y++) {
								for (var z = 0; z < res.boards[i].categories[x].tasks[y].workers.length; z++) {
									var workerId = res.boards[i].categories[x].tasks[y].workers[z];
									for (var xi = 0; xi < res.boards[i].workers.length; xi++) {
										if (workerId === res.boards[i].workers[xi]._id) {
											res.boards[i].categories[x].tasks[y].workers[z] = res.boards[i].workers[xi];
										}
									}
								}
							}
						}
					}

					User.user = res;
					defer.resolve(res);
				})
				.error(function(err) {
					defer.reject(err);
				});

			return defer.promise;
		};

		User.createCategory = function(params) {
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

		User.deleteCategory = function(boardId, catId) {
			var defer = $q.defer();

			$http
				.delete($rootScope.endPoint + "/category/" + User.user._id + "/" + boardId + "/" + catId)
				.success(function(res) {
					defer.resolve(res);
				})
				.error(function(err) {
					defer.reject(err);
				});

			return defer.promise;
		};

		User.createTask = function(params) {
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

		User.deleteTask = function(cId, tId) {
			var defer = $q.defer();
			var userId = User.user._id;
			var boardId = User.user.boards[0]._id;

			$http
				.delete($rootScope.endPoint + "/task/" + userId + "/" + boardId + "/" + cId + "/" + tId)
				.success(function(res) {
					defer.resolve(res);
				})
				.error(function(err) {
					defer.reject(err);
				});

			return defer.promise;
		};

		User.updateCategories = function() {
			var defer = $q.defer();
			var params = {
				userId: User.user._id,
				boardId: User.user.boards[0]._id,
				categories: User.user.boards[0].categories
			};

			$http
				.put($rootScope.endPoint + "/categories", params)
				.success(function(res) {
					for (var i = 0; i < res.length; i++) {
						for (var x = 0; x < res[i].tasks.length; x++) {
							for (var y = 0; y < res[i].tasks[x].workers.length; y++) {
								for (var z = 0; z < User.user.boards[0].workers.length; z++) {
									if (res[i].tasks[x].workers[y] === User.user.boards[0].workers[z]._id) {
										res[i].tasks[x].workers[y] = User.user.boards[0].workers[z];
									}
								}
							}
						}
					}

					defer.resolve(res);
				})
				.error(function(err) {
					defer.reject(err);
				});

			return defer.promise;
		};

		User.createComment = function(params) {
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

		User.createBoard = function(params) {
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

		User.deleteBoard = function(params) {
			var defer = $q.defer();

			$http
				.delete($rootScope.endPoint + "/board", params)
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
