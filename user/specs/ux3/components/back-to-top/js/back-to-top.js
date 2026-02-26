(function () {

    var $window = $(window),
        $body = $('body');

    var backToTop = {
        element: '.back-to-top',
        footerBackToTop: 'footer .back-to-top',


        init: function () {
            backToTop.controller();
        },
        controller: function () {
            $body.on('click', backToTop.element, function (e) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: 0
                }, 600);
            });

            $window.on("scroll", function () {
                if($(backToTop.footerBackToTop).length)
                {
                    if ($(this).scrollTop() > $('header').height()) {
                        $(backToTop.footerBackToTop).addClass('back-to-top__is-visible');
                    }
                    else {
                        $(backToTop.footerBackToTop).removeClass('back-to-top__is-visible back-to-top__fade-out');
                    }

                    if ($(this).scrollTop() > 400) {
                        $(backToTop.footerBackToTop).addClass('back-to-top__fade-out');
                    }


                    if (backToTop.check.isfooterVisible()) {
                        $(backToTop.footerBackToTop).addClass('back-to-top__static');
                    }
                    else {
                        $(backToTop.footerBackToTop).removeClass('back-to-top__static');
                    }  
                    
                }
              
            })


        },
        check: {
            isfooterVisible: function () {
                var docViewBottom = $(window).scrollTop() + $(window).height();
                var backToTopPos = $('footer').offset().top ;
                return (backToTopPos <= docViewBottom);
            }
        }


    }

    UX.backToTop = backToTop;

})();