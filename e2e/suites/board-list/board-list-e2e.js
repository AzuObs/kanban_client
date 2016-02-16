(function() {
	"use strict";

	var boardListPO, BoardListPageObject;

	BoardListPageObject = require(process.cwd() + "/e2e/suites/board-list/board-list-page-object");
	boardListPO = new BoardListPageObject();

	describe("The board list page", function() {
		beforeEach(function() {
			boardListPO.get();
		});

		it("is present", function() {
			expect(boardListPO.isPresent()).toEqual(true);
		});

		it("has a 'list of boards' section", function() {
			expect(boardListPO.hasBoardListSection()).toEqual(true);
		});

		it("has a 'create a board section'", function() {
			expect(boardListPO.hasCreateBoardInput()).toEqual(true);
			expect(boardListPO.hasCreateBoardButton()).toEqual(true);
		});

		it("shows more boards after creating a board", function() {
			expect(boardListPO.getBoardsCount()).toEqual(1);
			boardListPO.createBoard();
			expect(boardListPO.getBoardsCount()).toEqual(2);
		});

		it("can open a modal by clicking on a board edit button", function() {
			boardListPO.clickEditBoard("foobar");
			expect(boardListPO.hasModal()).toEqual(true);
		});

		it("can redirect to src/#/board/:boardname after clicking on a board", function() {
			boardListPO.clickBoard("foobar");
			expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/src/#/board/foobar");
		});

		it("cleans up and exits after the test is done", function() {
			boardListPO.cleanUpAndExit();
		});
	});
})();
