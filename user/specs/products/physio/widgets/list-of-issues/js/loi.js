UX.loi.on.build = function () {
    if ($('.journal-home').length) {
        UX.loi.vPort = "screen-sm";
    }
    if ($(window).width() >= parseInt(UX.grid.screenSm)) {
        UX.loi.isMobile = false;
        $('.loi').removeClass("loi--res");
        $('.loi__banner').removeClass("loi--res");

        if ($('.corrections-container__label').length > 0) {
            $('.corrections-container__label').removeClass('w-slide__btn');
        }

        if ($('.loi__archive').length > 0) {
            $('.loi__archive').removeClass('w-slide__btn');
        }
    } else {
        UX.loi.isMobile = true;
        $('.loi').addClass("loi--res"); // class will be used in our scss (to replace media queries)
        $('.loi__banner').addClass("loi--res"); // class will be used in our scss (to replace media queries)
        if ($('.corrections-container__label').length > 0) {
            $('.corrections-container__label').addClass('w-slide__btn');
        }
        if ($('.loi__archive').length > 0) {
            $('.loi__archive').addClass('w-slide__btn');
        }
    }
    UX.loi.$tabContent  = $(".dropBlock-loi__holder > .loi > .tab__content");
    UX.loi.$wrapper = UX.loi.$list.closest('.swipe__wrapper');
    UX.loi.$wrapper.addClass('loi-list__wrapper');
    UX.loi.$list.each(function (index) {
        var loiListWidth = $(this).width();
        if (loiListWidth > UX.loi.$wrapper.width()) {
            $(this).closest('.swipe__wrapper').prepend(UX.loi.$controls);
        }
        $('.loi__btn--prev').addClass('inactive');
    });

    UX.loi.$nextBtn  = $('.loi__btn--next');
    UX.loi.$prevBtn  = $('.loi__btn--prev');
};

UX.loi.addtionalControls = function() {
    UX.loi.wrapper.on('click' , '.see-all-loi' , function(e){
        e.preventDefault();
        $(this).closest('.tab__pane').find('.hidden').removeClass('hidden');
        $(this).remove();
    });
};
