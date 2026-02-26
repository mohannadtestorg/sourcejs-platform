$(window).on('load resize', function () {

    $('.pageHeader').css('position', 'fixed');

    if ($('.pageHeader .hubpage-menu').length) {
        $('.pageHeader').css('max-height', '100%')
    }

    $('.pageHeader').css('position', 'fixed');

    var pageBodyTop = $('.pageHeader').outerHeight();
    var coolBar = $('.coolBar');
    var additionalHeight = 0;
    var institutionWrapper = $('.institution-wrapper-mobile');
    var institutionHeight = 0;


    if (coolBar.length && coolBar.hasClass('coolBar--res')) {
        additionalHeight +=  coolBar.find('.coolBar__wrapper').outerHeight();
    }



    var pageHeaderHeight = pageBodyTop + additionalHeight;

    $('.pageBody').css('padding-top',  pageHeaderHeight);
    $('.w-slide').css('top', pageBodyTop);


    UX.cookiePolicyPopupWidget.cookieRemoved = function () {
        pageBodyTop = $('.pageHeader').outerHeight();
        var pageHeaderHeight = pageBodyTop + additionalHeight;

        $('.pageBody').css('padding-top',  pageHeaderHeight);

        $('.w-slide').css('top', pageBodyTop);
    };
});


