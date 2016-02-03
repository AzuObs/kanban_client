(function() {
	"use strict";

	var boardPO, BoardPageObject;

	BoardPageObject = require(process.cwd() + "/e2e/suites/board/board-page-object.js");
	boardPO = new BoardPageObject();

	var UserModalPageObject = function() {
		this.typeRemoveUserConfirmation = function(input) {
			element(by.model("repeatObjectName")).sendKeys(input + "\n");
		};


		this.getUserCount = function() {
			return $$(".user-selection .user-container").count();
		};


		this.clickRemoveUserButton = function() {
			$(".deletable-object-toggle").click();
		};


		this.removeUserConfirmationIsPresent = function() {
			return element(by.model("repeatObjectName")).isDisplayed();
		};


		this.removeUserButtonIsPresent = function() {
			return $(".deletable-object-toggle").isPresent();
		};


		this.checkCheckbox = function(labelName) {
			$$(".change-rbac label")
				.each(function(lbl) {
					lbl
						.getText()
						.then(function(text) {
							if (text === labelName) {
								lbl.element(by.css("input")).click();
							}
						});
				});
		};


		this.isCheckboxChecked = function(labelName) {
			var label;

			return $$(".change-rbac label")
				.each(function(lbl) {
					lbl
						.getText()
						.then(function(text) {
							if (text === labelName) {
								label = lbl;
							}
						});
				})
				.then(function() {
					return label.element(by.css("input")).getAttribute("checked").then(function(res) {
						return res ? true : false;
					});
				});
		};


		this.clickChangePriviledgeButton = function() {
			$$("button.change-rbac").first().click();
		};


		this.getCheckboxCount = function() {
			return $$(".change-rbac input[type='checkbox']").count();
		};


		this.userImgIsPresent = function() {
			return $(".user-modal .user-container img").isPresent();
		};

		this.titleIsPresent = function() {
			return $(".modal-title").isPresent();
		};

		this.userModalIsPresent = function() {
			return $(".user-modal").isPresent();
		};

		this.clickUser = function(username) {
			$$(".user-selection .user-container")
				.each(function(user) {
					user
						.evaluate("user.username")
						.then(function(res) {
							if (res === username) {
								user.click();
							}
						});
				});
		};

		this.initTest = function() {
			boardPO.get();
			boardPO.addUser("raj@mail.com");
		};

		this.boardIsPresent = function() {
			return boardPO.isPresent();
		};

		this.cleanUpAndExit = function() {
			boardPO.deleteFoobarBoard();
		};

		this.clickCloseModal = function() {
			$(".modal-close .glyphicon-remove").click();
		};
	};

	module.exports = UserModalPageObject;
})();
