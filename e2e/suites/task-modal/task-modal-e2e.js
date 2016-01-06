(function() {
	"use strict";

	var taskModalPO, TaskModalPageObject;

	TaskModalPageObject = require(process.cwd() + "/e2e/suites/task-modal/task-modal-page-object.js");
	taskModalPO = new TaskModalPageObject();


	describe("The task modal", function() {
		it("initializes the test", function() {
			taskModalPO.initTest();
		});

		it("exists after clicking on a board task", function() {
			taskModalPO.clickTask();
			expect(taskModalPO.taskModalIsPresent()).toEqual(true);
		});

		it("closes when the close button is clicked", function() {
			expect(taskModalPO.taskModalIsPresent()).toEqual(true);
			taskModalPO.clickCloseModal();
			expect(taskModalPO.taskModalIsPresent()).toEqual(false);
			taskModalPO.clickTask();
			expect(taskModalPO.taskModalIsPresent()).toEqual(true);
		});

		describe("title", function() {
			it("can be edited when clicked", function() {
				expect(taskModalPO.titleIsPresent()).toEqual(true);
				expect(taskModalPO.getTitle()).toEqual("0- task");
				expect(taskModalPO.canEditTitle()).toEqual(false);

				taskModalPO.clickTitle();
				expect(taskModalPO.canEditTitle()).toEqual(true);
				taskModalPO.setTitle("new title");
				expect(taskModalPO.getTitle()).toEqual("new title");
			});

			it("stops being edited when clicked outside of the title", function() {
				expect(taskModalPO.titleIsPresent()).toEqual(true);
				expect(taskModalPO.canEditTitle()).toEqual(true);
				expect(taskModalPO.getTitle()).toEqual("new title");

				taskModalPO.clickOutsideOfTitle();
				expect(taskModalPO.titleIsPresent()).toEqual(true);
				expect(taskModalPO.canEditTitle()).toEqual(false);
				expect(taskModalPO.getTitle()).toEqual("new title");
			});

			it("can be edited when clicking on the option 'rename task'", function() {
				expect(taskModalPO.titleIsPresent()).toEqual(true);
				expect(taskModalPO.canEditTitle()).toEqual(false);
				expect(taskModalPO.getTitle()).toEqual("new title");

				taskModalPO.clickRenameTaskButton();
				expect(taskModalPO.canEditTitle()).toEqual(true);
				taskModalPO.setTitle("foo");
				expect(taskModalPO.getTitle()).toEqual("foo");
			});

			it("stops being edited when reclicking on the option 'rename task'", function() {
				expect(taskModalPO.titleIsPresent()).toEqual(true);
				expect(taskModalPO.canEditTitle()).toEqual(true);
				expect(taskModalPO.getTitle()).toEqual("foo");

				taskModalPO.clickRenameTaskButton();
				expect(taskModalPO.titleIsPresent()).toEqual(true);
				expect(taskModalPO.canEditTitle()).toEqual(false);
				expect(taskModalPO.getTitle()).toEqual("foo");
			});
		});

		describe("users", function() {
			it("have a section where they are listed", function() {
				expect(taskModalPO.userListIsPresent()).toEqual(true);
			});

			it("can be added via the add member option", function() {
				expect(taskModalPO.getUserCount()).toEqual(0);
				taskModalPO.clickAddMemberButton();
				taskModalPO.addFirstMember();
				expect(taskModalPO.getUserCount()).toEqual(1);
			});

			it("can be removed via the remove member option", function() {
				expect(taskModalPO.getUserCount()).toEqual(1);
				taskModalPO.clickRemoveMemberButton();
				taskModalPO.removeFirstMember();
				expect(taskModalPO.getUserCount()).toEqual(0);
			});
		});

		describe("category", function() {
			it("can be changed via the 'change category' option", function() {
				expect(taskModalPO.getCategoryCount()).toEqual(2);
				expect(taskModalPO.categoryHasTask("0- foobar", "foo")).toEqual(true);

				taskModalPO.clickChangeCategoryButton();
				taskModalPO.selectFirstCategory();

				expect(taskModalPO.getCategoryCount()).toEqual(2);
				expect(taskModalPO.categoryHasTask("1- foobar", "foo")).toEqual(true);

			});
		});

		describe("comments", function() {
			it("can be created", function() {
				expect(taskModalPO.getCommentsCount()).toEqual(0);
				taskModalPO.createComment("foobar");
				expect(taskModalPO.getCommentsCount()).toEqual(1);
			});

			it("show when they were created relative to now", function() {
				expect(taskModalPO.getCommentTime("foobar")).toEqual("just now");
			});

			it("section can be scrolled through vertically", function() {
				expect(taskModalPO.getCommentsCount()).toEqual(1);
				for (var i = 0; i < 10; i++) {
					taskModalPO.createComment("foo");
				}

				expect(taskModalPO.getCommentY("foobar")).toBeGreaterThan(700);
				taskModalPO.yScroll("$('.comment-list')", 1000);
				expect(taskModalPO.getCommentY("foobar")).toBeLessThan(700);
			});
		});

		it("'delete task' option checks for input before deleting", function() {
			expect(taskModalPO.hasDeleteTaskButton()).toEqual(true);
			taskModalPO.clickDeleteTaskButton();
			expect(taskModalPO.hasDeletionConfirmation()).toEqual(true);
		});

		it("can be deleted via the 'delete task' option", function() {
			taskModalPO.confirmTaskDeletion("foo");
			browser.waitForAngular();
			expect(taskModalPO.taskModalIsPresent()).toEqual(false);
			expect(taskModalPO.categoryHasTask("0- foobar", "foobar")).toEqual(false);
			expect(taskModalPO.categoryHasTask("1- foobar", "foobar")).toEqual(false);
		});

		it("exists after all tests have been run", function() {
			taskModalPO.exitAndCleanUp();
		});
	});
})();
