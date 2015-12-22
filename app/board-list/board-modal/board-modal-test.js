(function() {
	"use strict";

	describe("boardModalCtrl", function() {
		var $scope, board, $modalInstance;

		beforeEach(module("boardModalModule"));

		beforeEach(inject(function($rootScope, $controller, $modal) {
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
		}));


		describe("$scope.closeModal()", function() {
			var modalArgs;

			beforeEach(inject(function() {
				modalArgs = undefined;
				spyOn($modalInstance, "dismiss").and.callFake(function() {
					modalArgs = arguments;
				});
			}));

			it("is defined", function() {
				expect($scope.closeModal).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.closeModal).toEqual("function");
			});

			it("calls closes the modal", function() {
				$scope.closeModal();
				expect(modalArgs).not.toEqual(undefined);
			});
		});


		describe("$scope.renameBoard()", function() {
			var argsAPI, deferAPI, $log;

			beforeEach(inject(function(boardAPI, $q, _$log_) {
				$log = _$log_;
				argsAPI = undefined;
				spyOn(boardAPI, "updateBoard").and.callFake(function() {
					deferAPI = $q.defer();
					argsAPI = arguments;
					return deferAPI.promise;
				});
			}));

			it("is defined", function() {
				expect($scope.renameBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.renameBoard).toEqual("function");
			});

			it("log an error when no event is passed it", function() {
				$log.reset();
				$scope.renameBoard();
				expect($log.error.logs[0][0]).toBeDefined();
			});

			it("enables editing on click", function() {
				var e;
				e = {
					type: "click"
				};

				$scope.isEditingName = false;
				$scope.renameBoard(e);
				expect($scope.isEditingName).toEqual(true);
			});

			it("calls boardAPI with argument board on keypress enter", function() {
				var e;

				e = {
					type: "keypress",
					which: 13
				};

				$scope.renameBoard(e);
				expect(argsAPI[0]).toEqual($scope.board);
			});

			it("increments local board._v on API resolve", function() {
				var e;

				e = {
					type: "keypress",
					which: 13
				};

				$scope.board._v = 0;
				$scope.renameBoard(e);
				deferAPI.resolve();
				$scope.$apply();
				expect($scope.board._v).toEqual(1);
			});

			it("logs an error on API reject", function() {
				var e, msg;

				$log.reset();
				msg = "foo";
				e = {
					type: "keypress",
					which: 13
				};

				$scope.board._v = 0;
				$scope.renameBoard(e);
				deferAPI.reject(msg);
				$scope.$apply();

				expect($log.error.logs[0][0]).toEqual(msg);
			});
		});


		describe("$scope.deleteBoard()", function() {
			var $log, boardArgs, deferBoard, modalArgs;

			beforeEach(inject(function(_$log_, boardAPI, $q) {
				$log = _$log_;

				boardArgs = undefined;
				spyOn(boardAPI, "deleteBoard").and.callFake(function() {
					deferBoard = $q.defer();
					boardArgs = arguments;
					return deferBoard.promise;
				});

				modalArgs = undefined;
				spyOn($modalInstance, "dismiss").and.callFake(function() {
					modalArgs = arguments;
				});

				$scope.board = {
					_id: "123",
					name: "foo"
				};
			}));

			it("is defined", function() {
				expect($scope.deleteBoard).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.deleteBoard).toEqual("function");
			});

			it("logs an error if no arguments are passed to it", function() {
				$log.reset();
				$scope.deleteBoard();
				expect($log.error.logs[0][0]).toBeDefined();
			});

			it("toggles delete mode on/off if user clicks outside of .delete-board-input", function() {
				var e;

				e = {
					type: "click",
					target: angular.element("<div></div>")
				};
				$scope.isDeletingBoard = true;
				$scope.repeatBoardName = "foo";
				$scope.deleteBoard(e);

				expect($scope.isDeletingBoard).toEqual(false);
				expect($scope.repeatBoardName).toEqual("");
			});

			it("checks the repeatBoardName is equal to boardName after keypress 'enter'", function() {
				var e;

				e = {
					type: "keypress",
					which: 13
				};

				$scope.board.name = "foo";
				$scope.repeatBoardName = "bar";
				$scope.deleteBoard(e);
				expect(boardArgs).toEqual(undefined);

				$scope.repeatBoardName = "foo";
				$scope.deleteBoard(e);
				expect(boardArgs[0]).toEqual($scope.board._id);
			});

			it("makes an API call to delete the board with (boardId)", function() {
				var e;

				e = {
					type: "keypress",
					which: 13
				};

				$scope.board.name = "foo";
				$scope.repeatBoardName = "foo";
				$scope.deleteBoard(e);
				expect(boardArgs[0]).toEqual($scope.board._id);
			});

			it("removes the board from local memory", function() {
				var e;

				e = {
					type: "keypress",
					which: 13
				};

				$scope.boards = [];
				$scope.board.name = "foo";
				$scope.boards.push($scope.board);
				expect($scope.boards.length).toEqual(1);

				$scope.repeatBoardName = "foo";
				$scope.deleteBoard(e);
				$scope.$apply(function() {
					deferBoard.resolve();
				});
				expect($scope.boards.length).toEqual(0);
			});

			it("closes the modal instance", function() {
				var e;

				e = {
					type: "keypress",
					which: 13
				};

				$scope.boards = [];
				$scope.board.name = "foo";
				$scope.repeatBoardName = "foo";
				$scope.deleteBoard(e);
				$scope.$apply(function() {
					deferBoard.resolve();
				});
				expect(modalArgs).not.toEqual(undefined);
			});
		});


		describe("$scope.cancelEditing()", function() {
			var $log;

			beforeEach(inject(function(_$log_) {
				$log = _$log_;
			}));

			it("is defined", function() {
				expect($scope.cancelEditing).toBeDefined();
			});

			it("is a function", function() {
				expect(typeof $scope.cancelEditing).toEqual("function");
			});

			it("logs an error when no event is passed", function() {
				$log.reset();
				$scope.cancelEditing();
				expect($log.error.logs[0][0]).toBeDefined();
			});

			it("only lets user edit name if he clicks on a .edit-board element", function() {
				var e;

				$scope.isEditingName = true;
				e = {
					target: angular.element("<div class='edit-board'></div>")
				};
				$scope.cancelEditing(e);
				expect($scope.isEditingName).toEqual(true);

				$scope.isEditingName = true;
				e = {
					target: angular.element("<div class=''></div>")
				};
				$scope.cancelEditing(e);
				expect($scope.isEditingName).toEqual(false);
			});

			it("only lets user delete board if he click on a .delete-board element", function() {
				var e;

				$scope.isDeletingBoard = true;
				e = {
					target: angular.element("<div class='delete-board'></div>")
				};
				$scope.cancelEditing(e);
				expect($scope.isDeletingBoard).toEqual(true);

				$scope.isDeletingBoard = true;
				e = {
					target: angular.element("<div class=''></div>")
				};
				$scope.cancelEditing(e);
				expect($scope.isDeletingBoard).toEqual(false);
			});

			it("resets $scope.repeatBoardName when a user clicks outside of a .delete-board element", function() {
				var e;

				$scope.isDeletingBoard = true;
				$scope.repeatBoardName = "foo";
				e = {
					target: angular.element("<div></div>")
				};
				$scope.cancelEditing(e);
				expect($scope.repeatBoardName).toEqual("");
			});
		});


		describe("$scope.isDeletingBoard", function() {
			it("is defined", function() {
				expect($scope.isDeletingBoard).toBeDefined();
			});

			it("is a boolean", function() {
				expect(typeof $scope.isDeletingBoard).toEqual("boolean");
			});

			it("is false", function() {
				expect($scope.isDeletingBoard).toEqual(false);
			});
		});


		describe("$scope.isEditingName", function() {
			it("is defined", function() {
				expect($scope.isEditingName).toBeDefined();
			});

			it("is a boolean", function() {
				expect(typeof $scope.isEditingName).toEqual("boolean");
			});

			it("is false", function() {
				expect($scope.isEditingName).toEqual(false);
			});
		});


		describe("$scope.repeatBoardName", function() {
			it("is defined", function() {
				expect($scope.repeatBoardName).toBeDefined();
			});

			it("is a string", function() {
				expect(typeof $scope.repeatBoardName).toEqual("string");
			});

			it("is empty", function() {
				expect($scope.repeatBoardName).toEqual("");
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
