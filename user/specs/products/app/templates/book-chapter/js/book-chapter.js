(function () {

    var $window = $(window),
        $body = $('body');

    var bookChapter = {
        deltaPopup:".delta-active-popup",

        init: function () {
            bookChapter.control();
        },
        control: function () {
            $body.on('click',".book-chapter__updates", function (e) {
                e.preventDefault();
                $(bookChapter.deltaPopup).css('display', 'none');
                if($(".book-chapter__updates").hasClass('hide-update')){
                    $(".book-chapter__updates").removeClass('hide-update');
                    $(".book-chapter__updates").find('.text').text('Show All Updates')
                    $('.article__body').removeClass('show-updates');
                }
                else{
                    $(".book-chapter__updates").addClass('hide-update');
                    $(".book-chapter__updates").find('.text').text('Hide All Updates');
                    $('.article__body').addClass('show-updates');
                }
            })


            $body.on('click', '.show-updates .delta-revision-highlight', function (e) {

                var $popover=$(this).find(bookChapter.deltaPopup);
                if($popover.is(':visible')){
                    $(bookChapter.deltaPopup).css('display', 'none');
                }
                else{
                    $(bookChapter.deltaPopup).css('display', 'none');
                    $popover.css('display', 'block');
                    $popover.css('left',$(this).width()+20);
                    $popover.width($('.tab--slide').width()-30);
                }

            })

            $body.on('click', bookChapter.deltaPopup +' .close', function (e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).closest(bookChapter.deltaPopup).css('display', 'none');
            })

            $body.on('click', bookChapter.deltaPopup, function (e) {
                e.preventDefault();
                e.stopPropagation();
            })

        }




    };
    UX.bookChapter = bookChapter; // add to global namespace
})();