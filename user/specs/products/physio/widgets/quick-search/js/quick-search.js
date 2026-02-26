$(document).ready(function() {
    $('.quick-search__item').on('click', function(e) {
        e.preventDefault();
        $(this).siblings('.quick-search').toggle();
        $(this).toggleClass('active');
    });
});