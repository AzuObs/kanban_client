(function() {
	"use strict";


	var BoardListPageObject = function() {
		var boardList, createBoardButton, createBoardInput, config;

		config = {
			identityPageUrl: "http://localhost:3000/app/#/kanban/identity",
			boardListPageUrl: "http://localhost:3000/app/#/kanban/user/sheldon"
		};

		this.get = function() {
			browser.get(config.identityPageUrl);
			$("button[ng-click='authenticate()']").click();

			boardList = $(".board-list-container");
			createBoardButton = boardList.element(by.css("button[ng-click='createBoard()']"));
			createBoardInput = boardList.element(by.model("boardName"));
		};

		this.isPresent = function() {
			return boardList.isPresent();
		};

		this.getBoardListPageUrl = function() {
			return config.boardListPageUrl;
		};

		this.getBoardsCount = function() {
			return boardList.all(by.repeater("board in boards")).count();
		};

		this.hasBoardListSection = function() {
			return boardList.element(by.className("board-list")).isPresent();
		};

		this.boardContains = function(boardname) {
			boardList.all(by.repeater("board in boards")).each(function(boardElement) {
				boardElement.getText().then(function(boardText) {
					if (boardText.match(boardname)) {
						return true;
					}
				});
			});
		};

		this.hasCreateBoardButton = function() {
			return createBoardButton.isPresent();
		};

		this.hasCreateBoardInput = function() {
			return createBoardInput.isPresent();
		};

		this.createBoard = function() {
			createBoardInput.sendKeys("foobar");
			createBoardButton.click();
		};

		this.clickBoard = function(boardname) {
			var board;

			boardList.all(by.repeater("board in boards"))
				.each(function(boardElement) {
					boardElement.evaluate("board.name").then(function(res) {
						if (res === boardname && !board) {
							board = boardElement;
						}
					});
				})
				.then(function() {
					board.click();
				});
		};

		this.clickEditBoard = function() {
			boardList.element(by.css("a[ng-click='openBoardModal(board)']")).click();
		};

		this.hasModal = function() {
			return $(".board-modal").isPresent();
		};
	};

	module.exports = BoardListPageObject;

})();
