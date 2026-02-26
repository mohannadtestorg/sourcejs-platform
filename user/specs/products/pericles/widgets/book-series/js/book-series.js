(function () {

    var loadAbst = {
        abst: "",
        target: "",

        init: function(){

            $(window).on('load', function () {
                if ($('.bookSeries')) {
                    loadAbst.get.bookAbst();
                }
            });
        },

        get: {
            bookAbst: function(){
                $('.bookSeries__abst').each(function () {

                    loadAbst.abst = $(this).data('abst');
                    loadAbst.target = $(this).find('.accordion__content');

                    if( $(loadAbst.target).is(':empty')) {
                        loadAbst.getContent();
                    }

                })
            }
        },

        getContent: function(){ // get content using ajax request

            $(loadAbst.target).load( loadAbst.abst, function( response, status, xhr ){
                if ( status === "error" ) {
                    var msg = "Sorry but there was an error: ";
                    console.log( msg + xhr.status + " " + xhr.statusText );
                    return false; // abort
                }

                $(loadAbst.target).trigger('content-loaded');
            });
        }
    };
    $(document).ready(function () {
        if ($(window).width() < 769) {
            $(".list-of-book-series").append('<a href="#" id="read-more" href="#" title=" Show all"> ...  Show all <i class="icon-section_arrow_d"></i></a>')
            $(document).on('click', '#read-more', function (event) {
                $(".list-of-book-series .topic").show();
                $("#read-more").remove();
                $(".list-of-book-series").append('<a href="#" id="read-less" href="#" title=" Show less"> Show less <i class="icon-section_arrow_u"></i></a>');
            });
            $(document).on('click', '#read-less', function (event) {
                $(".list-of-book-series .topic:nth-child(n+14)").hide();
                $("#read-less").remove();
                $(".list-of-book-series").append('<a href="#" id="read-more" href="#" title=" Show all"> ...  Show all <i class="icon-section_arrow_d"></i></a>')
            });
        }
    })
    UX.loadAbst = loadAbst; // add to global namespace
})();