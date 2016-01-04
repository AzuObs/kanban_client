(function() {

	var FooterObject = function() {
		var footer = $(".footer-view");
		var footerAnchor = footer.element(by.css("a"));

		this.get = function() {
			browser.get("http://localhost:3000/app/#/kanban/identity");
		};

		this.getFooterText = function() {
			return footer.getText();
		};

		this.isPresent = function() {
			return footer.isPresent();
		};

		this.getFooter = function() {
			return footer;
		};

		this.anchorIsPresent = function() {
			return footerAnchor.isPresent();
		};

		this.getAnchorLink = function() {
			return footerAnchor.getAttribute("href");
		};
	};

	module.exports = FooterObject;
})();
