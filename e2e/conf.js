exports.config = {
	framework: "jasmine",
	seleniumAddress: "http://localhost:4444/wd/hub",
	suites: {
		navbar: "suites/navbar-e2e.js",
		footer: "suites/footer-e2e.js"
	},
	capabilities: {
		browserName: "chrome"
	},

	jasmineNodeOpts: {
		showColors: true
	}
};
