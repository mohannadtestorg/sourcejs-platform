commerce.FullPageLoading = function () {
};

commerce.FullPageLoading.prototype = new commerce.Loading();

commerce.FullPageLoading.prototype.start = function () {
    $("body").append('<div class="loading-overlay"><div class="loading"></div></div>');
    $(".loading-overlay").fadeIn(200);
};

commerce.FullPageLoading.prototype.done = function () {
    var $overlay = $(".loading-overlay");
    $overlay.fadeOut(200);
    $overlay.remove();
};