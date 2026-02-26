(function () {

    var $window = $(window),
        $body = $('body');

    var headerAdv = {

        $advertisement: $('.header__advertisement'),
        $header: $('header'),
        vPort: "screen-md",
        isMobile: false,
        headerOffeset: $('header').offset().top,
        $popupAdv: null,

        init: function () {

            headerAdv.on.build();
            headerAdv.control();

        },
        control: function () {
            $window.load(function(){
                if(!$('.header__advertisement').length){
                    headerAdv.on.fixedHeader();
                }
            });

            $window.on("scroll", function () {

                if (!headerAdv.isMobile && headerAdv.$advertisement.is(":visible")) {

                    if ($window.scrollTop() >= headerAdv.headerOffeset) {
                        headerAdv.on.fixedHeader();
                    }
                    else {
                        headerAdv.on.unfixedHeader();
                    }
                }

            });

            $(document).on(headerAdv.vPort + '-on', function () {
                headerAdv.isMobile = true;
                headerAdv.on.fixedHeader();
            });

            $(document).on(headerAdv.vPort + '-off', function () {
                headerAdv.isMobile = false;
                headerAdv.on.unfixedHeader();
            });


            $body.on("click", ".advertisement__close", function () {
                if (headerAdv.$popupAdv) {
                    headerAdv.$popupAdv.fadeOut("slow", "swing");
                    headerAdv.$advertisement.removeClass('advertisement__hidden');
                }
            });
        },

        on: {
            build: function () {
                var isAdvImageExist=headerAdv.$advertisement.find('img').length>0;
                if(!isAdvImageExist) {
                    headerAdv.$advertisement.remove();
                }
                else if (isAdvImageExist && headerAdv.$advertisement.is(":visible")) {
                    headerAdv.on.showPopupAdve();


                    if ($window.scrollTop() >= headerAdv.headerOffeset) {
                        headerAdv.on.fixedHeader();
                   }
                    else {
                        headerAdv.on.unfixedHeader();
                    }

                }
                else {
                    headerAdv.on.fixedHeader();
                }

            },
            fixedHeader: function () {
                headerAdv.$header.addClass('fixed').removeClass('header__border-top').css('top', 0);
                $('.content').css('padding-top', '');
            },
            unfixedHeader: function () {
                headerAdv.$header.removeClass('fixed').addClass('header__border-top');
                $('.content').css('padding-top', 0);
            },
            showPopupAdve: function () {
                headerAdv.$popupAdv = $("<div class='advertisement__popup'>"
                    + "<span class='advertisement__close'><i class='icon-close_thin'></i></span>"
                    + headerAdv.$advertisement.html() + "</div>");

                headerAdv.$popupAdv.appendTo("body");

                headerAdv.$advertisement.addClass('advertisement__hidden');
                setTimeout(function(){
                    if(headerAdv.$popupAdv){
                        headerAdv.$popupAdv.fadeOut("slow", "swing");
                        headerAdv.$advertisement.removeClass('advertisement__hidden');
                    }

                }, 3000)
            }

        }

    };
    UX.headerAdv = headerAdv; // add to global namespace
})();