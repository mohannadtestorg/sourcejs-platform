
$(document).ready(function() {
    if ( $('.to-section').length ) {
        $('.to-section').each(function () {
            var section = $(this).text();
            var id = $(this).attr("id");
            $('<li role="menuitem"><a href="#'+ id +'"><span>'+section+'</span></a></li>').appendTo('.sections__drop');
        });
    }else {
        $('.toc-go-section').remove();
        $('[data-db-target-for="tocSections"]').parent('li').remove();
    }
});



$(window).on('load resize orientationchange', function () {
    // if Pb is open no content truncation should take effect
    var isNotPb = $('#pb-editor [data-pb-dropzone]').length == 0;

    if (isNotPb) {
        var toTrunk8 = $('.aboutBook');

        if (toTrunk8.find('.pb-rich-text').length) {
            toTrunk8 = toTrunk8.find('.pb-rich-text');
        }

        toTrunk8.truncate({
            lines: 5,
            seeMoreLink: true,
            seeMoreText: 'Show all',
            seeLessText: 'Show less'
        });

    }

});

