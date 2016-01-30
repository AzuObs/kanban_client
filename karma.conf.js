(function() {
	"use strict";

	module.exports = function(config) {
		config.set({
			basePath: "src/",
			files: [
				"common/bower-components/angular/angular.js",
				"common/bower-components/angular-bootstrap/ui-bootstrap.js",
				"common/bower-components/angular-mocks/angular-mocks.js",
				"common/bower-components/angular-resource/angular-resource.js",
				"common/bower-components/angular-ui-router/release/angular-ui-router.js",
				"common/bower-components/angular-ui-sortable/sortable.js",
				"common/bower-components/jquery/dist/jquery.js",
				"common/bower-components/jquery-ui/jquery-ui.js",
				"*.js",
				"about-page/**/*.js",
				"board-list-page/**/*.js",
				"board-page/**/*.js",
				"error-page/**/*.js",
				"oauth-page/**/*.js",
				"common/directives/**/*.js",
				"common/filters/**/*.js",
				"common/modified-bower-components/**/*.js",
				"common/providers/**/*.js",
				"common/views/**/*.js"
			],
			browsers: ["Chrome"],
			autoWatch: true,
			frameworks: ["jasmine"]
		});
	};
})();
