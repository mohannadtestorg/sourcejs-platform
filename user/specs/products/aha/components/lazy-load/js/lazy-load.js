(function () {
    $(window).on('load', function () {
        $('.delayLoad').show();
        $('.lazy-load').remove();

        $('.creative-work .loa').truncate({
            lines: 2,
            type: 'list',
            addClass: 'loa-height'
        });

        $('.card .creative-work .loa').truncate({
            lines: 1,
            type: 'list',
            addClass: 'loa-height'
        });
    });
    $(window).on('resize orientationchange', function () {
        $('.creative-work .loa').truncate();
    });
})();
