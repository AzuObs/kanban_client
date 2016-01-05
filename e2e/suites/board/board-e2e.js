(function() {
	"use strict";

	var boardPO, BoardPageObject;

	BoardPageObject = require(process.cwd() + "/e2e/suites/board/board-page-object.js");
	boardPO = new BoardPageObject();


	describe("The board page", function() {
		it("exists", function() {
			boardPO.get();
			expect(boardPO.isPresent()).toEqual(true);
		});

		it("has an add user button", function() {
			expect(boardPO.hasAddUserButton()).toEqual(true);
		});

		it("adds users", function() {
			expect(boardPO.getMenuUsersCount()).toEqual(1);
			boardPO.addUser("raj@mail.com");
			expect(boardPO.getMenuUsersCount()).toEqual(2);
		});

		it("has a create category button", function() {
			expect(boardPO.hasCreateCategoryButton()).toEqual(true);
		});

		it("creates categories", function() {
			expect(boardPO.getCategoryCount()).toEqual(0);
			boardPO.createCategory("0- foobar");
			expect(boardPO.getCategoryCount()).toEqual(1);
		});


		describe("users", function() {
			it("are present", function() {
				expect(boardPO.hasUsers()).toEqual(true);
			});

			it("have their user selection section", function() {
				expect(boardPO.hasUserSelectionSection()).toEqual(true);
			});

			it("open a modal when clicked", function() {
				expect(boardPO.userModalIsOpen()).toEqual(false);
				boardPO.clickUser();
				expect(boardPO.userModalIsOpen()).toEqual(true);
				boardPO.closeUserModal();
				expect(boardPO.userModalIsOpen()).toEqual(false);
			});

			it("can be dragged and cloned into tasks", function() {
				var user, task;

				user = {
					username: "raj",
					element: undefined
				};

				task = {
					name: "new task",
					element: undefined
				};

				boardPO.createTask("0- foobar", "new task");
				expect(boardPO.categoryHasTask("0- foobar", "new task")).toEqual(true);
				expect(boardPO.taskHasUser("new task", "raj")).toEqual(false);

				boardPO.getMenuUser(user);
				boardPO.getTaskUserList(task);

				browser.controlFlow().execute(function() {
					boardPO.dragAndDrop(user.element, task.element);
				});

				expect(boardPO.taskHasUser("new task", "raj")).toEqual(true);
				expect(boardPO.userMenuHasUser("raj")).toEqual(true);
			});

			it("can be dragged and dropped from one task to another", function() {
				var userr, task;

				userr = {
					username: "raj",
					element: undefined
				};

				task = {
					name: "new task destination",
					element: undefined
				};

				boardPO.createTask("0- foobar", "new task destination");
				expect(boardPO.categoryHasTask("0- foobar", "new task destination")).toEqual(true);
				expect(boardPO.taskHasUser("new task", "raj")).toEqual(true);

				boardPO.getTaskUser("new task", userr);
				boardPO.getTaskUserList(task);

				browser.controlFlow().execute(function() {
					boardPO.dragAndDrop(userr.element, task.element);
				});

				expect(boardPO.taskHasUser("new task destination", "raj")).toEqual(true);
				expect(boardPO.taskHasUser("new task", "raj")).toEqual(false);
			});

			it("cannot be duplicated", function() {
				var user, task;

				user = {
					username: "raj",
					element: undefined
				};

				task = {
					name: "new task destination",
					element: undefined
				};

				expect(boardPO.categoryHasTask("0- foobar", "new task destination")).toEqual(true);
				expect(boardPO.taskHasUser("new task destination", "raj")).toEqual(true);

				boardPO.getMenuUser(user);
				boardPO.getTaskUserList(task);

				browser.controlFlow().execute(function() {
					boardPO.dragAndDrop(user.element, task.element);
				});

				expect(boardPO.taskHasUser("new task destination", "raj")).toEqual(true);
				expect(boardPO.getTaskUserCount("new task destination", "raj")).toEqual(1);
			});

			it("cannot be dropped in the user section", function() {
				var user, menu;

				user = {
					username: "raj",
					element: undefined
				};

				menu = {
					element: undefined
				};

				expect(boardPO.categoryHasTask("0- foobar", "new task destination")).toEqual(true);
				expect(boardPO.taskHasUser("new task destination", "raj")).toEqual(true);

				boardPO.getTaskUser("new task destination", user);
				menu.element = boardPO.getUserMenuSelection();

				browser.controlFlow().execute(function() {
					boardPO.dragAndDrop(user.element, menu.element);
				});

				expect(boardPO.taskHasUser("new task destination", "raj")).toEqual(true);
				expect(boardPO.getMenuUserCount("raj")).toEqual(1);
			});
		});


		describe("categories", function() {
			it("are present", function() {
				expect(boardPO.getCategoryCount()).toEqual(1);
			});

			it("can be scrolled horizontally", function() {
				expect(boardPO.getCategoryXCoordinate("0- foobar")).toBeGreaterThan(0);

				for (var i = 1; i < 6; i++) {
					boardPO.createCategory(i + "- foobar");
				}

				expect(boardPO.getCategoryCount()).toEqual(6);
				expect(boardPO.getCategoryXCoordinate("0- foobar")).toBeLessThan(0);
				boardPO.xScroll("$('.category-view')", 0);
				expect(boardPO.getCategoryXCoordinate("0- foobar")).toBeGreaterThan(0);
			});

			it("can contain tasks", function() {
				expect(boardPO.categoryHasTask("0- foobar", "new task")).toEqual(true);
			});

			it("have add task input", function() {
				expect(boardPO.categoryHasCreateTaskInput()).toEqual(true);
			});

			it("can add tasks", function() {
				expect(boardPO.categoryHasTask("0- foobar", "2- foo")).toEqual(false);
				boardPO.createTask("0- foobar", "2- foo");
				expect(boardPO.categoryHasTask("0- foobar", "2- foo")).toEqual(true);
			});

			it("can scroll vertically through their tasks list", function() {
				for (var i = 3; i < 10; i++) {
					boardPO.createTask("0- foobar", i + "- foo");
				}
				expect(boardPO.getTaskYCoordinate("new task")).toBeGreaterThan(0);
				boardPO.yScroll("$('.task-list')", 1000);
				expect(boardPO.getTaskYCoordinate("new task")).toBeLessThan(0);
			});

			it("have a close button", function() {
				expect(boardPO.getCategoryCount()).toEqual(6);
				expect(boardPO.categoryHasCloseButton()).toEqual(true);
			});

			it("can be deleted", function() {
				expect(boardPO.getCategoryCount()).toEqual(6);
				boardPO.deleteCategory("5- foobar");
				expect(boardPO.getCategoryCount()).toEqual(5);
			});

			it("can be dropped into the category container", function() {
				var category, categoryContainer;

				category = {
					name: "2- foobar",
					element: undefined
				};

				expect(boardPO.getNameOfCategoryInFirstPosition()).toEqual("0- foobar");

				boardPO.getCategory(category);
				categoryContainer = $(".category-list");

				boardPO.getCategory(category);

				browser.controlFlow().execute(function() {
					boardPO.dragAndDrop(category.element, categoryContainer);
				});

				expect(boardPO.getNameOfCategoryInFirstPosition()).toEqual("2- foobar");
			});
		});


		describe("tasks", function() {
			it("are present", function() {
				expect(boardPO.categoryHasTask("0- foobar", "new task"));
			});

			it("have a close button", function() {
				expect(boardPO.taskHasCloseButton()).toEqual(true);
			});

			it("can be deleted", function() {
				expect(boardPO.getTaskCount()).toEqual(10);
				boardPO.closeTask("new task");
				expect(boardPO.getTaskCount()).toEqual(9);
			});

			it("open a modal when clicked", function() {
				expect(boardPO.taskModalIsOpen()).toEqual(false);
				boardPO.clickTask();
				expect(boardPO.taskModalIsOpen()).toEqual(true);
				boardPO.clickCloseTaskModal();
				expect(boardPO.taskModalIsOpen()).toEqual(false);
			});

			it("contain users", function() {
				expect(boardPO.getTaskUsersCount("new task destination")).toEqual(1);
			});

			it("contain a comments section", function() {
				expect(boardPO.tasksHaveCommentsSection()).toEqual(true);
			});

			it("can be dropped between category task lists", function() {
				var task, category;

				task = {
					name: "new task destination",
					element: undefined
				};

				category = {
					name: "1- foobar",
					element: undefined
				};

				expect(boardPO.categoryHasTask("0- foobar", "new task destination")).toEqual(true);
				expect(boardPO.categoryHasTask("1- foobar", "new task destination")).toEqual(false);

				boardPO.getTask(task);
				boardPO.getTaskList(category);

				browser.controlFlow().execute(function() {
					boardPO.dragAndDrop(task.element, category.element);
				});

				expect(boardPO.categoryHasTask("0- foobar", "new task destination")).toEqual(false);
				expect(boardPO.categoryHasTask("1- foobar", "new task destination")).toEqual(true);

			});
		});

		it("deletes the board after all tests are completed", function() {
			boardPO.deleteFoobarBoard();
		});
	});
})();
