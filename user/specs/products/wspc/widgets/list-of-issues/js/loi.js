var $body = $('body'),
    $window = $(window);

UX.loi.vPort = "screen-md";
UX.loi.control = function () {
    UX.loi.$list.on('click', 'a', function (e) {
        UX.loi.$listItem = $(this);
        if (UX.loi.$listItem.closest('.swipe__wrapper').find('.loi-list__controls').length > 0) {
            UX.loi.on.select();
        }
    });

    $body.on('click', '.loi__btn--prev', function () {
        UX.loi.$prevBtn = $(this);
        UX.loi.on.prev();
    });

    $body.on('click', '.loi__btn--next', function () {
        UX.loi.$nextBtn = $(this);
        UX.loi.on.next();
    });

    $body.on('click', '.tab__nav a', function () {
        var paneSlected = $(this).attr('href');
        if ($(paneSlected).hasClass('nested-tab')) {
            setTimeout(function () {
                UX.loi.on.recalculate($(paneSlected).find('.tab__nav'));
            }, 50);
        }

    });

    $body.on('touchmove', function (e) {
        UX.loi.on.touch.move(e);
    });

    $(document).on(UX.loi.vPort + '-on', function () { // Waiting for custom event that will be triggered by controller.js to activate responsive effects
        UX.loi.isMobile = true;
        $('.loi-wrapper:not(.uncollapsible) .loi').addClass("loi--res"); // class will be used in our scss (to replace media queries)
        $('.loi-wrapper:not(.uncollapsible) .loi__banner').addClass("loi--res"); // class will be used in our scss (to replace media queries)

        if ($('.corrections-container__label').length > 0) {
            $('.corrections-container__label').addClass('w-slide__btn');
        }
    });

    $(document).on(UX.loi.vPort + '-off', function () { // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
        UX.loi.isMobile = false;
        $('.loi').removeClass("loi--res");
        $('.loi__banner').removeClass("loi--res");

        if ($('.corrections-container__label').length > 0) {
            $('.corrections-container__label').removeClass('w-slide__btn');
        }
    });

    $body.on('click', '.loi__list a', function () {
        if ($(this).closest(".tab__pane").length) {
            UX.loi.get.activeDecade($(this));
            UX.loi.get.year($(this));
        } else {
            UX.loi.get.decade($(this));
            UX.loi.get.activeYear($(this));
        }
        UX.loi.get.doi();
        UX.loi.get.pagecontext();
        UX.loi.get.url();
        var type = UX.loi.wrapper.find(".dropBlock-loi__holder").attr("data-grouptype");
        if (type == "decade") {
            if (UX.loi.year && UX.loi.decade && UX.loi.pagecontext && UX.loi.doi) {
                UX.loi.load.ajax();
            }
        }
    })
};