//const circle = require('../literatum.js');

literatum.FullPageLoading = function () {
    this.message = '';
};

literatum.FullPageLoading.prototype = new literatum.Loading();

literatum.FullPageLoading.prototype.start = function () {
    $("body").append('<div class="loading-overlay"><div class="loading-container"><div class="loading"></div><div class="loading-message">' + this.message + '</div></div></div></div>');
    $(".loading-overlay").fadeIn(200);
    return this;
};

literatum.FullPageLoading.prototype.done = function () {
    var $overlay = $(".loading-overlay");
    $overlay.fadeOut(200);
    $overlay.remove();
};

literatum.FullPageLoading.prototype.setMessage = function (message) {
    this.message = message;
};