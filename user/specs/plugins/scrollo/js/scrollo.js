(function () {
    var $body = $('body');

    function offset(el) {
        var rect = el.getBoundingClientRect();
        var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        };
    }

    var scrollo = {
        init: function () {
            scrollo.control();
        },
        adjustAnchor: function (e) {
            e.preventDefault();
            var $anchor = $(':target');
            var stickyCoolbarHeigh = 0;
            var fixedElementsHeight = scrollo.get.fixedpageElementsHeight();

            if ($anchor.length > 0) {
                window.scrollTo(0, offset($anchor.get(0)).top - fixedElementsHeight);
            }
        },
        control: function () {
            $(window).on('hashchange load', scrollo.adjustAnchor);
            $body.on('click', 'a.table-fn[href^="#"],a.ref.fn[href^="#"],.scroll-to-target a[href^="#"]', function (e) {
                if (window.location.hash === $(this).attr('href')) {
                    scrollo.adjustAnchor(e);
                }
            });
        },

        get: {
            fixedpageElementsHeight: function () {
                var elementsHeight = 0;

                var $fixedHeader=$('header.fixed, .pageHeader');
                if($fixedHeader.length){
                    elementsHeight= $fixedHeader.outerHeight()
                }

                var $scrolloThenFix=$('.scrollThenFix');
                if($scrolloThenFix.length){
                    elementsHeight= $scrolloThenFix.outerHeight()
                }

                var $stickyCoolbar = $('.coolBar.stickybar--sticky');
                var stickyCoolbarHeigh = 0;
                if ($stickyCoolbar.length) {
                    stickyCoolbarHeigh = $stickyCoolbar.outerHeight();
                    if (stickyCoolbarHeigh == 0) {
                        stickyCoolbarHeigh = $stickyCoolbar.find('.stickybar__wrapper').outerHeight();
                    }
                    elementsHeight+=stickyCoolbarHeigh;
                }

                if ($('.fixed-element').length) {
                    $.each($('.fixed-element'), function (index, value) {
                        if ($(value).outerHeight()) {
                            elementsHeight += $(value).outerHeight();
                        }
                    });
                }
                return elementsHeight;
            }
        }

    };

    UX.scrollo = scrollo; // add to global namespace
})();