(function() {
	"use strict";

	describe("boardModalCtrl", function() {
		var $scope, board, $modalInstance;

		beforeEach(function() {
			module("boardModalModule");
			inject(function($rootScope, $controller, $modal) {
				$scope = $rootScope.$new();
				board = {};

				$modalInstance = $modal.open({
					template: "<div></div>"
				});

				$controller("boardModalCtrl", {
					$scope: $scope,
					board: board,
					$modalInstance: $modalInstance
				});
			});
		});


		describe("$scope.updateTitle()", function() {
			var apiCalled, apiCallArgs;

			beforeEach(inject(function(boardFactory) {
				spyOn(boardFactory, "updateBoard").and.callFake(function() {
					apiCalled = true;
					apiCallArgs = arguments;
				});
			}));

			it("is defined", function() {
				expect($scope.updateTitle).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.updateTitle).toEqual("function");
			});

			it("calls boardFactory.updateBoard", function() {
				apiCalled = undefined;
				$scope.updateTitle();
				expect(apiCalled).toEqual(true);
			});

			it("calls boardFactory.updateBoard with args [$scope.board]", function() {
				apiCallArgs = undefined;
				$scope.board = {
					name: "foobar"
				};
				$scope.updateTitle();
				expect(apiCallArgs[0]).toEqual($scope.board);
			});
		});


		describe("$scope.toggleIsEditingTitle()", function() {
			it("is defined", function() {
				expect($scope.toggleIsEditingTitle).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.toggleIsEditingTitle).toEqual("function");
			});

			it("toggles $scope.isEditingTitle", function() {
				$scope.isEditingTitle = false;
				$scope.toggleIsEditingTitle();
				expect($scope.isEditingTitle).toEqual(true);

				$scope.isEditingTitle = true;
				$scope.toggleIsEditingTitle();
				expect($scope.isEditingTitle).toEqual(false);
			});
		});


		describe("$scope.closeModal()", function() {
			var apiCalled;

			beforeEach(inject(function() {
				spyOn($modalInstance, "dismiss").and.callFake(function() {
					apiCalled = true;
				});
			}));

			it("is defined", function() {
				expect($scope.closeModal).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.closeModal).toEqual("function");
			});

			it("calls closes the modal", function() {
				apiCalled = false;
				$scope.closeModal();
				expect(apiCalled).toEqual(true);
			});
		});


		describe("$scope.deleteBoard()", function() {
			var apiCalled, apiCallArgs, defer;

			beforeEach(inject(function(userFactory, $q) {
				spyOn(userFactory, "deleteBoard").and.callFake(function() {
					defer = $q.defer();
					apiCalled = true;
					apiCallArgs = arguments;
					return defer.promise;
				});
			}));

			it("is defined", function() {
				expect($scope.deleteBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.deleteBoard).toEqual("function");
			});

			it("makes an API call to delete the board", function() {
				apiCalled = false;
				$scope.deleteBoard();
				expect(apiCalled).toEqual(true);
			});

			it("makes an API call to delete the board with args [$scope.board._id]", function() {
				apiCallArgs = [];
				$scope.board._id = "foobar";
				$scope.deleteBoard();
				expect(apiCallArgs[0]).toEqual($scope.board._id);
			});

			it("calls $scope.closeModal on resolve", function() {
				var closeModalCalled = false;
				spyOn($scope, "closeModal").and.callFake(function() {
					closeModalCalled = true;
				});

				$scope.deleteBoard();
				$scope.$apply(function() {
					defer.resolve();
				});
				expect(closeModalCalled).toEqual(true);
			});
		});


		describe("$scope.isEditingTitle", function() {
			it("is defined", function() {
				expect($scope.isEditingTitle).toBeDefined();
			});

			it("is a boolean", function() {
				expect(typeof $scope.isEditingTitle).toEqual("boolean");
			});

			it("is false", function() {
				expect($scope.isEditingTitle).toEqual(false);
			});
		});


		describe("$scope.board", function() {
			it("is defined", function() {
				expect($scope.board).toBeDefined();
			});

			it("is an object", function() {
				expect(Object.prototype.toString.call($scope.board)).toEqual("[object Object]");
			});

			it("is a copy of the board injected into the controller", function() {
				expect($scope.board).toEqual(board);
			});
		});
	});
})();
