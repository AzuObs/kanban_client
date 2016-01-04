(function() {
	"use strict";

	var boardListPO, BoardListPageObject;

	BoardListPageObject = require(process.cwd() + "/e2e/suites/board-list/board-list-page-object.js");
	boardListPO = new BoardListPageObject();

	var BoardModalPageObject = function() {
		this.get = function() {
			boardListPO.get();
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
			$(".modal-title h3").click();
		};

		this.clickOutsideOfTitle = function() {
			$(".board-modal").click();
		};

		this.titleIsEditable = function() {
			return $(".modal-title input[type='text']").isDisplayed();
		};

		this.clickEditBoardOption = function() {
			$(".modal-options button.edit-board").click();
		};

		this.clearTitleValue = function() {
			$(".modal-title input").clear();
		};

		this.setTitleValue = function(newTitle) {
			$(".modal-title input").sendKeys(newTitle);
			this.clickOutsideOfTitle();
		};

		this.hasDeleteOption = function() {
			return $(".modal-options button.delete-board").isPresent();
		};

		this.getTitleValue = function() {
			return $(".modal-title").evaluate("board.name");
		};

		this.clickDeleteButton = function() {
			$(".modal-options button.delete-board").click();
		};

		this.hasDeletionConfirmationInput = function() {
			return $(".modal-options").element(by.css("input.delete-board[type='text']")).isPresent();
		};

		this.confirmDeletion = function(input) {
			$("input.delete-board").sendKeys(input + "\n");
		};
	};

	module.exports = BoardModalPageObject;
})();
