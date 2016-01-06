(function() {
	"use strict";

	var boardPO, BoardPageObject;

	BoardPageObject = require(process.cwd() + "/e2e/suites/board/board-page-object.js");
	boardPO = new BoardPageObject();

	var TaskModalPageObject = function() {
		this.confirmTaskDeletion = function(input) {
			$(".modal-options input.delete-task").sendKeys(input + "\n");
		};

		this.clickDeleteTaskButton = function() {
			$(".modal-options button.btn-danger.delete-task").click();
		};

		this.hasDeletionConfirmation = function() {
			return $(".modal-options input.delete-task").isPresent();
		};

		this.hasDeleteTaskButton = function() {
			return $(".modal-options button.delete-task").isPresent();
		};

		this.getCommentY = function(commentBody) {
			var cmt;

			return $$(".comment-content")
				.each(function(comment) {
					comment
						.evaluate("comment.content")
						.then(function(res) {
							if (commentBody === res) {
								cmt = comment;
							}
						});
				})
				.then(function() {
					return cmt.getLocation().then(function(res) {
						return res.y;
					});
				});
		};

		this.yScroll = function(el, val) {
			boardPO.yScroll(el, val);
		};

		this.getCommentTime = function(commentBody) {
			var cmt;

			return $$(".comment-container")
				.each(function(comment) {
					comment
						.evaluate("comment.content")
						.then(function(res) {
							if (commentBody === res) {
								cmt = comment;
							}
						});
				})
				.then(function() {
					return cmt.element(by.css("small.text-muted")).getText();
				});
		};


		this.createComment = function(commentBody) {
			element(by.model("commentInput")).clear();
			element(by.model("commentInput")).sendKeys(commentBody);
			$(".modal-newcomment button").click();
		};

		this.getCommentsCount = function() {
			return $$(".comment-container").count();
		};

		this.selectFirstCategory = function() {
			$(".modal-options ").all(by.repeater("category in changeableCategories")).first().click();
		};

		this.clickChangeCategoryButton = function() {
			$(".modal-options button[ng-disabled='!changeableCategories.length']").click();
		};

		this.categoryHasTask = function(category, task) {
			return boardPO.categoryHasTask(category, task);
		};

		this.getCategoryCount = function() {
			return boardPO.getCategoryCount();
		};

		this.removeFirstMember = function() {
			$(".modal-options li[ng-click='removeUserFromTask(user)']").click();
		};

		this.clickRemoveMemberButton = function() {
			$(".modal-options button[ng-disabled='!task.users.length']").click();
		};


		this.addFirstMember = function() {
			element.all(by.repeater("user in addableUsers")).first().click();
		};

		this.clickAddMemberButton = function() {
			$(".modal-options button[ng-disabled='task.users.length===5']").click();
		};

		this.getUserCount = function() {
			return $$(".modal-user-list .user-container").count();
		};

		this.userListIsPresent = function() {
			return $(".modal-user-list").isPresent();
		};

		this.clickRenameTaskButton = function() {
			$(".modal-options button[ng-click='editTaskName($event)']").click();
		};

		this.clickOutsideOfTitle = function() {
			$(".task-modal").click();
		};

		this.setTitle = function(input) {
			$(".modal-title input").clear().sendKeys(input);
		};

		this.clickTitle = function() {
			$(".modal-title h3").click();
		};

		this.getTitle = function() {
			return $(".modal-title").evaluate("task.name");
		};

		this.canEditTitle = function() {
			return $(".modal-title input").isDisplayed();
		};

		this.titleIsPresent = function() {
			return $(".modal-title").isPresent();
		};

		this.initTest = function() {
			boardPO.get();
			boardPO.createCategory("0- foobar");
			boardPO.createCategory("1- foobar");
			boardPO.createTask("0- foobar", "0- task");
		};

		this.clickTask = function() {
			boardPO.clickTask();
		};

		this.taskModalIsPresent = function() {
			return boardPO.taskModalIsPresent();
		};

		this.clickCloseModal = function() {
			boardPO.clickCloseTaskModal();
		};

		this.exitAndCleanUp = function() {
			boardPO.deleteFoobarBoard();
		};
	};

	module.exports = TaskModalPageObject;

})();
