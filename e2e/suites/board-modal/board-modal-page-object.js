(function() {
	"use strict";

	var boardListPO, BoardListPageObject;

	BoardListPageObject = require(process.cwd() + "/e2e/suites/board-list/board-list-page-object.js");
	boardListPO = new BoardListPageObject();

	var BoardModalPageObject = function() {

		this.get = function() {
			boardListPO.get();
			boardListPO.boardsContain("foobar").then(function(res) {
				if (!res) {
					boardListPO.createBoard("foobar");
				}
			});
			this.clickEditBoard("foobar");
		};


		this.boardsContain = function(boardname) {
			return boardListPO.boardsContain(boardname);
		};


		this.clickEditBoard = function(boardname) {
			return boardListPO.clickEditBoard(boardname);
		};


		this.hasCloseButton = function() {
			return $(".modal-close button.glyphicon-remove").isPresent();
		};


		this.clickCloseButton = function() {
			$(".modal-close button.glyphicon-remove").click();
		};


		this.modalIsPresent = function() {
			return boardListPO.hasModal();
		};


		this.modalHasTitle = function() {
			return $(".board-modal .modal-title").isPresent();
		};


		this.modalHasBoardOptions = function() {
			return $(".board-modal .modal-options").isPresent();
		};


		this.clickTitle = function() {
			$(".modal-title ng-transclude").click();
		};


		this.clickOutsideOfTitle = function() {
			$(".board-modal").click();
		};


		this.titleIsEditable = function() {
			return $(".modal-title input").isDisplayed();
		};


		this.clickEditTitleOption = function() {
			$(".modal-options .edit-text-toggle").click();
		};


		this.clearTitleValue = function() {
			$(".modal-title input").clear();
		};


		this.setTitleValue = function(newTitle) {
			$(".modal-title input").sendKeys(newTitle);
			this.clickOutsideOfTitle();
		};


		this.hasDeleteOption = function() {
			return $(".deletable-object-toggle").isPresent();
		};


		this.getTitleValue = function() {
			return $(".modal-title").evaluate("board.name");
		};


		this.clickDeleteButton = function() {
			$(".deletable-object-toggle").click();
		};


		this.hasDeletionConfirmationInput = function() {
			return $(".modal-options input[ng-model='repeatObjectName']").isPresent();
		};


		this.confirmDeletion = function(input) {
			$(".modal-options input[ng-model='repeatObjectName']").sendKeys(input + "\n");
		};
	};

	module.exports = BoardModalPageObject;
})();
