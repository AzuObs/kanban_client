exports.config = {
	framework: 'jasmine',
	seleniumAddress: 'http://localhost:4444/wd/hub',
	suites: {
		navbar: 'suites/navbar-test.js'
	},
	capabilities: {
		browserName: "chrome"
	},

	jasmineNodeOpts: {
		showColors: true
	}
};
