(function() {
	"use strict";

	describe("copyChildMinHeight directive", function() {
		var $compile, $scope;

		beforeEach(function() {
			module("copyChildMinHeightDirectiveModule");
			inject(function($rootScope, _$compile_) {
				$compile = _$compile_;
				$scope = $rootScope.$new();
			});
		});

		it("is an attribute directive that give the element a min-heigth value equal to the min-height of it's child", function() {
			var html = "<div copy-child-min-height>" +
				"<div style='min-height:10px;'></div>" +
				"</div>";

			$scope.$apply(function() {
				html = $compile(html)($scope);
			});

			expect(html.css("min-height")).toEqual("10px");
		});

		describe("restricted", function() {
			it("can be an attribute", function() {
				var html = "<div copy-child-min-height>" +
					"<div style='min-height:10px;'></div>" +
					"</div>";

				$scope.$apply(function() {
					html = $compile(html)($scope);
				});

				expect(html.scope().childMinHeight).toEqual("10px");
			});

			it("cannot be an element", function() {
				var html = "<copy-child-min-height>" +
					"<div style='min-height:10px;'></div>" +
					"</copy-child-min-height>";

				$scope.$apply(function() {
					html = $compile(html)($scope);
				});

				html.scope();
				expect(html.scope).toThrow();
			});
		});


		describe("scope", function() {
			var scope, html;

			beforeEach(function() {
				html = "<div copy-child-min-height>" +
					"<div style='min-height:10px;'></div>" +
					"</div>";

				$scope.$apply(function() {
					html = $compile(html)($scope);
				});

				scope = html.scope();
			});

			describe("scope.childElem", function() {
				it("is defined", function() {
					expect(scope.childElem).toBeDefined();
				});

				it("is a HTMLDivElement", function() {
					expect(Object.prototype.toString.call(scope.childElem)).toEqual("[object HTMLDivElement]");
				});

				it("is equal to our inner html", function() {
					expect(scope.childElem).toEqual(angular.element(html.html())[0]);
				});
			});

			describe("scope.childMinHeight", function() {
				it("is defined", function() {
					expect(scope.childMinHeight).toBeDefined();
				});

				it("is a string", function() {
					expect(typeof scope.childMinHeight).toEqual("string");
				});

				it("is equal to the min-height of our inner html", function() {
					expect(scope.childMinHeight).toEqual($(html.children()[0]).css("min-height"));
				});
			});

			describe("scope.setMinHeight()", function() {
				it("is defined", function() {
					expect(scope.setMinHeight).toBeDefined();
				});

				it("is a function	", function() {
					expect(typeof scope.setMinHeight).toEqual("function");
				});

				it("sets the minimum height of the element", function() {
					html.attr("min-height", "0px");
					scope.setMinHeight("10px");
					expect(html.css("min-height")).toEqual("10px");
				});
			});
		});
	});
})();
