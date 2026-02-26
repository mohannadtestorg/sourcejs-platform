(function () {
    var $body = $('body'),
        $document = $(document);


    var toggle = {
        init: function () {
            toggle.on.build();
            toggle.control();
        },
        control: function () {
            $body.on('click', '.facet .show-more', function (e) {
                e.preventDefault();
                toggle.on.toggle($(this));
                $(this).closest(".accordion__content").find('li:nth-child(6) a').focus();
            });
            $body.find('.facet .dropdown__toggle').off();
            $body.on('click', '.facet .dropdown__toggle', function (e) {
                e.preventDefault();
                toggle.on.toggleFacet($(this));

            });
        },
        on: {
            build: function () {
                var $toggle = $('.facet:not(.displayAll)');
                $toggle.each(function () {
                    var $target = $(this).find('ul.facet__list');
                    var $lis = $target.children('li');

                    var $select = $(this).find('.facet__select ');
                    var $options = $select.children('option');

                    var lisNum = $lis.length;
                    var optionsNum = $options.length;
                    var isToggle = lisNum > 5;

                    var moreCount = optionsNum + lisNum - 5;
                    $target.closest('.facet').attr('data-more-count', moreCount);

                    if (isToggle)
                        $target.after('<a href="#" class="show-more">More ('+ moreCount +') <i class="icon-section_arrow_d" aria-hidden="true"></i></a>');


                    $select.each(function () {
                        var mis = $(this).magicSuggest({hideTrigger:'true',allowFreeEntries:'false', expandOnFocus: true, maxSelection:1, placeholder :$(this).data('placeholder')});
                        $(mis).on('selectionchange', function(e,m, selection){
                            if(selection != undefined){
                                window.location.href = selection[0].id;
                            }
                        });

                    })

                });
            },
            toggle: function (elem) {
                var $toggle = elem.closest('.facet');
                var $target = $toggle.find('ul.facet__list');

                $target.find('.js--toggle').slideToggle();
                $toggle.find('.facet__select--hidden').toggle();

                elem.toggleClass('js--open');
                if (elem.hasClass('js--open')) {
                    elem.html('Less <i class="icon-section_arrow_u" aria-hidden="true"></i>');

                }else {
                    elem.html('More ('+ $toggle.data('more-count') +') <i class="icon-section_arrow_d" aria-hidden="true"></i>');
                    elem.closest(".accordion__content").find('li:first-child a').blur();

                }

            },
            toggleFacet: function (elem) {
                var $toggle = elem.closest('li');
                var $target = $toggle.children('ul.facet-dropdown__menu');

                $target.slideToggle();
                elem.toggleClass('js--open');
                elem.find('i').toggleClass('icon-add_box icon-squared-minus');

                if (elem.hasClass('js--open')) {
                    $target.attr('aria-hidden', false);
                }else {
                    $target.attr('aria-hidden', true);
                }

            }
        }
    };

    UX.toggle = toggle; // add to global namespace
})();
