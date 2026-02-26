$(function() {
    var $section = $('.institutions');
    var $search = $section.find('.search');

    var toggle = function($link, value) {
        $link.find('a').toggleClass('collapsed', !value);
        $link.next().toggleClass('hidden', value);
    };

    $search.keyup(function() {
        var text = $(this).val().toLowerCase();
        $section.find('.expand-link').each(function() {
            toggle($(this), !text);
        });
        $section.find('.institution').each(function() {
            var $institution = $(this);
            $institution.toggleClass('hidden', $institution.data().value.toLowerCase().indexOf(text) < 0);
        });
        $section.find('.federation').each(function() {
            var $federation = $(this);
            $federation.toggleClass('hidden', !$federation.find('.institution:not(.hidden)').length);
        });
    });

    $section.on('click', '.expand-link', function(event) {
        var collapsed =$(this).next().hasClass("hidden");
        event.preventDefault();
        toggle($(this),!collapsed);
    });

});