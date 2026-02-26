UX.searchResult.additionalInit = function () {

    $(window).on("load resize", function() {
        $('.search-results-left').css('margin-top', $('.search-result__top-section').outerHeight())
    });


    $(window).on('load', function () {
        if ($('[data-aboutBook]')) {
            UX.searchResult.renderAbout('data-aboutBook');
        }
        if ($('[data-aboutIssue]')) {
            UX.searchResult.renderAbout('data-aboutIssue');
        }


        UX.searchResult.formattingPagination();

    });


    $('.result__ctrl__filters').on('click', function () {

        if ($(this).hasClass('js--open')) {

            $('.search__bottom').removeClass('scrolled').css({
                'top': 'auto'
            });



        }else {

            $('.search__bottom').addClass('scrolled').animate({
                top: 0
            }, 300);
        }

    });

};

UX.searchResult.renderAbout = function (type) {


    $('['+type+']').each(function () {
        var aboutBookUrl = $(this).attr(type);

        $(this).load( aboutBookUrl, function( response, status, xhr ){
            if ( status === "error" ) {
                var msg = "Sorry but there was an error: ";
                console.log( msg + xhr.status + " " + xhr.statusText );
                //$(this).closest(".search-result__about-book").hide();
                return false; // abort
            }

        });

    });


};
UX.searchResult.formattingPagination = function () {


    $('.pagination__list').find('a').each(function () {
        var num = $(this).attr('title');
        num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        $(this).html(num);
    });

};
