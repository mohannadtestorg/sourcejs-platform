(function () {

    var  scrollAccessDenial = {
        init: function () {
            scrollAccessDenial.on.build();
        },
        on: {
            build: function () {

                scrollAccessDenial.scroll('.purchaseArea',500,$('.header.fixed').offset().top);
            }
        },
        scroll: function (selector, speed, offset) {
            var $object = null;

            if (selector instanceof jQuery) {
                $object = selector;
            } else {
                $object = $(selector);
            }

            if (!$object || $object.length == 0)
                return;

            if (typeof speed === 'undefined') {
                speed = 2000;
            }

            if (typeof offset === 'undefined') {
                offset = $object.offset().top;
            } else {
                offset = $object.offset().top - offset
            }

            $('html, body').animate({
                scrollTop: offset
            }, speed);
        }
    };

    UX.scrollAccessDenial = scrollAccessDenial; // add to global namespace

})();