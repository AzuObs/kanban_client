(function() {
	"use strict";

	var boardListPage, BoardListPageObject, config;


	config = {
		identityPageUrl: "http://localhost:3000/app/#/kanban/identity",
		boardListPageUrl: "http://localhost:3000/app/#/kanban/user/sheldon"
	};

	BoardListPageObject = function() {
		var boardList, createBoardButton, createBoardInput;

		browser.get(config.identityPageUrl);
		$("button[ng-click='authenticate()']").click();

		boardList = $(".board-list-container");
		createBoardButton = boardList.element(by.css("button[ng-click='createBoard()']"));
		createBoardInput = boardList.element(by.model("boardName"));


		this.isPresent = function() {
			return boardList.isPresent();
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

	describe("The board list page", function() {
		boardListPage = new BoardListPageObject();

		it("is present", function() {
			expect(boardListPage.isPresent()).toEqual(true);
		});

		it("has a 'list of boards' section", function() {
			expect(boardListPage.hasBoardListSection()).toEqual(true);
		});

		it("has a 'create a board section'", function() {
			expect(boardListPage.hasCreateBoardInput()).toEqual(true);
			expect(boardListPage.hasCreateBoardButton()).toEqual(true);
		});

		it("shows more boards after creating a board", function() {
			var n;

			boardListPage.getBoardsCount().then(function(res) {
				n = res;
			});

			boardListPage.createBoard();

			boardListPage.getBoardsCount().then(function(res) {
				expect(res).toEqual(n + 1);
			});
		});

		it("can open a modal by clicking on a board edit button", function() {
			boardListPage.clickEditBoard();
			expect(boardListPage.hasModal()).toEqual(true);
		});

		it("can redirect to app/#/board/:boardname after clicking on a board", function() {
			browser.refresh();
			expect(browser.getCurrentUrl()).toEqual(config.boardListPageUrl);
			boardListPage.clickBoard("foobar");
			expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/app/#/kanban/board/foobar");
		});
	});
})();
