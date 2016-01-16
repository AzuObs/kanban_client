module.exports = function(config) {
	config.set({
		basePath: "./",

		files: [
			"src/bower_components/jquery/dist/jquery.js",
			"src/bower_components/non-bower_components/jquery-ui/jquery-ui-fixed.js",
			"src/bower_components/angular/angular.js",
			"src/bower_components/angular-mocks/angular-mocks.js",
			"src/bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
			"src/bower_components/angular-resource/angular-resource.js",
			"src/bower_components/angular-ui-router/release/angular-ui-router.js",
			"src/bower_components/angular-ui-sortable/sortable.js",
			"src/!(bower_components)/**/*.js",
			"src/*.js",
			"src/**/*.html"
		],

		browsers: [
			"Chrome"
		],

		frameworks: ["jasmine"],

		plugins: [
			"karma-jasmine",
			"karma-chrome-launcher",
			"karma-ng-html2js-preprocessor"
		],

		preprocessors: {
			"src/**/*.html": ["ng-html2js"]
		},

		ngHtml2JsPreprocessor: {
			stripPrefix: "src/",
			moduleName: "html2JsModule"
		}
	});
};
