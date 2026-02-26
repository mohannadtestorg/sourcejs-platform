$(document).ready(function () {


    if ( $('.to-section').length ) {
        $('.to-section').each(function () {
            var section = $(this).text();
            var id = $(this).attr("id");
            $('<li role="menuitem"><a class="w-slide__hide" href="#'+ id +'"><span>'+section+'</span></a></li>').appendTo('.sections__drop');
        });
    }else {
       $('.toc-go-section').remove();
    }


    $(window).on('load', function () {
        $('.issue-item .loa, .search__item .loa').truncate({
            lines: 2,
            type: 'list',
            seeMoreLink: true,
            seeMoreText: 'See all authors',
            seeLessText: 'See fewer authors'
        });
    });


    $(window).on('resize orientationchange',function (event) {
        try {
            $('.issue-item .loa, .search__item .loa').truncate();
        } catch (err) {}
    });

});