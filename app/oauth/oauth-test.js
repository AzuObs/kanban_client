describe("oauth unit tests", function() {

	describe("oauthCtrl", function() {
		var $controller;

		beforeEach(module("oauthModule"));
		beforeEach(inject(function(_$controller_) {
			$controller = _$controller_;
		}));

		describe("$scope.newAccUsr", function() {
			it("exist", function() {
				var $scope = {};
				var controller = $controller("oauthCtrl", {
					$scope: $scope
				});
				expect($scope.newAccUsr).toBeDefined();
			});

			it("=== ''", function() {
				var $scope = {};
				var controller = $controller("oauthCtrl", {
					$scope: $scope
				});
				expect($scope.newAccUsr).toEqual("");
			});
		});
	});
});
