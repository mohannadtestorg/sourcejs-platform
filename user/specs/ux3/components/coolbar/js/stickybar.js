(function () {
    var $window = $(window),
        $body = $('body');

    var stickybar = {
        sections: null,
        vPort: "screen-sm",
        isMobile: false,
        stickybarElement: $('.stickybar'),
        topPostition: 0,
        headerHeight: 0,
        lock: false, // define lock and set default value, this lock will be used to make sure to run certain functionality and to run on every scroll event

        init: function(){
            stickybar.control();
            setTimeout(stickybar.sticky.init, 0);
        },
        control: function(){
            $(document).on(stickybar.vPort + '-on',function(){ // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                stickybar.isMobile = true;
            });

            $(document).on(stickybar.vPort + '-off',function(){ // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                stickybar.isMobile = false;

            });
        },
        sticky: {
            init: function(){
                var stickybaroffset =  stickybar.stickybarElement.offset(); // get stickybar offset
                stickybar.topPostition = stickybaroffset.top; // get stickybar's top position

                stickybar.sticky.get.width(); // get stickybar width
                stickybar.sticky.check(stickybar.topPostition);

                $window.scroll(function(){
                    stickybar.topPostition = stickybar.stickybarElement.offset().top; //we need know offset every time because some times there script works after stickybar and make change in  content(ex:see all authors)
                    stickybar.sticky.check(stickybar.topPostition);
                    stickybar.sticky.get.width();
                });

                $window.on("smartResize, load, resize",function(){
                    stickybar.headerHeight= $('header, .pageHeader').height();
                    stickybar.sticky.get.width();

                });
            },
            check: function(topPostition){ // check if stickiness must be enabled
                var offestYTop = window.pageYOffset; // screen y offset
                stickybar.headerHeight= $('header, .pageHeader').height(); // get latest header height
                if ($(".scrollThenFix").length) {
                    stickybar.headerHeight = $(".scrollThenFix").height();
                }
                if ($('.auto-hide-secondary-bar.slide-up').length) {
                    stickybar.headerHeight = $(".auto-hide-secondary-bar").height();
                }
                var stickyPoint = offestYTop + stickybar.headerHeight; // get meeting point to anble stickiness

                if (stickyPoint >= topPostition && !stickybar.isMobile){ // check if skickiness point passed stickybar top position
                    if (!stickybar.lock) { // prevent runing this code in every scroll event
                        stickybar.stickybarElement.addClass("stickybar--sticky");
                        stickybar.lock = true; // lock is enabled
                    }
                } else {
                    stickybar.lock = false; // lock is disabled
                    stickybar.stickybarElement.removeClass("stickybar--sticky");
                }
            },
            get: {
                width: function(){
                    if (stickybar.isMobile){
                        stickybar.stickybarElement.find(".stickybar__wrapper").css({"width":"auto", "top":"auto" });
                    } else {
                        stickybar.stickybarElement.find(".stickybar__wrapper").css({"width": stickybar.stickybarElement.width(), "top":stickybar.headerHeight });
                    }

                }
            }
        }
    };
    UX.stickybar = stickybar; // add to global namespace
})();