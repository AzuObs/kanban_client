(function() {
	"use strict";

	var boardPagePO, BoardPageObject;

	BoardPageObject = require(process.cwd() + "/e2e/suites/board/board-page-object.js");
	boardPagePO = new BoardPageObject();

	var UserModalPageObject = function() {
		this.closeModal = function() {
			$(".modal-close .glyphicon-remove").click();
		};
	};

	module.exports = UserModalPageObject;
})();
