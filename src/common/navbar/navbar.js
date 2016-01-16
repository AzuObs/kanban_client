(function() {

	var module = angular.module("navbarModule", ["ui.bootstrap", "ui.router"]);

	module.value("APP_NAME", "kanban");
	module.value("JP_APP_NAME", "看板");

	module.controller("navbarCtrl", ["$scope", "APP_NAME", "JP_APP_NAME", function($scope, APP_NAME, JP_APP_NAME) {
		$scope.appName = APP_NAME;
		$scope.jpAppName = JP_APP_NAME;
		$scope.navLinks = [{
			state: "kanban.oauth",
			name: "Login"
		}, {
			state: "kanban.boardList",
			name: "Visit Boards"
		}, {
			state: "kanban.about",
			name: "About"
		}];
	}]);
})();
