
(function () {
    var $body = $('body');


    var bookToc = {

        $accordionControl:$('.book-toc__content .accordion__control'),
        expandableLinks:'.book-toc__expandable-links .link',

        init: function () {
            var accordionControlWidth= $('.book-toc__links').find('.accordion__control').width() + 20;
            $('.book-toc__links').find('.rlist--inline').css("left", accordionControlWidth);
            if($('#tocHideExpandAll').length || !$('.book-toc__content .accordion__control').length){
                if($('#tocHideExpandAll').text().trim() == 'false' || !$('.book-toc__content .accordion__control').length){
                    $('.book-toc__expandable-links').hide();
                }
            }
            bookToc.control();

        },
        control: function () {

            $body.on('click', bookToc.expandableLinks, function (e) {
              $(bookToc.expandableLinks).toggleClass('hidden');


                if($(this).hasClass('expand-all'))
                {
                    bookToc.$accordionControl.next('.accordion__content').slideDown(200);
                    bookToc.$accordionControl.addClass('js--open');
                    bookToc.$accordionControl.attr('aria-expanded','true');
                }
                else{
                    bookToc.$accordionControl.next('.accordion__content').slideUp(200);
                    bookToc.$accordionControl.removeClass('js--open');
                    bookToc.$accordionControl.attr('aria-expanded','false');
                }

            })
        }

    }

    UX.bookToc = bookToc; // add to global namespace
})();
