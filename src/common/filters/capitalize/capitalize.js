(function() {
	"use strict";

	var module = angular.module("capitalizeFilterModule", []);

	module.filter("capitalize", [function() {

		var capitalize = function(arr) {
			for (var i = 0; i < arr.length; i++) {
				// if the word is ""
				if (arr[i].length === 0) {
					arr = arr.splice(i, 1);
				}

				//if the word is 1 letter long, do not capitalize
				else if (arr[i].length === 1) {
					//
				}

				//otherwise word length > 1
				else {
					arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1, arr[i].length);
				}
			}
		};

		var reconstruct = function(arr) {
			var str = "";

			for (var i = 0; i < arr.length; i++) {
				// check if the arr element is the last one
				if (i === arr.length - 1) {
					str += arr[i];
					break;
				}

				str += arr[i] + " ";
			}

			return str;
		};

		var filter = function(text) {
			var lowerCaseText = text.toLowerCase();
			var words = lowerCaseText.split(" ");
			capitalize(words);
			text = reconstruct(words);

			return text;
		};

		return filter;
	}]);
})();
