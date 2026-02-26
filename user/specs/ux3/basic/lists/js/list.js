(function () {
    var $body = $('body'),
        $document = $(document);


    var list = {
        init: function () {
            list.on.build();
            list.control();
        },
        control: function () {

            $body.on('click', '.expandable-list__toggle', function (e) {
                e.preventDefault();
                list.on.toggleList($(this));

            });
        },
        on: {
            build: function () {
                var $wrapper = $('.expandable-list');
                var $toggle = $('.expandable-list__toggle');

                $wrapper.each(function () {
                    var $target = $(this).find('.expandable-list__body');
                    var $toggle = $(this).find('.expandable-list__toggle');

                    $target.hide();

                });
            },

            toggleList: function (elem) {
                var $toggle = elem;
                var $wrapper = $toggle.closest('.expandable-list');
                var $target = $wrapper.find('.expandable-list__body').toggle();

                $wrapper.toggleClass('js--open');
                $toggle.find('i').toggleClass('icon-add_box icon-squared-minus');

                if ($wrapper.hasClass('js--open')) {
                    $toggle.attr('aria-expanded', true);
                    $target.attr('aria-hidden', false);
                }else {
                    $toggle.attr('aria-expanded', false);
                    $target.attr('aria-hidden', true);
                }

            },
            closeList: function (elem) {

                var $wrapper = $('.expandable-list');
                $wrapper.removeClass('js--open');
                var $target = $wrapper.find('.expandable-list__body').hide();
                var $toggle = $('.expandable-list__toggle');

                $toggle.attr('aria-expanded', 'false').find('i').addClass('icon-add_box').removeClass('icon-squared-minus');
                $target.attr('aria-hidden', true);

            }
        }
    };

    UX.list = list; // add to global namespace
})();
