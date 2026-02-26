(function () {
    $(window).on('load', function () {
        $('.delayLoad').show();
        $('.lazy-load').remove();

        $('.creative-work__title').truncate({
            lines: 3,
            addClass: 'min-height'
        });

        $('.creative-work .loa').truncate({
            lines: 2,
            type: 'list',
            addClass: 'loa-height'
        });

        $('.featured .grid-item:first-child .creative-work__title').truncate({
            lines: 2,
            addClass: 'min-height'
        });

        $('.card .creative-work__title').truncate({
            lines: 2,
            addClass: 'min-height'
        });

        $('.card .creative-work .loa').truncate({
            lines: 1,
            type: 'list',
            addClass: 'loa-height'
        });
    });

    $(window).on('resize orientationchange', function () {
        $('.creative-work__title, .creative-work .loa').truncate();
    });
})();
