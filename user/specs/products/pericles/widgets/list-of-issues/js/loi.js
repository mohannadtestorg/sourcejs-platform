(function () {
    //document.activeElement

    var $body = $('body'),
        $window = $(window);

    var loi = {
        $wrapper: null,
        $list: null,
        isMobile: false,
        loiPosition: null,
        vPort: "screen-md", // default responsive break point

        init: function () {

            // loi.$wrapper  = $('.loi');
            // loi.$list  = $('.loi__list');
            //
            // loi.on.build();
            // loi.control();
        },
        control: function () {
            loi.$list.on('click', 'a', function (e) {
                loi.$listItem = $(this);
                loi.$list.find('li').removeClass('active');

                if (loi.isMobile && !loi.$listItem.closest('li').hasClass('nested')) {
                    loi.$wrapper.addClass('js--open');
                    loi.loiPosition = loi.$wrapper.offset().top;
                    $body.scrollTop(0);
                }

                loi.on.imageLazyLoad($(this).attr('href'));

            });

            loi.$list.on('click', '.expandable-list__body a', function (e) {
                $("html, body").animate({ scrollTop: 0 }, 600);
            });

            $body.on('click ', '.back-btn', function (e) {
                e.preventDefault();
                loi.$wrapper.removeClass('js--open');
                //$body.scrollTop(loi.loiPosition );

            });


            $(document).on(loi.vPort + '-on',function(){ // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                loi.isMobile = true;
                $('.loi').addClass("loi--res"); // class will be used in our scss (to replace media queries)

            });

            $(document).on(loi.vPort + '-off',function(){ // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                loi.isMobile = false;
                $('.loi').removeClass("loi--res");
                loi.$wrapper.removeClass('js--open');

            });
        },
        on: {
            select: function () {
                loi.$wrapper.addClass('js--open')

            },

            build: function () {
                loi.$list.find('li').removeClass('active');
                var $firstController = $('.loi__list > li:nth-child(2)');
                $firstController.addClass('active');

                loi.on.imageLazyLoad($firstController.find('a').attr('href'));

            },
            imageLazyLoad: function (targetPane) {
                $(targetPane).find('.item__image img').each(function () {
                    $(this).attr('src', $(this).data('src'))
                })
            }
        }
    };

    UX.loi = loi; // add to global namespace

})();