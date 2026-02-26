(function () {
    var $window = $(window),
        $body = $('body');
    var scrollAdv = {
        isMobile:false,
        vPort: "screen-md",
        $advertisement: $('.scroll_adv'),
        advertisementOffeset: 0,
        headerAdHeight : 0,
        isAdScrolling : false,
        isFooterVisible : function(){
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();
            var footerPos = $('footer').offset().top+$('footer').height() -200;
            return footerPos <= docViewBottom;
        },
        init: function () {
            scrollAdv.on.build();
            scrollAdv.control();
        },
        control: function () {
            $window.on("scroll", function () {

                if (!scrollAdv.isMobile) {
                    if(!scrollAdv.isAdScrolling ){
                        scrollAdv.advertisementOffeset = $('.scroll_adv').offset().top;
                    }
                    if ($window.scrollTop() + $('header').height() +24 >= scrollAdv.advertisementOffeset) {
                        scrollAdv.isAdScrolling = true;
                        // check if ad is sticky and footer is visible
                        if(scrollAdv.isFooterVisible() && $('.scroll_adv').hasClass('fixed')){
                            //add top value before remove fixed class
                            scrollAdv.$advertisement.css('top',$(window).scrollTop()-scrollAdv.headerAdHeight-19);
                            //scrollAdv.$advertisement.css('top',$(window).scrollTop()-19);
                            //remove fixed class and add absolute class in order to save element position
                            scrollAdv.on.unfixedAdv();
                            scrollAdv.on.absoluteAdv();
                        }else if (!scrollAdv.isFooterVisible()){
                            scrollAdv.on.unAbsoluteAdv();
                            scrollAdv.on.fixedAdv();
                        }
                    }
                    else {
                        scrollAdv.isAdScrolling = false;
                        scrollAdv.on.unfixedAdv();
                    }
                }
               

            });
            $(document).on(scrollAdv.vPort + '-on', function () {
                scrollAdv.isMobile = true;
                scrollAdv.on.unfixedAdv();
            });

            $(document).on(scrollAdv.vPort + '-off', function () {
                scrollAdv.isMobile = false;            
            });

        },

        on: {
            build:function () {
                if($('.header__advertisement').length)
                    scrollAdv.headerAdHeight = $('.header__advertisement').outerHeight();
            },

            fixedAdv: function () {
                scrollAdv.$advertisement.addClass('fixed').addClass('margin-left-11-large').css({'top':$('header').height()+10 ,'width': $('.scroll_adv').outerWidth()});
            },
            unfixedAdv: function () {
                scrollAdv.$advertisement.removeClass('fixed').css('width','').removeClass('margin-left-11-large');
            },
            absoluteAdv: function () {
                scrollAdv.$advertisement.addClass('absolute').addClass('margin-left-11-large');
            },
            unAbsoluteAdv: function () {
                scrollAdv.$advertisement.removeClass('absolute').removeClass('margin-left-11-large');
            },
        }

    };
    UX.scrollAdv = scrollAdv; // add to global namespace
})();