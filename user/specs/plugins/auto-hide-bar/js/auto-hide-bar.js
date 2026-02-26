(function () {

    var $window = $(window),
        $body = $('body');

    var autoHideBar = {
        $primaryBar: $('.auto-hide-primary-bar'),
        $stickyBar: $('.auto-hide-secondary-bar'),
        previousTop: 0,
        scrollDelta: 5,
        scrollOffset: 100,
        vPort: "screen-sm",
        isMobile: false,

        init: function () {
            autoHideBar.$primaryBar.addClass('auto-hide-bar fixed-element');
            autoHideBar.$stickyBar.addClass('secondary-bar--sticky fixed-element');
            autoHideBar.$stickyBar.css('top',autoHideBar.$primaryBar.height());
            autoHideBar.control();
        },
        control: function () {

            $(document).on(autoHideBar.vPort + '-on', function () { // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                autoHideBar.isMobile = true;
            });

            $(document).on(autoHideBar.vPort + '-off', function () { // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                autoHideBar.isMobile = false;
            });


            $(window).on('scroll', function () {
                if (autoHideBar.$stickyBar.length && autoHideBar.isMobile == false) {

                    var currentTop = $(window).scrollTop();
                    var secondaryNav_HeaderOffsetTop = autoHideBar.$primaryBar.height() + autoHideBar.scrollOffset;

                    if (autoHideBar.previousTop >= currentTop && currentTop < secondaryNav_HeaderOffsetTop) {
                        //if scrolling up...
                        if (autoHideBar.previousTop - currentTop > autoHideBar.scrollDelta) {
                            autoHideBar.$primaryBar.css('transform', '').addClass('fixed-element');
                            autoHideBar.$stickyBar.css('transform', '').removeClass('slide-up');
                        }
                    }
                    else if (currentTop > secondaryNav_HeaderOffsetTop) {
                        //if scrolling down...
                        autoHideBar.$primaryBar.removeClass('fixed-element').css('transform', 'translateY(-' + autoHideBar.$primaryBar.height() + 'px )');
                        autoHideBar.$stickyBar.addClass('slide-up').css('transform', 'translateY(-' + autoHideBar.$primaryBar.height() + 'px )');
                        autoHideBar.hideOpenHeaderMenus();
                    }
                    autoHideBar.previousTop = currentTop;
                }
            });
        },
        hideOpenHeaderMenus: function () {
            //hide profile menu
            $('.navigation-login-dropdown-container').addClass('hidden');
            //hide login menu
            var $openedLoginMenu = $('.loginBar__dropBlock__holder.js--open');
            $openedLoginMenu.removeClass("js--open");
            $('[data-db-target-for=' + $openedLoginMenu.attr("data-db-target-of") + ']').removeClass("js--open");
            //hide quick search menu
            var $openedQuickSearchMenu = $('.quick-search__dropBlock.js--open');
            $openedQuickSearchMenu.removeClass("js--open");
            $('[data-db-target-for=' + $openedQuickSearchMenu.attr("data-db-target-of") + ']').removeClass("js--open");

        }
    }


    UX.autoHideBar = autoHideBar; // add to global namespace
})();
