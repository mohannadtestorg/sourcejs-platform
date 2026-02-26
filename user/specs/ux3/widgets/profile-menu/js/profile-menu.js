(function () {

    var $window = $(window),
        $body = $('body'),
        isMobile = false; // variable use to determine if responsive mode is on or off

    var dropblockUl = {
        $target: null,
        $toggle: null,
        $ul : null,
        $li: null,
        vPort: "screen-sm", // default responsive break point

        init: function () {
            dropblockUl.$target = $('.profile-menu');

            dropblockUl.on.build();
            dropblockUl.control();
        },
        control: function () {

            $body.on('click', '.profile-menu--res a', function (e) {
                dropblockUl.on.select.dropdown($(this));
            });

            $(document).on(dropblockUl.vPort + '-on', function () { // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                isMobile = true;

                $('.profile-menu').addClass("profile-menu--res"); // class will be used in our scss (to replace media queries)
                dropblockUl.on.build();
            });

            $(document).on(dropblockUl.vPort + '-off', function () { // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                isMobile = false;

                $('.profile-menu').removeClass("profile-menu--res");
                dropblockUl.on.build();
            });
        },
        on: {
            select: {
                dropdown: function (elem) {
                    var dataAttr = elem.closest('ul').data('mobile-toggle');
                    if (dataAttr === 'dropdown' || elem.closest('ul').hasClass('dropblock--tab')) {
                        var dropdownContainer = elem.closest('.dropBlock');
                        dropdownContainer.children('a').find('span').text(elem.text());
                    }


                }
            },
            dropdownBuild: function (elem) { // rebuild tabs to be as drop down
                UX.dropBlock.init();

                elem.wrap('<div class="profile-menu--dropBlock" data-db-parent-of="dbTab-profile-menu"></div>');

                var $dropdownContainer = elem.closest('.profile-menu--dropBlock');
                var $activeTab = elem.find('a.active');

                $dropdownContainer.prepend('<a href="#" data-db-target-for="dbTab-profile-menu"><span>' + $activeTab.text() + '</span><i class="icon-arrow_d_n pull-right" aria-hidden="true"></i></a>');
                elem.attr('data-db-target-of', 'dbTab-profile-menu');
            },
            dropdownDestroy: function (elem) { // return tabs to default

                var dropdownContainer = elem.closest('.profile-menu--dropBlock');
                dropdownContainer.children('a').remove();
                elem.removeAttr('data-db-target-of')
                    .removeClass('js--open')
                    .removeAttr('style')
                    .unwrap('.profile-menu--dropBlock');
            },
            build: function () {
                //dropblockUl.$ul.each(function(index) {
                if (isMobile) {
                    dropblockUl.on.dropdownBuild(dropblockUl.$target);
                } else {
                    dropblockUl.on.dropdownDestroy(dropblockUl.$target);
                }
                //});
            }
        }
    };
    UX.dropblockUl = dropblockUl; // add to global namespace
})();