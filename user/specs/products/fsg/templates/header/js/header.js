$(window).on('load resize', function () {
    $('.header.base').css("cssText", "position: fixed !important;");
    var pageBodyTop = $('.header.base').outerHeight();
    $('main.content,.responsiveAccessDenialWidget.content').css('padding-top',  pageBodyTop);

    UX.cookiePolicyPopupWidget.cookieRemoved = function () {
        pageBodyTop = $('.header.base').outerHeight();
        $('main.content,.responsiveAccessDenialWidget.content').css('padding-top',  pageBodyTop);
    };
});