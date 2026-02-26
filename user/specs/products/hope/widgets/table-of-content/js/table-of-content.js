$(document).ready(function () {
    $(window).on('load', function () {
        $('.issue-item .loa, .search__item .loa').truncate({
            lines: 1,
            type: 'list',
            seeMoreLink: true,
            seeMoreText: 'See all authors',
            seeLessText: 'See fewer authors'
        });
    });
});