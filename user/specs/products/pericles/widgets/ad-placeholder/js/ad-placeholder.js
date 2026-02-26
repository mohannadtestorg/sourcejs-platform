UX.sticko.ads = function () {
    if (UX.sticko.$element.closest('.sticko-ads').length) {
        UX.sticko.$element.css({
            "right" : ( ($(document).width() - $('.container').width() ) / 2 - 320),
            "left" : "auto",
        });

    }

    var stickyAdElement = $('.sticko-ads').find('.sticko__md');



    var pageHeaderHeight = $('.pageHeader').outerHeight(),
        pagesNavHeight = 0,
        $pagesNav = $('.stickybar__wrapper');


    if ($pagesNav.length) {
        pagesNavHeight = $pagesNav.outerHeight();
    }
    var topPosition = pagesNavHeight + pageHeaderHeight;

    stickyAdElement.css( "top", topPosition );

};

