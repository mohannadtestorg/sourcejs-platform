$(function () {
    $(document).on("click", ".pagination__btn--back-to-top", function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop : 0}, "fast");
        return false;
    });
});