(function() {
	"use strict";

	var module = angular.module("environmentModule", []);

	module.constant("ENV", {
		appState: "development",
		debugApp: true,
		apiEndpoint: "http://localhost:8000/api",
		websiteVersion: "v1.0"
	});

})();
