(function () {
    var loi = UX.loi,
        $body = $('body');

    loi.control = function () {
        loi.$list.on('click', 'a', function (e) {
            loi.$listItem = $(this);
            if (loi.$listItem.closest('.swipe__wrapper').find('.loi-list__controls').length > 0) {
                loi.on.select();
            }
        });

        $body.on('click', '.loi__btn--prev',  function () {
            loi.$prevBtn = $(this);
            loi.on.prev();
        });

        $body.on('click', '.loi__btn--next',  function () {
            loi.$nextBtn = $(this);
            loi.on.next();
        });

        $body.on('click', '.tab__nav a',  function () {
            var paneSlected = $(this).attr('href');
            if ($(paneSlected).hasClass('nested-tab')) {
                setTimeout(function () {
                    loi.on.recalculate($(paneSlected).find('.tab__nav'));
                }, 50);
            }

        });

        $body.on('touchmove', function (e) {
            loi.on.touch.move(e);
        });

        if ($('.journal-home').length) {
            loi.vPort = "screen-md";
        }
    }

    loi.on.recalculate = function (elem) {
        var tabNavWidth = 25;
        elem.find('li').each(function (index) {
            tabNavWidth += $(this).innerWidth();
        });
        elem.width(tabNavWidth);
        loi.$wrapper = elem.closest('.swipe__wrapper').addClass('loi-list__wrapper');

        if (tabNavWidth > loi.$wrapper.width()) {
            if(elem.closest('.swipe__wrapper').children('.loi-list__controls').length == 0) {
                elem.closest('.swipe__wrapper').prepend(loi.$controls);
            }
        } else {
            elem.closest('.swipe__wrapper').find('.loi-list__controls').remove();
        }

    }

})();