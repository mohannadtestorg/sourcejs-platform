$(document).ready(function () {

    $(document).on('click', ".sections__drop a", function () {
        var $toc__section_link = $(".toc__section a");
        var $toc__section_icon = $(".toc__section i");
        var $sections__drop = $(".sections__drop");
        if($sections__drop.hasClass("js--open")) {
            $sections__drop.removeClass("js--open");
            $toc__section_link.removeClass("js--open");
            $toc__section_icon.removeClass($toc__section_link.data("db-switch"));
        }
    });

});