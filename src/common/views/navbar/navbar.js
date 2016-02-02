(function() {

	var module = angular.module("navbarModule", [
		"expandableTextDirectiveModule"
	]);

	module.controller("navbarCtrl", [
		"$scope",
		function($scope) {
			$scope.appName = "KANBAN";
			$scope.jpAppName = "看板";
			$scope.menuLinks = [{
				state: "kanban.boardList",
				name: "Boards"
			}, {
				state: "kanban.about",
				name: "About"
			}, {
				state: "kanban.oauth",
				name: "Login"
			}];
		}
	]);
})();
