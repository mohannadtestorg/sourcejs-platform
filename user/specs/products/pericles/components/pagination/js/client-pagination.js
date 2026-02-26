(function () {

    var $window = $(window),
        $body = $('body'),
        isMobile = false; // variable use to determine if responsive mode is on or off

    var pager = {
        $pages: $('.js-pages'),
        $pager: $('.js-pager'),
        $current:null,
        $next:null,
        $prev:null,
        $first:null,
        $last:null,

        init: function(){
            pager.build.pages(1);
            pager.$first = pager.$pager.find('li:first-child').find('a');
            pager.$last = pager.$pager.find('li:last-child').find('a');

            pager.build.pagination(1); // set pagination appearance for 1st time.

            pager.control();
        },

        control: function() {

            $body.on('click', '.js-pager a', function(e) {
                e.preventDefault();

                pager.$pager = $(this).closest('.js-pager');

                pager.$current = $(this).closest('.js-pager').find('a.active');
                pager.$next = pager.$current.parent('li').next().find('a');
                pager.$prev = pager.$current.parent('li').prev().find('a');

                var pagesNumber = pager.$pager.find('li').length;

                if ($(this).hasClass('pagination__btn--prev')) {
                    if (pager.$current.data('target-page') != 1) {
                        pager.$current = pager.$prev;
                        pager.select.page(pager.$current.data('target-page'), pager.$current);
                    }


                }else if ($(this).hasClass('pagination__btn--next') ) {
                    if (pager.$current.data('target-page') != pagesNumber) {
                        pager.$current = pager.$next;
                        pager.select.page(pager.$current.data('target-page'), pager.$current);
                    }


                }else {
                    pager.select.page($(this).data('target-page'), $(this));

                }
            });

        },
        build: {
            pages: function (pageNumber) {
                pager.$pages.find("[data-page]").hide();
                pager.$pages.find("[data-page="+ pageNumber +"]").show();

            },
            pagination: function (pageNumber) {
                var pagesNumber = pager.$pager.find('li').length;
                if (pagesNumber > 7) {
                    if (pageNumber > 4 && pageNumber < (pagesNumber - 3)) {
                        pager.$pager.find('.pagination__list li').removeClass('dotsValue');
                        pager.$pager.find('.pagination__list a').addClass('hidden');

                        pager.$current.removeClass('hidden');
                        pager.$next.removeClass('hidden');
                        pager.$prev.removeClass('hidden');
                        pager.$first.removeClass('hidden');
                        pager.$last.removeClass('hidden');

                        pager.$next.parent('li').next().addClass('dotsValue');
                        pager.$prev.parent('li').prev().addClass('dotsValue');

                    }else if (pageNumber <= 4) {
                        pager.$pager.find('.pagination__list li').removeClass('dotsValue');
                        pager.$pager.find('.pagination__list a').removeClass('hidden');

                        for (i = 7; i < pagesNumber; i++ ) {
                            $("[data-target-page="+ i +"]").addClass('hidden');
                        }
                    }else if (pageNumber >= (pagesNumber - 3)) {

                        pager.$pager.find('.pagination__list li').removeClass('dotsValue');
                        pager.$pager.find('.pagination__list a').removeClass('hidden');

                        for (i = 2; i < ( pagesNumber - 5 ); i++ ) {
                            $("[data-target-page="+ i +"]").addClass('hidden');
                        }
                    }
                }

                UX.manageArticleSelect.clearSelectAll();
            }
        },
        select: {
            page: function (pageNumber, current) {

                pager.$current = current;
                pager.$next = current.parent('li').next().find('a');
                pager.$prev = current.parent('li').prev().find('a');

                pager.$pages.find("[data-page]").hide();
                pager.$pages.find("[data-page="+ pageNumber +"]").show();

                pager.$pager.find('a').removeClass('active');
                pager.$current.addClass('active');

                pager.build.pagination(pageNumber);
            }
        }
    };
    UX.pager = pager; // add to global namespace
})();