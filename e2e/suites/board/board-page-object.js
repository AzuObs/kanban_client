(function() {
	"use strict";

	var boardListPO,
		BoardListPageObject,
		boardModalPO,
		BoardModalPageObject,
		userModalPO,
		UserModalPageObject;

	BoardModalPageObject = require(process.cwd() + "/e2e/suites/board-modal/board-modal-page-object.js");
	BoardListPageObject = require(process.cwd() + "/e2e/suites/board-list/board-list-page-object.js");
	boardListPO = new BoardListPageObject();
	boardModalPO = new BoardModalPageObject();


	var BoardPageObject = function() {
		this.get = function() {
			boardListPO.get();
			boardListPO.createBoard();
			boardListPO.clickBoard("foobar");
		};


		this.isPresent = function() {
			return $(".category-view").isPresent();
		};


		this.deleteFoobarBoard = function() {
			browser.get(boardListPO.getUrl());
			boardListPO.clickEditBoard("foobar");
			boardModalPO.clickDeleteButton();
			boardModalPO.confirmDeletion("foobar");
		};


		this.hasAddUserButton = function() {
			return $("button[ng-click='addMember($event)']").isPresent();
		};


		this.getMenuUsersCount = function() {
			return element.all(by.repeater("user in users")).count();
		};


		this.addUser = function(email) {
			element(by.model("addMemberInput")).sendKeys(email);
			$("button[ng-click='addMember($event)']").click();
		};


		this.hasCreateCategoryButton = function() {
			return $(".form-group button[ng-click='createCategory()']").isPresent();
		};


		this.getCategoryCount = function() {
			return element.all(by.repeater("category in board.categories")).count();
		};


		this.createCategory = function(categoryName) {
			element(by.model("newCat")).sendKeys(categoryName + "\n");
		};


		this.hasUsers = function() {
			return element.all(by.css(".user-container")).first().isPresent();
		};


		this.hasUserSelectionSection = function() {
			return $(".user-selection").isPresent();
		};


		this.clickUser = function() {
			element.all(by.css(".user-container")).first().click();
		};


		this.userModalIsOpen = function() {
			return $(".user-modal").isPresent();
		};


		this.closeUserModal = function() {
			$(".modal-close .glyphicon-remove").click();
		};


		this.getMenuUser = function(user) {
			return $$(".user-menu-container .user-container")
				.each(function(_user_) {
					_user_
						.evaluate("user.username")
						.then(function(_username_) {
							if (user.username === _username_) {
								user.element = _user_;
							}
						});
				});
		};


		this.getTaskUser = function(taskName, user) {
			var task;

			return $$(".task-container")
				.each(function(_task_) {
					_task_
						.evaluate("task.name")
						.then(function(_taskName_) {
							if (_taskName_ === taskName) {
								task = _task_;
							}
						});
				})
				.then(function() {
					task
						.all(by.css(".user-container"))
						.each(function(_user_) {
							_user_
								.evaluate("user.username")
								.then(function(_username_) {
									if (_username_ === user.username) {
										user.element = _user_;
									}
								});
						});
				});
		};


		this.getMenuUserCount = function(username) {
			var userMenuCount = 0;

			return $$(".user-menu-container .user-container")
				.each(function(user) {
					user
						.evaluate("user.username")
						.then(function(res) {
							if (res === username) {
								userMenuCount++;
							}
						});
				})
				.then(function() {
					return userMenuCount;
				});
		};


		this.getUserMenuSelection = function(menu) {
			return $(".user-menu-container .user-selection");
		};


		this.getTaskUserList = function(task) {
			return $$(".task-container")
				.each(function(_task_) {
					_task_
						.evaluate("task.name")
						.then(function(taskname) {
							if (task.name === taskname) {
								task.element = _task_.element(by.css(".user-list"));
							}
						});
				});
		};


		this.dragAndDrop = function(origin, destination) {
			browser
				.actions()
				.dragAndDrop(origin, destination)
				.perform();
		};


		this.getTaskUserCount = function(taskName, username) {
			var task, userCount;

			return $$(".task-container")
				.each(function(_task_) {
					_task_
						.evaluate("task.name")
						.then(function(_taskName_) {
							if (_taskName_ === taskName) {
								task = _task_;
							}
						});
				})
				.then(function() {
					userCount = 0;
					return task
						.all(by.css(".user-container"))
						.each(function(user) {
							user
								.evaluate("user.username")
								.then(function(_username_) {
									if (_username_ === username) {
										userCount++;
									}
								});
						})
						.then(function() {
							return userCount;
						});
				});
		};


		this.taskHasUser = function(taskName, username) {
			var task, hasUser = false;

			return element
				.all(by.css(".task-container"))
				.each(function(_task) {
					_task.evaluate("task.name").then(function(name) {
						if (name === taskName) {
							task = _task;
						}
					});
				})
				.then(function() {
					return task
						.all(by.repeater("user in task.users"))
						.each(function(task) {
							task.evaluate("user.username").then(function(name) {
								if (name === username) {
									hasUser = true;
								}
							});
						})
						.then(function() {
							return hasUser;
						});
				});
		};


		this.createTask = function(categoryName, taskName) {
			var category;

			element.all(by.css(".category-container"))
				.each(function(cat) {
					cat.evaluate("category.name").then(function(name) {
						if (name === categoryName) {
							category = cat;
						}
					});
				})
				.then(function() {
					category.element(by.model("taskName")).sendKeys(taskName + "\n");
				});
		};


		this.categoryHasTask = function(categoryName, taskName) {
			var category, hasTask = false;

			return element
				.all(by.css(".category-container"))
				.each(function(cat) {
					cat.evaluate("category.name").then(function(name) {
						if (name === categoryName) {
							category = cat;
						}
					});
				})
				.then(function() {
					return category
						.all(by.css(".task-container"))
						.each(function(task) {
							task.evaluate("task.name").then(function(name) {
								if (name === taskName) {
									hasTask = true;
								}
							});
						})
						.then(function() {
							return hasTask;
						});
				});
		};


		this.userMenuHasUser = function(username) {
			var hasUser = false;

			return $(".user-selection")
				.all(by.repeater("user in users"))
				.each(function(user) {
					user
						.evaluate("user.username")
						.then(function(res) {
							if (res === username) {
								hasUser = true;
							}
						});
				})
				.then(function() {
					return hasUser;
				});
		};
	};

	module.exports = BoardPageObject;
})();
