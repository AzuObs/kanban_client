(function() {
	"use stric";

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
			boardPO.createCategory("foobar");
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

				boardPO.createTask("foobar", "new task");
				expect(boardPO.categoryHasTask("foobar", "new task")).toEqual(true);
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

				boardPO.createTask("foobar", "new task destination");
				expect(boardPO.categoryHasTask("foobar", "new task destination")).toEqual(true);
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

				expect(boardPO.categoryHasTask("foobar", "new task destination")).toEqual(true);
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
				var user, task;

				user = {
					username: "raj",
					element: undefined
				};

				menu = {
					element: undefined
				};

				expect(boardPO.categoryHasTask("foobar", "new task destination")).toEqual(true);
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

			});

			it("can be scrolled horizontally", function() {

			});

			it("can contain tasks", function() {

			});

			it("have an add task button", function() {

			});

			it("can add tasks", function() {

			});

			it("can scroll vertically through their tasks container", function() {

			});

			it("have a close button", function() {

			});

			it("can be deleted", function() {

			});

			it("can be dragged", function() {

			});

			it("can be dropped into the category container", function() {

			});
		});


		describe("tasks", function() {
			it("are present", function() {

			});

			it("have a close button", function() {

			});

			it("can be deleted", function() {

			});

			it("open a modal when clicked", function() {

			});

			it("contain users", function() {

			});

			it("contain comments", function() {

			});

			it("can be dragged", function() {

			});

			it("can be dropped between categories", function() {
				// DELETE AND REPLACE THIS WITH A REAL TEST, 
				// CURRENTLY THIS IS ONLY SOMETHING TO TIDYKEEP WHILE I DEBUG THE TEST
				boardPO.deleteFoobarBoard();
				expect(true).toEqual(true);
			});
		});
	});
})();
