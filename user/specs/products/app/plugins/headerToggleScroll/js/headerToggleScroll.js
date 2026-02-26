(function () {
    var headerToggleScroll={
        isMobile:false,
        vPort: "screen-sm",
        lastScrollTop:0,
        isHeaderHidden: false,
        coolBarTopPos:0,
        scrollMargin:30,
        scrollTop:0,
        init: function () {
            headerToggleScroll.control();
            headerToggleScroll.toggleHeader();
        },
        control: function () {
            $(document).on(headerToggleScroll.vPort + '-on', function () {
                headerToggleScroll.isMobile = true;
            });
            $(document).on(headerToggleScroll.vPort + '-off', function () {
                headerToggleScroll.isMobile = false;
            });
        },
        toggleHeader: function () {
            headerToggleScroll.coolBarTopPos = $('.stickybar').offset().top;
            $(window).scroll(function(){
                if(headerToggleScroll.isMobile) {
                    headerToggleScroll.scrollTop = $(this).scrollTop();
                    if (headerToggleScroll.scrollTop > headerToggleScroll.lastScrollTop && headerToggleScroll.scrollTop > headerToggleScroll.scrollMargin) {
                        if (!headerToggleScroll.isHeaderHidden) {
                            $('header').addClass('hide-header');
                            $('.stickybar').addClass('stickybar--stick-to-top');
                            $("header").stop().animate({top: -120}, 250, function () {});
                            $(".stickybar--stick-to-top").stop().animate({top: 0}, 250, function () {});
                            headerToggleScroll.isHeaderHidden = true;
                        }
                    } else {
                        if (headerToggleScroll.isHeaderHidden) {
                            $("header").stop().animate({top: 0}, 250, function () {});
                            $(".stickybar--stick-to-top").stop().animate({top: $('header').height()}, 250, function () {});
                            $('header').removeClass('hide-header');
                            $('.stickybar').removeClass('stickybar--stick-to-top');

                            headerToggleScroll.isHeaderHidden = false;
                        }
                    }
                    headerToggleScroll.lastScrollTop = headerToggleScroll.scrollTop;
                }
            });
        }
    }

    UX.headerToggleScroll = headerToggleScroll; // add to global namespace
})();