(function () {

    $(window).on('load', function () {
        $('.issue-item .loa, .search__item .loa').truncate({
            lines: 1,
            type: 'list',
            showRemovedCount: true
        });

        $('.issue-item__abstract').truncate({
            lines: 3,
            type: 'text',
            seeMoreLink: true,
            seeMoreText: '(More)',
            seeLessText: '(Less)'
        });

    });


    $(window).on('resize orientationchange',function (event) {
        try {
            $('.issue-item .loa, .search__item .loa').truncate();
        } catch (err) {}
    });

})();