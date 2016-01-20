(function() {
	"use strict";

	var module = angular.module("userAPIModule", []);

	module.factory("userAPI", [function() {
		var user, access_token;

		var userInterface = {
			setUser: function(_user_) {
				user = _user_;
			},

			getUser: function() {
				return user;
			},

			setAccessToken: function(token) {
				access_token = token;
			},

			getAccessToken: function() {
				return access_token;
			}
		};

		return userInterface;
	}]);
})();
