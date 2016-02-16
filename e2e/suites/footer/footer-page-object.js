(function() {

  var FooterObject = function() {
    var footer = $(".footer-view");
    var footerAnchor = footer.all(by.css("a")).first();

    this.get = function() {
      browser.get("http://localhost:3000/src/#/identity");
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
