exports.config = {
	framework: "jasmine",
	seleniumAddress: "http://localhost:4444/wd/hub",
	suites: {
		navbar: "suites/navbar-e2e.js",
		footer: "suites/footer-e2e.js",
		about: "suites/about-e2e.js",
		oauth: "suites/oauth-e2e.js",
		boardList: "suites/board-list/board-list-e2e.js",
		boardModal: "suites/board-list/board-modal-e2e.js"
	},
	capabilities: {
		browserName: "chrome"
	},

	jasmineNodeOpts: {
		showColors: true
	}
};
