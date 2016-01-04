(function() {
	"use strict";

	var boardListPO, BoardListPageObject;

	BoardListPageObject = require(process.cwd() + "/e2e/suites/board-list/board-list-page-object.js");
	boardListPO = new BoardListPageObject();

	var BoardModalPageObject = function() {
		var boardModalPO, config;

		this.get = function() {
			boardListPO.get();
		};
	};

	module.exports = BoardModalPageObject;
})();
