(function() {
	"use strict";

	var boardListPO,
		BoardListPageObject,
		boardModalPO,
		BoardModalPageObject;

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
			return $("form[name='amForm'] button").isPresent();
		};


		this.getMenuUsersCount = function() {
			return element.all(by.repeater("user in users")).count();
		};


		this.addUser = function(email) {
			element(by.model("addMemberInput")).sendKeys(email);
			$("form[name='amForm']").submit();
		};


		this.hasCreateCategoryButton = function() {
			return $("form[name='newCatForm'] button").isPresent();
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
			$$(".user-container").first().click();
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


		this.getCategoryXCoordinate = function(categoryName) {
			var category;

			return $$(".category-container")
				.each(function(cat) {
					cat
						.evaluate("category.name")
						.then(function(res) {
							if (categoryName === res) {
								category = cat;
							}
						});
				})
				.then(function() {
					return category.getLocation().then(function(res) {
						return res.x;
					});
				});
		};


		this.xScroll = function(element, distance) {
			browser.executeScript(element + ".scrollLeft(" + distance + ");");
		};


		this.yScroll = function(element, distance) {
			browser.executeScript(element + ".scrollTop(" + distance + ");");
			browser.executeScript("$('.task-list').scrollTop(1000);");
		};


		this.categoryHasCreateTaskInput = function() {
			return $$(".category-container")
				.first()
				.element(by.css("form[name='addTaskForm'] input"))
				.isPresent();
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


		this.getTaskYCoordinate = function(taskName) {
			var task;

			return $$(".task-container")
				.each(function(_task_) {
					_task_
						.evaluate("task.name")
						.then(function(res) {
							if (taskName === res) {
								task = _task_;
							}
						});
				})
				.then(function() {
					return task.getLocation().then(function(res) {
						return res.y;
					});
				});
		};

		this.deleteCategory = function(categoryName) {
			var category;

			$$(".category-container")
				.each(function(cat) {
					cat
						.evaluate("category.name")
						.then(function(res) {
							if (categoryName === res) {
								category = cat;
							}
						});
				})
				.then(function() {
					category.element(by.css(".close-category")).click();
				});
		};


		this.getCategory = function(category) {
			return $$(".category-header h4")
				.each(function(cat) {
					cat
						.evaluate("category.name")
						.then(function(res) {
							if (category.name === res) {
								category.element = cat;
							}
						});
				});
		};


		this.getTaskCount = function() {
			return $$(".task-container").count();
		};


		this.taskModalIsPresent = function() {
			return $(".task-modal").isPresent();
		};


		this.clickTask = function() {
			$$(".task-container").first().click();
		};


		this.clickCloseTaskModal = function() {
			$(".modal .glyphicon-remove").click();
		};


		this.closeTask = function(taskName) {
			var task;

			$$(".task-container")
				.each(function(t) {
					t
						.evaluate("task.name")
						.then(function(res) {
							if (taskName === res) {
								task = t;
							}
						});
				})
				.then(function() {
					task.element(by.css(".close-task")).click();
				});
		};


		this.taskHasCloseButton = function() {
			return $$(".task-container")
				.first()
				.element(by.css("button.close-task"))
				.isPresent();
		};


		this.getNameOfCategoryInFirstPosition = function() {
			return $$(".category-container")
				.first()
				.evaluate("category.name")
				.then(function(res) {
					return res;
				});
		};

		this.categoryHasCloseButton = function() {
			return $$(".category-container button.close-category").first().isPresent();
		};


		this.getUserMenuSelection = function(menu) {
			return $(".user-menu-container .user-selection");
		};


		this.getTaskUsersCount = function(taskName) {
			var task;

			return $$(".task-container")
				.each(function(t) {
					t
						.evaluate("task.name")
						.then(function(res) {
							if (taskName === res) {
								task = t;
							}
						});
				})
				.then(function() {
					return task.all(by.css(".user-container")).count();
				});
		};


		this.getTask = function(task) {
			$$(".task-container")
				.each(function(t) {
					t
						.evaluate("task.name")
						.then(function(res) {
							if (task.name === res) {
								task.element = t;
							}
						});
				});
		};


		this.getTaskList = function(category) {
			$$(".category-container")
				.each(function(c) {
					c
						.evaluate("category.name")
						.then(function(res) {
							if (category.name === res) {
								category.element = c.element(by.css(".task-list"));
							}
						});
				});
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
