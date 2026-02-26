$(document).ready(function() {
    $('.collapsible-menu-header').on('click', function() {
        if (window.innerWidth < 992) {
            $(this).siblings(".collapsible-menu-body").slideToggle(400);
            $(this).closest('.collapsible-menu').toggleClass('js--open');
            $(this).find('.icon').toggleClass(" icon-chevron-down icon-chevron-up");
        }
    });
});