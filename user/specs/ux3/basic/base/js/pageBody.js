(function () {

    var $window = $(window),
        $body = $('body');

    var pageBody = {
        init: function () {
            pageBody.on.setContentTopPadding();
            pageBody.control();
        },
        control: function () {
            $(document).on("eventSetContentPadding", pageBody.on.setContentTopPadding );
            $(window).on('resize', function () {
                pageBody.on.setContentTopPadding();
            })
        },
        on: {
            setContentTopPadding: function () {
                var contentPaddingTop = 0;

                if ($('.header.fixed').length) {
                    contentPaddingTop = $('.header.fixed').height();
                }
                if ($('.scrollThenFix.locked').length) {
                    contentPaddingTop += $('.scrollThenFix.locked').height();
                }

                if ($('.fixed-element').length) {
                    $.each($('.fixed-element'), function (index, value) {
                        if ($(value).outerHeight()) {
                            contentPaddingTop += $(value).height();
                        }
                    });
                }
                pageBody.setTopPadding(contentPaddingTop);
            }
        },
        setTopPadding: function(value) {
            $('main.content').css('padding-top', value);
        }
    }

    UX.pageBody = pageBody; // add to global namespace
})();