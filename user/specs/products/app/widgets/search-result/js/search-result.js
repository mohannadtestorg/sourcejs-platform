(function () {
    UX.searchResult.additionalControl=function () {
        if($('.search-authors-truncate').length) {
            $('.search-authors-truncate').truncate({
                lines: 2,
                type: 'list',
                seeMoreLink: true,
                seeMoreText: 'Show all Authors',
                seeLessText: 'Show less Authors',
            });
        }
    };
})();