exports.config = {
	framework: "jasmine",
	seleniumAddress: "http://localhost:4444/wd/hub",
	suites: {
		navbar: "suites/navbar/navbar-e2e.js",
		footer: "suites/footer/footer-e2e.js",
		about: "suites/about/about-e2e.js",
		oauth: "suites/oauth/oauth-e2e.js",
		boardList: "suites/board-list/board-list-e2e.js",
		boardModal: "suites/board-modal/board-modal-e2e.js",
		board: "suites/board/board-e2e.js"
	},
	capabilities: {
		browserName: "chrome"
	},

	jasmineNodeOpts: {
		showColors: true
	}
};
