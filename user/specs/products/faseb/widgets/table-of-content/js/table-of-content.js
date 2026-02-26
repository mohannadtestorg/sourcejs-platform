$(document).ready(function () {

    if ( $('.to-section').length ) {
        var sections__drop = $('.sections__drop');
        var to_section = $('.to-section');

        sections__drop.html("");

        to_section.each(function () {
            var section = $(this).text();
            var id = $(this).attr("id");
            var style = "";

            if($(this).data("nested-level")) {
                style += "padding-left:"+(15 * $(this).data("nested-level"))+"px;";
            }

            $('<li role="menuitem" style="'+style+'"><a class="w-slide__hide" href="#'+ id +'"><span>'+section+'</span></a></li>').appendTo($(sections__drop));

        });
    }

});