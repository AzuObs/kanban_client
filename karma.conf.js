(function() {
	"use strict";

	module.exports = function(config) {
		config.set({
			autoWatch: true,
			basePath: "src/",
			files: [
				"common/bower-components/jquery/dist/jquery.js",
				"common/bower-components/jquery-ui/jquery-ui.js",
				"common/bower-components/angular/angular.js",
				"common/bower-components/angular-bootstrap/ui-bootstrap-tpls.js",
				"common/bower-components/angular-mocks/angular-mocks.js",
				"common/bower-components/angular-resource/angular-resource.js",
				"common/bower-components/angular-ui-router/release/angular-ui-router.js",
				"common/bower-components/angular-ui-sortable/sortable.js",
				"common/bower-components/angular-loading-bar/build/loading-bar.js",
				"common/modified-bower-components/**/*.js",
				"**/*.html",
				"*.js",
				"common/directives/**/*.js",
				"common/filters/**/*.js",
				"common/providers/**/*.js",
				"common/views/**/*.js",
				"oauth-page/**/*.js",
				"about-page/**/*.js",
				"board-list-page/**/*.js",
				"board-page/**/*.js",
				"error-page/**/*.js"
			],
			frameworks: ["jasmine"],
			ngHtml2JsPreprocessor: {
				stipPrefix: "src/",
				moduleName: "html2JsModule"
			},
			plugins: [
				'karma-jasmine',
				'karma-ng-html2js-preprocessor'
			],
			port: 9876,
			preprocessors: {
				"**/*.html": ["ng-html2js"]
			}
		});
	};
})();
