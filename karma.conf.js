module.exports = function(config) {
	config.set({
		basePath: "./",

		files: [
			"app/bower_components/jquery/dist/jquery.js",
			"app/bower_components/non-bower_components/jquery-ui/jquery-ui-fixed.js",
			"app/bower_components/angular/angular.js",
			"app/bower_components/angular-mocks/angular-mocks.js",
			"app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
			"app/bower_components/angular-resource/angular-resource.js",
			"app/bower_components/angular-ui-router/release/angular-ui-router.js",
			"app/bower_components/angular-ui-sortable/sortable.js",
			"app/!(bower_components)/**/*.js",
			"app/*.js",
			"app/**/*.html",
			"tests/**/*.js"
		],

		frameworks: ["jasmine"],

		plugins: [
			"karma-jasmine",
			"karma-chrome-launcher",
			"karma-ng-html2js-preprocessor"
		],

		preprocessors: {
			"app/**/*.html": ["ng-html2js"]
		},

		ngHtml2JsPreprocessor: {
			stripPrefix: "app/",
			moduleName: "html2JsModule"
		}
	});
};
