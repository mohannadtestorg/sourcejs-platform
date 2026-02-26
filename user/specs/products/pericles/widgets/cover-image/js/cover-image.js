(function () {
    //document.activeElement

    var $body = $('body'),
        $window = $(window);

    var sliderTabs = {
        $wrapper: null,
        $list: null,
        $controls: null,
        $nextBtn:null,
        $prevBtn:null,
        $listItem:null,
        isTouched: false,
        pointerPosition: 0.0,
        cumulativeShift: 0.0,

        init: function () {
            sliderTabs.$wrapper  = $('.swipe__wrapper');
            sliderTabs.$list  = $('.swipe__wrapper .loc');
            sliderTabs.$controls  = '<div class="sliderTabs-list__controls"><span class="sliderTabs__btn--prev"><i class="icon-arrow_l" aria-hidden="true"></i></span><span class="sliderTabs__btn--next"><i class="icon-arrow_r" aria-hidden="true"></i></span></div>';


            sliderTabs.on.build();
            sliderTabs.control();

            $window.resize(function () {
                sliderTabs.on.rebuild();
            });

        },
        control: function () {
            $('.swipe__wrapper .loc').on('click', 'a', function (e) {
                sliderTabs.$listItem = $(this); //reemi

                var old = sliderTabs.$listItem.closest('.loc').find('.active').index();

                if (sliderTabs.$listItem.closest('.slider-covers--light').length) {
                    sliderTabs.on.selectLight(old);
                    return;
                }



                if (sliderTabs.$listItem.closest('.swipe__wrapper').find('.sliderTabs-list__controls').length) {
                    sliderTabs.on.select();
                }


            });

            $body.on('click', '.sliderTabs__btn--prev',  function () {
                sliderTabs.$prevBtn = $(this);
                sliderTabs.on.prev();
            });

            $body.on('click', '.sliderTabs__btn--next',  function () {
                sliderTabs.$nextBtn = $(this);
                sliderTabs.on.next();
            });


            $body.on('touchmove', function (e) {
                sliderTabs.on.touch.move(e);
            });

            $(document).on(sliderTabs.vPort + '-on',function(){ // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                isMobile = true;


            });

            $(document).on(sliderTabs.vPort + '-off',function(){ // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                isMobile = false;
            });
        },
        on: {
            select: function () {
                sliderTabs.$list  = sliderTabs.$listItem.closest('.swipe__wrapper').find('.loc');
                sliderTabs.$nextBtn  = sliderTabs.$listItem.closest('.swipe__wrapper').find('.sliderTabs__btn--next');
                sliderTabs.$prevBtn  = sliderTabs.$listItem.closest('.swipe__wrapper').find('.sliderTabs__btn--prev');
                sliderTabs.$scroll  = sliderTabs.$list.closest('.scroll');

                var thisLinkPosition = sliderTabs.$listItem.offset().left;
                var nextButtonPosition = sliderTabs.$nextBtn.offset().left;
                var prevButtonPosition = sliderTabs.$prevBtn.offset().left;

                if (thisLinkPosition > (nextButtonPosition - sliderTabs.$listItem.outerWidth())) {
                    sliderTabs.$scroll.stop().animate({
                        scrollLeft: '+=' + sliderTabs.$listItem.outerWidth()
                    }, 500, 'linear', function () {
                        sliderTabs.on.activeArrows();
                    });

                } else if (thisLinkPosition < (prevButtonPosition + sliderTabs.$prevBtn.outerWidth())) {
                    sliderTabs.$scroll.stop().animate({
                        scrollLeft: '-=' + sliderTabs.$listItem.outerWidth()
                    }, 500, 'linear', function () {
                        sliderTabs.on.activeArrows();
                    });
                }
            },

            selectLight: function (old) {
                sliderTabs.$list  = sliderTabs.$listItem.closest('.loc');
                sliderTabs.$scroll  = sliderTabs.$list.closest('.scroll');

                var current = sliderTabs.$listItem.closest('li').index();
                var wrapperWidth = parseInt(sliderTabs.$scroll.outerWidth());
                var itemWidth = parseInt(sliderTabs.$listItem.closest('li').outerWidth());

                var $itemFirst = sliderTabs.$wrapper.find('.cover-image:first-child');
                var $itemLast = sliderTabs.$wrapper.find('.cover-image:last-child');


                var marginValue =  parseInt((itemWidth) * current) - (parseInt((wrapperWidth - itemWidth) / 2));



                if (current == 0 ) {
                    $itemFirst.before($itemLast);


                    sliderTabs.$list.css({
                        left: '-=' + parseInt((wrapperWidth - itemWidth) / 2)
                    });

                    marginValue = 9

                }

                $itemFirst = sliderTabs.$wrapper.find('.cover-image:first-child');
                $itemLast = sliderTabs.$wrapper.find('.cover-image:last-child');


                if (current == $itemLast.index()) {

                    $itemLast.after($itemFirst);

                    sliderTabs.$list.css({
                        left: '+=' + parseInt((wrapperWidth - itemWidth) / 2)
                    });

                    marginValue = sliderTabs.$list.outerWidth() - wrapperWidth - 9

                }

                sliderTabs.$list.stop().animate({
                    left: -1 * marginValue
                }, 500, 'linear');


            },


            next: function () {
                sliderTabs.$list  = sliderTabs.$nextBtn.closest('.swipe__wrapper').find('.loc');
                sliderTabs.$prevBtn  = sliderTabs.$list.closest('.sliderTabs-list__wrapper').find('.sliderTabs__btn--prev');
                sliderTabs.$scroll  = sliderTabs.$list.closest('.scroll');

                var screenSize = sliderTabs.$scroll.width();
                var shiftSize = screenSize - 20; /// 3;

                if (!sliderTabs.$nextBtn.hasClass('inactive')) {
                    sliderTabs.$scroll.stop().animate({
                        scrollLeft: '+=' + shiftSize
                    }, 500, 'linear', function () {
                        sliderTabs.on.activeArrows();
                    });
                }
            },
            prev: function () {
                sliderTabs.$list  = sliderTabs.$prevBtn.closest('.swipe__wrapper').find('.loc');
                sliderTabs.$nextBtn  = sliderTabs.$list.closest('.sliderTabs-list__wrapper').find('.sliderTabs__btn--next');
                sliderTabs.$scroll  = sliderTabs.$list.closest('.scroll');

                var screenSize = sliderTabs.$scroll.width();
                var shiftSize = screenSize - 20; /// 3;

                sliderTabs.$scroll.stop().animate({
                    scrollLeft: '-=' + shiftSize
                }, 500, 'linear', function () {
                    sliderTabs.on.activeArrows();
                });
            },
            touch: {
                move: function (e) {
                    if ($(e.target).closest('.loc').length ||  $(e.target).hasClass('loc')) {
                        sliderTabs.$list = $(e.target).closest('.loc');
                        sliderTabs.$wrapper = $(e.target).closest('.sliderTabs-list__wrapper');
                        sliderTabs.$nextBtn  = $(e.target).closest('.sliderTabs-list__wrapper').find('.sliderTabs__btn--next');
                        sliderTabs.$prevBtn  = $(e.target).closest('.sliderTabs-list__wrapper').find('.sliderTabs__btn--prev');

                        sliderTabs.on.activeArrows();
                    }
                }
            },

            activeArrows: function () {
                sliderTabs.$scroll  = sliderTabs.$list.closest('.scroll');

                if (parseInt(sliderTabs.$scroll.scrollLeft()) > 0) {
                    sliderTabs.$prevBtn.removeClass('inactive');
                } else {
                    sliderTabs.$prevBtn.addClass('inactive');
                }

                var sliderSize = sliderTabs.$list.width();
                var wrapperSize = sliderTabs.$wrapper.width();

                if (parseInt(sliderTabs.$scroll.scrollLeft()) > parseInt((sliderSize - wrapperSize ))) {
                    sliderTabs.$nextBtn.addClass('inactive');
                } else {
                    sliderTabs.$nextBtn.removeClass('inactive');
                }
            },

            recalculate: function (elem) {

                var tabNavWidth = 0;
                elem.find('li').each(function (index) {
                    tabNavWidth += $(this).innerWidth();
                });

                elem.width(tabNavWidth);

                if (tabNavWidth > sliderTabs.$wrapper.width()) {
                    $('.sliderTabs__btn--prev').addClass('inactive');
                } else {
                    elem.closest('.swipe__wrapper').find('.sliderTabs-list__controls').remove();
                }

            },
            build: function () {

                sliderTabs.$list.each(function (index) {

                    sliderTabs.$wrapper = $(this).closest('.swipe__wrapper');
                    sliderTabs.$wrapper.addClass('sliderTabs-list__wrapper');

                    var sliderTabsListWidth = $(this).width();
                    if (sliderTabsListWidth > sliderTabs.$wrapper.width()) {
                        $(this).closest('.swipe__wrapper').prepend(sliderTabs.$controls);
                    }
                    $('.sliderTabs__btn--prev').addClass('inactive');

                    sliderTabs.on.recalculate($(this));
                });

                sliderTabs.$nextBtn  = $('.sliderTabs__btn--next');
                sliderTabs.$prevBtn  = $('.sliderTabs__btn--prev');


                if (sliderTabs.$wrapper.closest('.slider-covers--light').length) {
                    sliderTabs.$listItem = sliderTabs.$wrapper.find('.active');
                    sliderTabs.on.selectLight(0);
                }
            },
            rebuild: function () {



                $('.sliderTabs-list__controls').remove();
                sliderTabs.$list = $('.swipe__wrapper .loc');
                sliderTabs.$list.each(function (index) {
                    sliderTabs.on.recalculate($(this));

                    var sliderTabsListWidth = $(this).width();
                    if (sliderTabsListWidth > sliderTabs.$wrapper.width()) {
                        $(this).closest('.swipe__wrapper').prepend(sliderTabs.$controls);
                        $('.sliderTabs__btn--prev').addClass('inactive');
                    } else {
                        $(this).closest('.swipe__wrapper').find('.sliderTabs-list__controls').remove();
                    }
                });
            }

        }
    };

    UX.sliderTabs = sliderTabs; // add to global namespace
})();