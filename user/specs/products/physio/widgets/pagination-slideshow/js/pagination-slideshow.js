(function () {


    var  paginationSlideshow = {
        init: function () {
            paginationSlideshow.on.build();
        },
        on: {
            build: function () {
                var $paginationSlideshow = $('.paginationSlideshow .owl-dots');
                $paginationSlideshow.each(function () {
                    $(this).addClass('clearfix');
                    var $dot = $(this).find('.owl-dot');
                    $dot.each(function (i) {
                        $(this).find('span').text(i+1);
                    })
                })
            }
        }
    };

    UX.paginationSlideshow = paginationSlideshow; // add to global namespace
})();







