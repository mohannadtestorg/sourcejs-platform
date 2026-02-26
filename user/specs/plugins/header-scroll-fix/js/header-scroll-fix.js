(function () {

    var $window = $(window),
        isMobile=  false,
        $body = $('body');

    var headerScrollFix = {
        aHeight: 0, //Ad Height
        hHeight: 0, //Header Height
        sHeight: 0, //scrolThenFix Height
        sTop: null,
        $scrollThenFix: null,
        init: function() {
            $(document).trigger( "eventSetContentPadding" );
            this.aHeight = $('header .pb-ad').height() || 0;
            this.hHeight = $('header').height();
            this.$scrollThenFix = $(".scrollThenFix");
            this.sHeight =  this.$scrollThenFix.height();
            headerScrollFix.control();
        },
        control: function(){
            $window.on('scroll', function(e) {
                headerScrollFix.hHeight = $('header').height();

                if ($(document).scrollTop() >= (headerScrollFix.aHeight) ) {
                    if (!headerScrollFix.$scrollThenFix.hasClass("locked")) {

                        headerScrollFix.$scrollThenFix.addClass("locked");
                        headerScrollFix.hHeight = headerScrollFix.$scrollThenFix.height();

                        if (UX.sticko.$element) {
                            UX.sticko.apply(UX.sticko.$element, {top: headerScrollFix.hHeight});
                        }

                        if (UX.stickybar.stickybarElement) {
                            UX.stickybar.stickybarElement.find(".stickybar__wrapper").css("top", headerScrollFix.hHeight);
                        }

                        $(document).trigger( "eventSetContentPadding" );
                    }
                } else {
                    headerScrollFix.$scrollThenFix.removeClass("locked");

                    if (UX.sticko.$element) {
                        headerScrollFix.sTop = headerScrollFix.hHeight - $(document).scrollTop();
                        UX.sticko.apply(UX.sticko.$element, {"top": headerScrollFix.sTop + 10});
                    }

                    if (UX.stickybar.stickybarElement) {
                        UX.stickybar.stickybarElement.find(".stickybar__wrapper").css("top", "auto");
                    }

                    $(document).trigger( "eventSetContentPadding" );
                }
            });
        }
    };
    UX.headerScrollFix = headerScrollFix; // add to global namespace
})();