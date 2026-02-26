$(window).on('load', function () {
    $('.article-sections a').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

            var scrollTop = 0;
            if ($("nav.stickybar.coolBar").length > 0) {
                var scrollTop = target.offset().top - $("header.header").height() - $("nav.stickybar.coolBar>div.stickybar__wrapper").height();
            } else {
                var scrollTop = target.offset().top - $("header.header").height();
            }
            if (target.length) {
                $('html,body').animate({
                    scrollTop: scrollTop
                }, 500);
                return false;
            }
        }
    });
});