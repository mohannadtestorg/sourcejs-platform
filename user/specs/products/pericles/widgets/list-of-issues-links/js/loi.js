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
            loi.$wrapper  = $('.loi');
            loi.$list  = $('.loi__list');

            loi.on.build();
            loi.control();
        },
        control: function () {

            $body.on('click ', '.back-btn', function (e) {
                e.preventDefault();
                loi.$wrapper.removeClass('js--open');

            });

            $(document).on(loi.vPort + '-on',function(){ // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                loi.isMobile = true;
                loi.$wrapper.addClass("loi--res"); // class will be used in our scss (to replace media queries)
                loi.$wrapper.addClass('js--open')

            });

            $(document).on(loi.vPort + '-off',function(){ // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                loi.isMobile = false;
                loi.$wrapper.removeClass("loi--res");

            });
        },
        on: {

            build: function () {

                $('.expandable-list.js--open').find('.expandable-list__body').show();
            }

        }
    };

    UX.loi = loi; // add to global namespace

})();