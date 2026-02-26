
(function () {
    var $body = $('body'),
        $window = $(window),
        $document = $(document),
        isMobile = false; // variable use to determine if responsive mode is on or off

    var toggleTable = {

        vPort: "screen-xs",

        init: function () {
            toggleTable.on.build();
            toggleTable.control();
        },
        control: function () {
            $body.on('click', '.expandable .table__control__button', function (e) {
                e.preventDefault();

                if ($(this).closest('tr').hasClass('js--expanded')) {
                    toggleTable.on.hide($(this).closest('tr'));
                } else {
                    toggleTable.on.show($(this).closest('tr'));
                }
            });

            $window.on('resize', function () {
                toggleTable.on.build();
            });

            $(document).on(toggleTable.vPort + '-on',function(){ // Waiting for custom event that will be triggered by controller.js to activate responsive effects
                isMobile = true;
            });

            $(document).on(toggleTable.vPort + '-off',function(){ // Waiting for custom event that will be triggered by controller.js to deactivate responsive effects
                isMobile = false;
            });


        },
        on: {
            build: function () {

                var $toggle = $('.expandable');
                $toggle.each(function () {
                    var $target = $(this).find('tr');
                    var to_hide = $target.find('.to_hide');
                    $target.removeClass('js--expanded');

                    if (isMobile) {
                        $(to_hide).hide(0);
                    } else {
                        $(to_hide).show(0);
                    }
                });
            },
            show: function (elem) {
                var $target = elem.find('.to_hide');

                $target.toggle();
                elem.addClass('js--expanded');
            },
            hide: function (elem) {
                var $target = elem.find('.to_hide');

                $target.toggle();
                elem.removeClass('js--expanded');
            }
        }
    };

    UX.toggleTable = toggleTable; // add to global namespace
})();
